
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFavorites = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_favorites')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setFavorites(data?.map(item => item.product_id) || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (productId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      });
      return;
    }

    try {
      const isFavorite = favorites.includes(productId);
      
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;

        setFavorites(prev => prev.filter(id => id !== productId));
        toast({
          title: "Removed from wishlist",
          description: "Item removed from your wishlist",
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            product_id: productId
          });

        if (error) throw error;

        setFavorites(prev => [...prev, productId]);
        toast({
          title: "Added to wishlist",
          description: "Item added to your wishlist",
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
    }
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
    loadFavorites
  };
};
