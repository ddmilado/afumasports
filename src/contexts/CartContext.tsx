
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
  const { syncCartToDatabase, loadCartFromDatabase } = usePersistentCart();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Track if we've already loaded the cart for this user
  const loadedUserRef = useRef<string | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout>();

  // Load cart from database when user logs in - only once per user change
  useEffect(() => {
    let isMounted = true;
    
    const loadUserCart = async () => {
      // Only load if user changed or first time loading
      if (user && user.id !== loadedUserRef.current) {
        console.log('Loading cart from database for user:', user.id);
        loadedUserRef.current = user.id;
        
        try {
          const cartItems = await loadCartFromDatabase();
          if (isMounted) {
            dispatch({ type: 'LOAD_CART', payload: cartItems });
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else if (!user) {
        // If user logs out, load from localStorage and reset loaded user
        loadedUserRef.current = null;
        const savedCart = localStorage.getItem('cart');
        if (savedCart && isMounted) {
          try {
            const cartItems = JSON.parse(savedCart);
            dispatch({ type: 'LOAD_CART', payload: cartItems });
          } catch (error) {
            console.error('Error loading cart from localStorage:', error);
          }
        }
      }
    };

    loadUserCart();
    
    return () => {
      isMounted = false;
    };
  }, [user?.id, loadCartFromDatabase]);

  // Sync cart to database or localStorage whenever it changes - with debouncing
  useEffect(() => {
    // Clear any existing timeout
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    // Don't sync if this is the initial load (empty cart)
    if (state.items.length === 0 && loadedUserRef.current === null) {
      return;
    }

    syncTimeoutRef.current = setTimeout(() => {
      if (user) {
        console.log('Syncing cart to database:', state.items);
        syncCartToDatabase(state.items).catch(error => {
          console.error('Error syncing cart to database:', error);
        });
      } else {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    }, 500); // Debounce for 500ms

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

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
