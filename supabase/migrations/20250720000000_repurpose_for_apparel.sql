-- Drop existing tables
DROP TABLE IF EXISTS "products" CASCADE;
DROP TABLE IF EXISTS "categories" CASCADE;
DROP TABLE IF EXISTS "brands" CASCADE;
DROP TABLE IF EXISTS "orders" CASCADE;
DROP TABLE IF EXISTS "order_items" CASCADE;
DROP TABLE IF EXISTS "cart" CASCADE;
DROP TABLE IF EXISTS "cart_items" CASCADE;
DROP TABLE IF EXISTS "favorites" CASCADE;
DROP TABLE IF EXISTS "audit_log" CASCADE;

-- Create categories table for apparel
CREATE TABLE "categories" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    "created_at" timestamptz DEFAULT now()
);

-- Create products table for apparel
CREATE TABLE "products" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    "price" numeric(10, 2) NOT NULL,
    "category_id" uuid REFERENCES "categories"("id"),
    "image_url" text,
    "in_stock" boolean DEFAULT true,
    "created_at" timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE "orders" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid REFERENCES auth.users(id),
    "total_amount" numeric(10, 2) NOT NULL,
    "status" text DEFAULT 'pending',
    "created_at" timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE "order_items" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "order_id" uuid REFERENCES "orders"("id"),
    "product_id" uuid REFERENCES "products"("id"),
    "quantity" integer NOT NULL,
    "price" numeric(10, 2) NOT NULL
);

-- Create cart table
CREATE TABLE "cart" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid UNIQUE REFERENCES auth.users(id)
);

-- Create cart_items table
CREATE TABLE "cart_items" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "cart_id" uuid REFERENCES "cart"("id"),
    "product_id" uuid REFERENCES "products"("id"),
    "quantity" integer NOT NULL
);

-- Create favorites table
CREATE TABLE "favorites" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid REFERENCES auth.users(id),
    "product_id" uuid REFERENCES "products"("id"),
    UNIQUE("user_id", "product_id")
);

-- Create audit_log table
CREATE TABLE "audit_log" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid REFERENCES auth.users(id),
    "action" text NOT NULL,
    "details" jsonb,
    "created_at" timestamptz DEFAULT now()
);

-- Insert some sample data
INSERT INTO "categories" ("name", "description") VALUES
('Men', 'Apparel for men'),
('Women', 'Apparel for women'),
('Kids', 'Apparel for kids');

INSERT INTO "products" ("name", "description", "price", "category_id", "image_url", "in_stock") VALUES
('Afuma TechPro Run', 'High-performance running shirt', 180.00, (SELECT id FROM categories WHERE name = 'Men'), 'https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269381/afuma-man-in-gym_y6j2ln.jpg', true),
('Afuma Lux-Flex Leggings', 'Premium yoga leggings', 120.00, (SELECT id FROM categories WHERE name = 'Women'), 'https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-in-gym_j0glj1.jpg', true),
('Afuma Aero-Tee', 'Lightweight training t-shirt', 75.00, (SELECT id FROM categories WHERE name = 'Men'), 'https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-stretching_u2w5r2.jpg', false),
('Afuma Aura Sports Bra', 'Supportive and stylish sports bra', 95.00, (SELECT id FROM categories WHERE name = 'Women'), 'https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-in-gym_j0glj1.jpg', true);
