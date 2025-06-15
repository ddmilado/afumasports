
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CartItem } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export const usePersistentCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const syncCartToDatabase = async (items: CartItem[]) => {
    if (!user) {
      console.log('No user, skipping database sync');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Syncing cart items to database:', items);
      console.log('User ID:', user.id);
      
      // First, clear all existing cart items for this user
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Error clearing existing cart items:', deleteError);
        throw deleteError;
      }

      console.log('Successfully cleared existing cart items');

      // Then insert all current cart items
      if (items.length > 0) {
        const cartItemsToInsert = items.map(item => ({
          user_id: user.id,
          product_id: item.id,
          quantity: item.quantity
        }));

        console.log('Inserting cart items to database:', cartItemsToInsert);
        
        const { data, error: insertError } = await supabase
          .from('cart_items')
          .insert(cartItemsToInsert)
          .select();
          
        if (insertError) {
          console.error('Error inserting cart items:', insertError);
          throw insertError;
        }

        console.log('Successfully inserted cart items:', data);
      }
      
      console.log('Cart sync to database completed successfully');
    } catch (error: any) {
      console.error('Error syncing cart to database:', error);
      toast({
        title: "Cart Sync Error",
        description: `Failed to sync cart: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
      throw error; // Re-throw to allow caller to handle
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartFromDatabase = async (): Promise<CartItem[]> => {
    if (!user) {
      console.log('No user, returning empty cart');
      return [];
    }

    try {
      setIsLoading(true);
      console.log('Loading cart from database for user:', user.id);
      
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          product_id,
          quantity,
          products (
            id,
            name,
            brand,
            part_number,
            price,
            image_url,
            in_stock
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading cart from database:', error);
        throw error;
      }

      console.log('Raw cart data from database:', cartItems);

      const formattedItems = cartItems?.map(item => {
        const product = item.products as any;
        if (!product) {
          console.warn('Product not found for cart item:', item);
          return null;
        }
        
        return {
          id: item.product_id,
          name: product.name || '',
          brand: product.brand || '',
          partNumber: product.part_number || '',
          price: product.price || 0,
          quantity: item.quantity,
          image: product.image_url || '/placeholder.svg',
          inStock: product.in_stock ?? false
        };
      }).filter(item => item !== null) || [];

      console.log('Formatted cart items loaded from database:', formattedItems);
      return formattedItems;
      
    } catch (error: any) {
      console.error('Error loading cart from database:', error);
      toast({
        title: "Cart Load Error",
        description: `Failed to load cart: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const clearCartFromDatabase = async () => {
    if (!user) {
      console.log('No user, skipping database clear');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Clearing cart from database for user:', user.id);
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing cart from database:', error);
        throw error;
      }

      console.log('Cart cleared from database successfully');
    } catch (error: any) {
      console.error('Error clearing cart from database:', error);
      toast({
        title: "Cart Clear Error",
        description: `Failed to clear cart: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    syncCartToDatabase,
    loadCartFromDatabase,
    clearCartFromDatabase,
    isLoading
  };
};
