
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Settings, LogIn, Zap } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm text-white shadow-lg">
      {/* Top bar */}
      <div className="bg-slate-800/60 py-2">
        <div className="container mx-auto px-4 text-sm text-gray-300 text-center">
          Free shipping on orders over AED 2,000 | Call us: +971-55-288-0435
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Auron Autospace
              </h1>
              <p className="text-xs text-gray-400">Premium Auto Parts & Innovation</p>
            </div>
          </Link>
          
          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search parts by name, part number, or vehicle..."
                className="pl-10 pr-4 py-3 w-full bg-white/90 text-gray-900 border-0 focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/account">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                    <User className="w-5 h-5 mr-2" />
                    Account
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-400 relative">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartState.itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartState.itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-400 relative">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartState.itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartState.itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4 pt-4 border-t border-slate-700/50">
          <ul className="flex space-x-8">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-400 transition-colors">All Parts</Link></li>
            <li><Link to="/categories/engine" className="hover:text-blue-400 transition-colors">Engine</Link></li>
            <li><Link to="/categories/brakes" className="hover:text-blue-400 transition-colors">Brakes</Link></li>
            <li><Link to="/categories/suspension" className="hover:text-blue-400 transition-colors">Suspension</Link></li>
            <li><Link to="/categories/electrical" className="hover:text-blue-400 transition-colors">Electrical</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
