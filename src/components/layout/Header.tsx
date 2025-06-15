
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems } = useCart();

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Banner - Commented out */}
      {/* 
      <div className="bg-slate-900 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Free shipping on orders over ₼550 | Call us: 1-800-AUTO-PARTS
        </div>
      </div>
      */}
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-slate-900">AutoParts</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600">Hello, {user.email}</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for parts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4">
            <nav className="space-y-2">
              <Link to="/products" className="block py-2 text-gray-700 hover:text-orange-500">
                All Products
              </Link>
              <Link to="/categories" className="block py-2 text-gray-700 hover:text-orange-500">
                Categories
              </Link>
              <Link to="/brands" className="block py-2 text-gray-700 hover:text-orange-500">
                Brands
              </Link>
              <Link to="/about" className="block py-2 text-gray-700 hover:text-orange-500">
                About
              </Link>
              <Link to="/contact" className="block py-2 text-gray-700 hover:text-orange-500">
                Contact
              </Link>
              {user ? (
                <div className="space-y-2 pt-2 border-t">
                  <Link to="/account" className="block py-2 text-gray-700 hover:text-orange-500">
                    My Account
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block py-2 text-gray-700 hover:text-orange-500 w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="block py-2 text-gray-700 hover:text-orange-500">
                  Sign In / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gray-50 border-t hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8 py-3">
            <li>
              <Link to="/products" className="text-gray-700 hover:text-orange-500 font-medium">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-gray-700 hover:text-orange-500 font-medium">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/brands" className="text-gray-700 hover:text-orange-500 font-medium">
                Brands
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
