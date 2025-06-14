
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      {/* Top bar */}
      <div className="bg-slate-800 py-2">
        <div className="container mx-auto px-4 text-sm text-gray-300 text-center">
          Free shipping on orders over $150 | Call us: 1-800-AUTO-PARTS
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AutoParts Pro</h1>
              <p className="text-xs text-gray-400">Quality Parts, Reliable Service</p>
            </div>
          </Link>
          
          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search parts by name, part number, or vehicle..."
                className="pl-10 pr-4 py-3 w-full bg-white text-gray-900 border-0 focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-orange-500">
              <User className="w-5 h-5 mr-2" />
              Account
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-orange-500 relative">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4 pt-4 border-t border-slate-700">
          <ul className="flex space-x-8">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-orange-500 transition-colors">All Parts</Link></li>
            <li><Link to="/categories/engine" className="hover:text-orange-500 transition-colors">Engine</Link></li>
            <li><Link to="/categories/brakes" className="hover:text-orange-500 transition-colors">Brakes</Link></li>
            <li><Link to="/categories/suspension" className="hover:text-orange-500 transition-colors">Suspension</Link></li>
            <li><Link to="/categories/electrical" className="hover:text-orange-500 transition-colors">Electrical</Link></li>
            <li><Link to="/about" className="hover:text-orange-500 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
