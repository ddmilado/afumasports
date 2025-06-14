
-- Create products table for automotive parts
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  part_number TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  image_url TEXT,
  rating DECIMAL(3, 2) DEFAULT 4.5,
  in_stock BOOLEAN DEFAULT true,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read products (public catalog)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Insert some sample automotive parts data
INSERT INTO public.products (name, brand, part_number, price, original_price, image_url, category, description) VALUES
('Premium Brake Pad Set', 'AcmeParts', 'BP-2024-PRO', 89.99, 109.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', 'Brakes', 'High-performance brake pads for superior stopping power'),
('High-Flow Air Filter', 'FlowMax', 'AF-3021-HF', 45.99, NULL, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop', 'Engine', 'Improved airflow for better engine performance'),
('Performance Shock Absorber', 'RideControl', 'SA-4567-PERF', 124.99, 149.99, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop', 'Suspension', 'Enhanced ride quality and handling'),
('LED Headlight Bulbs', 'BrightTech', 'LED-H11-6000K', 67.99, NULL, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop', 'Electrical', 'Bright LED headlights for improved visibility'),
('Premium Oil Filter', 'PureTech', 'OF-8901-PREM', 24.99, NULL, 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop', 'Engine', 'High-quality oil filtration for engine protection'),
('Performance Exhaust System', 'PowerFlow', 'EX-5555-PERF', 299.99, 349.99, 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&h=300&fit=crop', 'Engine', 'Enhanced performance and sound'),
('Ceramic Brake Rotors', 'StopMax', 'BR-7890-CER', 159.99, 199.99, 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=300&h=300&fit=crop', 'Brakes', 'Superior heat dissipation and durability'),
('All-Season Tire Set', 'GripTech', 'AT-2025-AS', 449.99, NULL, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=300&fit=crop', 'Tires', 'Reliable traction in all weather conditions');
