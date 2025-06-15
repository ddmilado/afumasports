
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

export const useProducts = (searchQuery?: string, category?: string, vehicleYear?: string, vehicleMake?: string, vehicleModel?: string) => {
  return useQuery({
    queryKey: ['products', searchQuery, category, vehicleYear, vehicleMake, vehicleModel],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      // If we have vehicle information, create a specific search
      if (vehicleYear || vehicleMake || vehicleModel) {
        const vehicleSearchTerms = [];
        if (vehicleYear) vehicleSearchTerms.push(vehicleYear);
        if (vehicleMake) vehicleSearchTerms.push(vehicleMake);
        if (vehicleModel) vehicleSearchTerms.push(vehicleModel);
        
        const vehicleSearchQuery = vehicleSearchTerms.join(' ');
        
        // Search for products that contain vehicle information in name or description
        query = query.or(`name.ilike.%${vehicleSearchQuery}%,description.ilike.%${vehicleSearchQuery}%,brand.ilike.%${vehicleMake || ''}%`);
      } else if (searchQuery && searchQuery.trim()) {
        // Regular search when no vehicle info
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
