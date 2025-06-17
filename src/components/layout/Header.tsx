
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Settings, LogIn, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState, FormEvent, useRef } from "react";

const Header = () => {
  const { user } = useAuth();
  const { state: cartState } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

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
        <div className="container mx-auto px-4 text-xs sm:text-sm text-gray-300 text-center">
          Free shipping on orders over AED 2,000 | Call us: +971-55-288-0435
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 md:w-7 md:h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-slate-500 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Auron Auto
              </h1>
              <p className="text-xs text-gray-400">Premium Auto Parts & Care</p>
            </div>
          </Link>
          
          {/* Search bar */}
          <div className="flex-1 w-full md:max-w-2xl md:mx-8 mb-4 md:mb-0 order-3 md:order-2 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search parts..."
                className="pl-10 pr-4 py-2 md:py-3 w-full bg-white/90 text-gray-900 border-0 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4 order-2 md:order-3">
            {/* Mobile Search Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:text-blue-400"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            {user ? (
              <>
                <Link to="/account">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-400 text-xs md:text-sm">
                    <User className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    Account
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-400 relative text-xs md:text-sm">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    Cart
                    {cartState.itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                        {cartState.itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-400 relative text-xs md:text-sm">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    Cart
                    {cartState.itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                        {cartState.itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-400 text-xs md:text-sm">
                    <LogIn className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Search Input (conditionally rendered) */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search parts..."
                className="pl-10 pr-4 py-2 w-full bg-white/90 text-gray-900 border-0 focus:ring-2 focus:ring-blue-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={mobileSearchInputRef}
              />
              <button 
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* Navigation - Hidden on small screens, burger menu could be added here */}
        <nav className="mt-4 pt-4 border-t border-slate-700/50 hidden md:block">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-400 transition-colors">All Parts</Link></li>
            <li><Link to="/categories/engine" className="hover:text-blue-400 transition-colors">Engine</Link></li>
            <li><Link to="/categories/brakes" className="hover:text-blue-400 transition-colors">Brakes</Link></li>
            <li><Link to="/categories/suspension" className="hover:text-blue-400 transition-colors">Suspension</Link></li>
            <li><Link to="/categories/electrical" className="hover:text-blue-400 transition-colors">Electrical</Link></li>
            <li><Link to="/categories/autocare" className="hover:text-blue-400 transition-colors">Auto Care</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
