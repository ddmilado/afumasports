import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState, FormEvent } from "react";

const Header = () => {
  const { user } = useAuth();
  const { state: cartState } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-afuma">
          AFUMA
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm uppercase">
          <Link to="/products?category=men" className="hover:text-afuma transition-colors">Men</Link>
          <Link to="/products?category=women" className="hover:text-afuma transition-colors">Women</Link>
          <Link to="/products?category=kids" className="hover:text-afuma transition-colors">Kids</Link>
          <Link to="/about" className="hover:text-afuma transition-colors">About</Link>
          <Link to="/contact" className="hover:text-afuma transition-colors">Contact</Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full bg-transparent text-white border-b border-gray-600 focus:border-afuma focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            >
              <Search />
            </button>
          </form>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-800">
              <ShoppingCart className="h-6 w-6" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-afuma text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </Button>
          </Link>

          <Link to={user ? "/account" : "/auth"}>
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <User className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
