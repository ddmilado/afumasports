
import { createContext, useContext, useReducer, useEffect, ReactNode, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePersistentCart } from '@/hooks/usePersistentCart';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  partNumber: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'CLEAR_CART_AFTER_CHECKOUT' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return calculateCartTotals({ ...state, items: updatedItems });
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        return calculateCartTotals({ ...state, items: [...state.items, newItem] });
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return calculateCartTotals({ ...state, items: updatedItems });
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity === 0) {
        const updatedItems = state.items.filter(item => item.id !== action.payload.id);
        return calculateCartTotals({ ...state, items: updatedItems });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return calculateCartTotals({ ...state, items: updatedItems });
    }
    
    case 'CLEAR_CART':
    case 'CLEAR_CART_AFTER_CHECKOUT':
      return { items: [], total: 0, itemCount: 0 };
    
    case 'LOAD_CART':
      return calculateCartTotals({ ...state, items: action.payload });
    
    default:
      return state;
  }
};

const calculateCartTotals = (state: CartState): CartState => {
  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  return { ...state, total, itemCount };
};

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  clearCartAfterCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { syncCartToDatabase, loadCartFromDatabase, clearCartFromDatabase } = usePersistentCart();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Track initialization and sync state
  const isInitialized = useRef(false);
  const lastSyncedItems = useRef<string>('');
  const syncTimeoutRef = useRef<NodeJS.Timeout>();

  // Load cart data on mount and when user changes
  useEffect(() => {
    let isMounted = true;
    
    const loadCart = async () => {
      console.log('Loading cart for user:', user?.id || 'anonymous');
      
      try {
        if (user) {
          // Load from database for authenticated users
          const cartItems = await loadCartFromDatabase();
          if (isMounted) {
            dispatch({ type: 'LOAD_CART', payload: cartItems });
            console.log('Loaded cart from database:', cartItems);
          }
        } else {
          // Load from localStorage for anonymous users
          const savedCart = localStorage.getItem('cart');
          if (savedCart && isMounted) {
            try {
              const cartItems = JSON.parse(savedCart);
              dispatch({ type: 'LOAD_CART', payload: cartItems });
              console.log('Loaded cart from localStorage:', cartItems);
            } catch (error) {
              console.error('Error parsing cart from localStorage:', error);
              localStorage.removeItem('cart');
            }
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        isInitialized.current = true;
      }
    };

    // Only load if not already initialized or user changed
    if (!isInitialized.current) {
      loadCart();
    }
    
    return () => {
      isMounted = false;
    };
  }, [user?.id, loadCartFromDatabase]);

  // Sync cart changes to database/localStorage with debouncing
  useEffect(() => {
    // Don't sync if not initialized yet
    if (!isInitialized.current) {
      return;
    }

    // Check if items actually changed
    const currentItemsString = JSON.stringify(state.items);
    if (currentItemsString === lastSyncedItems.current) {
      return;
    }

    // Clear any existing timeout
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    // Debounce the sync operation
    syncTimeoutRef.current = setTimeout(async () => {
      console.log('Syncing cart changes:', state.items);
      lastSyncedItems.current = currentItemsString;

      try {
        if (user) {
          await syncCartToDatabase(state.items);
        } else {
          localStorage.setItem('cart', JSON.stringify(state.items));
        }
      } catch (error) {
        console.error('Error syncing cart:', error);
      }
    }, 500);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [state.items, user?.id, syncCartToDatabase]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const clearCartAfterCheckout = useCallback(async () => {
    console.log('Clearing cart after successful checkout');
    dispatch({ type: 'CLEAR_CART_AFTER_CHECKOUT' });
    
    // Clear from database/localStorage as well
    try {
      if (user) {
        await clearCartFromDatabase();
      } else {
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Error clearing cart from storage:', error);
    }
  }, [user, clearCartFromDatabase]);

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, clearCartAfterCheckout }}>
      {children}
    </CartContext.Provider>
  );
};
