
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  productId: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
}

const FavoriteButton = ({ productId, size = "sm", variant = "ghost" }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
      }}
      className={`${isFavorite(productId) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
    >
      <Heart 
        className={`w-4 h-4 ${isFavorite(productId) ? 'fill-current' : ''}`} 
      />
    </Button>
  );
};

export default FavoriteButton;
