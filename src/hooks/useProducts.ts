
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  brand: string;
  part_number: string;
  price: number;
  original_price?: number;
  image_url?: string;
  rating?: number;
  in_stock: boolean;
  category: string;
  description?: string;
}

export const useProducts = (searchQuery?: string, category?: string) => {
  return useQuery({
    queryKey: ['products', searchQuery, category],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery && searchQuery.trim()) {
        query = query.or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,part_number.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (category && category.trim()) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as Product[];
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(4)
        .order('rating', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Product[];
    },
  });
};
