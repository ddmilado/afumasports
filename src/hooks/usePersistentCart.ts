
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CartItem } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export const usePersistentCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const syncCartToDatabase = async (items: CartItem[]) => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      // First, get current cart items from database
      const { data: currentItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      // Delete items that are no longer in local cart
      const localProductIds = items.map(item => item.id);
      const itemsToDelete = currentItems?.filter(item => !localProductIds.includes(item.product_id)) || [];
      
      if (itemsToDelete.length > 0) {
        await supabase
          .from('cart_items')
          .delete()
          .in('product_id', itemsToDelete.map(item => item.product_id))
          .eq('user_id', user.id);
      }

      // Upsert current cart items
      for (const item of items) {
        await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: item.id,
            quantity: item.quantity
          }, {
            onConflict: 'user_id,product_id'
          });
      }
    } catch (error) {
      console.error('Error syncing cart to database:', error);
      toast({
        title: "Error",
        description: "Failed to sync cart to database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartFromDatabase = async (): Promise<CartItem[]> => {
    if (!user) return [];

    try {
      setIsLoading(true);
      
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

      if (error) throw error;

      return cartItems?.map(item => {
        const product = item.products as any;
        return {
          id: item.product_id,
          name: product?.name || '',
          brand: product?.brand || '',
          partNumber: product?.part_number || '',
          price: product?.price || 0,
          quantity: item.quantity,
          image: product?.image_url || '/placeholder.svg',
          inStock: product?.in_stock || false
        };
      }) || [];
      
    } catch (error) {
      console.error('Error loading cart from database:', error);
      toast({
        title: "Error",
        description: "Failed to load cart from database",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    syncCartToDatabase,
    loadCartFromDatabase,
    isLoading
  };
};
