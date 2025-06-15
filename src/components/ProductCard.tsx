
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import FavoriteButton from "./FavoriteButton";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  partNumber: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  inStock: boolean;
}

const ProductCard = ({ id, name, brand, partNumber, price, originalPrice, image, rating, inStock }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!inStock) {
      toast.error("This item is currently out of stock");
      return;
    }

    addItem({
      id,
      name,
      brand,
      partNumber,
      price,
      image,
      inStock
    });

    toast.success("Added to cart!");
  };

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <FavoriteButton productId={id} />
          </div>
          {!inStock && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{brand}</p>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-slate-500 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">Part #: {partNumber}</p>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({rating})</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-slate-500">${price}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
              )}
            </div>
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full bg-slate-500 hover:bg-slate-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
