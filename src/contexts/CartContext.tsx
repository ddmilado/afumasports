
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

  const isInitialized = useRef(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout>();
  const previousUserIdRef = useRef<string | null>(null);
  const isSyncingRef = useRef(false);

  // Load cart data when user changes or component mounts
  useEffect(() => {
    const loadCart = async () => {
      const currentUserId = user?.id || null;
      console.log('Loading cart for user:', currentUserId || 'anonymous');
      
      try {
        if (user) {
          console.log('Loading cart from database...');
          const cartItems = await loadCartFromDatabase();
          dispatch({ type: 'LOAD_CART', payload: cartItems });
          console.log('Loaded cart from database:', cartItems);
        } else {
          console.log('Loading cart from localStorage...');
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
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
      }
      
      isInitialized.current = true;
    };

    const currentUserId = user?.id || null;
    
    // Only load cart if user changed or not initialized
    if (!isInitialized.current || previousUserIdRef.current !== currentUserId) {
      console.log('User changed or not initialized, loading cart');
      previousUserIdRef.current = currentUserId;
      isInitialized.current = false;
      loadCart();
    }
  }, [user?.id, loadCartFromDatabase]);

  // Sync cart changes to database/localStorage
  useEffect(() => {
    if (!isInitialized.current || isSyncingRef.current) {
      return;
    }

    const syncCart = async () => {
      isSyncingRef.current = true;
      console.log('Syncing cart changes:', state.items);

      try {
        if (user) {
          console.log('Syncing to database...');
          await syncCartToDatabase(state.items);
          console.log('Cart synced to database successfully');
        } else {
          console.log('Syncing to localStorage...');
          localStorage.setItem('cart', JSON.stringify(state.items));
          console.log('Cart synced to localStorage successfully');
        }
      } catch (error) {
        console.error('Error syncing cart:', error);
      } finally {
        isSyncingRef.current = false;
      }
    };

    // Clear any existing timeout
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    // For authenticated users, sync immediately but debounced
    // For anonymous users, also debounce
    syncTimeoutRef.current = setTimeout(syncCart, user ? 100 : 500);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [state.items, user, syncCartToDatabase]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    console.log('Adding item to cart:', item);
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    console.log('Removing item from cart:', id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    console.log('Updating quantity for item:', id, 'to:', quantity);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    console.log('Clearing cart');
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const clearCartAfterCheckout = useCallback(async () => {
    console.log('Clearing cart after successful checkout');
    dispatch({ type: 'CLEAR_CART_AFTER_CHECKOUT' });
    
    try {
      if (user) {
        await clearCartFromDatabase();
        console.log('Cart cleared from database');
      } else {
        localStorage.removeItem('cart');
        console.log('Cart cleared from localStorage');
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
