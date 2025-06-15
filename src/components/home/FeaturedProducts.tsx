import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { productValidationSchema, sanitizeInput } from "@/utils/validation";
import { useAuditLog } from "@/hooks/useAuditLog";

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useFeaturedProducts();
  const { addItem } = useCart();
  const { logCartAction } = useAuditLog();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    try {
      // Validate product data before adding to cart
      const validationResult = productValidationSchema.safeParse({
        name: product.name,
        brand: product.brand,
        partNumber: product.part_number,
        price: product.price,
        quantity: 1
      });

      if (!validationResult.success) {
        toast.error("Invalid product data");
        return;
      }

      // Sanitize product data
      const sanitizedProduct = {
        id: product.id,
        name: sanitizeInput(product.name),
        brand: sanitizeInput(product.brand),
        partNumber: sanitizeInput(product.part_number),
        price: product.price,
        image: product.image_url || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop',
        inStock: product.in_stock
      };

      addItem(sanitizedProduct);
      logCartAction('add', product.id, 1);
      
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error("Failed to add product to cart");
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner size="lg" />
              <p className="text-lg text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-red-600 max-w-2xl mx-auto">
              Error loading products. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Top-rated parts trusted by mechanics and car enthusiasts worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 hover:border-orange-500"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {!product.in_stock && (
                  <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">Part #: {product.part_number}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(Math.floor(product.rating || 4.5))}
                    {'☆'.repeat(5 - Math.floor(product.rating || 4.5))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.rating || 4.5})</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.original_price && (
                      <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={!product.in_stock}
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            onClick={handleViewAllProducts}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
