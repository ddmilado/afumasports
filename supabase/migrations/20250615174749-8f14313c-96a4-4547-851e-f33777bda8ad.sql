
-- Insert lubricants, engine oils, and fluid products
INSERT INTO public.products (name, brand, part_number, price, original_price, image_url, category, description) VALUES
-- Engine Oils
('Synthetic Motor Oil 5W-30 (5L)', 'FlowMax', 'EO-5W30-5L-SYN', 34.99, 39.99, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', 'Engine', 'Full synthetic motor oil for superior engine protection and performance'),
('Conventional Motor Oil 10W-40 (4L)', 'PureTech', 'EO-10W40-4L-CONV', 24.99, NULL, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop', 'Engine', 'High-quality conventional motor oil for everyday driving'),
('High Mileage Motor Oil 5W-20 (5L)', 'FlowMax', 'EO-5W20-5L-HM', 29.99, 34.99, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', 'Engine', 'Specially formulated for vehicles with over 75,000 miles'),

-- Transmission Fluids
('Automatic Transmission Fluid ATF+4 (4L)', 'PowerFlow', 'ATF-PLUS4-4L', 32.99, NULL, 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop', 'Transmission', 'Premium automatic transmission fluid for smooth shifting'),
('Manual Transmission Fluid 75W-90 (1L)', 'FlowMax', 'MTF-75W90-1L', 18.99, 22.99, 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop', 'Transmission', 'High-performance manual transmission fluid'),

-- Brake Fluids
('DOT 3 Brake Fluid (500ml)', 'StopMax', 'BF-DOT3-500ML', 12.99, NULL, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', 'Brakes', 'High-quality DOT 3 brake fluid for reliable braking performance'),
('DOT 4 Brake Fluid (1L)', 'StopMax', 'BF-DOT4-1L', 19.99, 24.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', 'Brakes', 'Superior DOT 4 brake fluid with higher boiling point'),

-- Power Steering Fluids
('Power Steering Fluid (1L)', 'PowerFlow', 'PSF-UNIV-1L', 14.99, NULL, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop', 'Electrical', 'Universal power steering fluid for smooth steering operation'),

-- Coolants
('Engine Coolant Concentrate (4L)', 'FlowMax', 'EC-CONC-4L-GREEN', 26.99, 31.99, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop', 'Engine', 'Long-life ethylene glycol coolant concentrate'),
('Pre-Mixed Coolant 50/50 (4L)', 'FlowMax', 'EC-5050-4L-BLUE', 22.99, NULL, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop', 'Engine', 'Ready-to-use pre-mixed coolant for immediate use'),

-- Gear Oils & Lubricants
('Differential Gear Oil 80W-90 (1L)', 'PowerFlow', 'DGO-80W90-1L', 21.99, NULL, 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop', 'Transmission', 'Heavy-duty gear oil for differential and axle protection'),
('Multi-Purpose Grease (400g)', 'PowerFlow', 'MPG-LITH-400G', 16.99, 19.99, 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop', 'Engine', 'Lithium-based multi-purpose grease for chassis lubrication'),

-- Additives
('Fuel System Cleaner (350ml)', 'PureTech', 'FSC-INJECT-350ML', 13.99, NULL, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', 'Engine', 'Professional fuel injector and system cleaner'),
('Engine Oil Additive (300ml)', 'FlowMax', 'EOA-SEAL-300ML', 11.99, 14.99, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', 'Engine', 'Stop leak and seal conditioner for older engines');
