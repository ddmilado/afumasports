import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import FavoriteButton from "./FavoriteButton";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

const ProductCard = ({ id, name, category, price, image, inStock }: ProductCardProps) => {
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
      price,
      image,
      inStock,
      brand: '',
      partNumber: '',
    });

    toast.success("Added to cart!");
  };

  return (
    <Link to={`/product/${id}`} className="group block overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
        <div className="absolute top-4 right-4">
          <FavoriteButton productId={id} />
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">{category}</p>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="mt-2 text-xl font-bold text-afuma">${price.toFixed(2)}</p>
        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="mt-4 w-full bg-afuma text-black hover:bg-afuma/90 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
