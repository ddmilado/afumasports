
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Grid, List, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import FavoriteButton from "@/components/FavoriteButton";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Suspension = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addItem } = useCart();
  
  const { data: products, isLoading, error } = useProducts('', 'Suspension');

  const handleAddToCart = (product: any) => {
    if (!product.in_stock) {
      toast.error("This item is currently out of stock");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      partNumber: product.part_number,
      price: product.price,
      image: product.image_url || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop',
      inStock: product.in_stock
    });

    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-sm text-gray-500 mb-6 pt-32">
          <Link to="/" className="hover:text-slate-500">Home</Link> / 
          <Link to="/products" className="hover:text-slate-500"> Products</Link> / Suspension Parts
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Suspension Parts</h1>
            <p className="text-gray-600">Superior suspension components for smooth and stable rides</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading suspension parts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">Error loading products. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Showing {products?.length || 0} suspension parts</p>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {products?.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link to={`/products/${product.id}`}>
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={product.image_url || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop'}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <FavoriteButton productId={product.id} />
                      </div>
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-slate-500 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full bg-slate-500 hover:bg-slate-600 text-white"
                      disabled={!product.in_stock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {products?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No suspension parts found.</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Suspension;
