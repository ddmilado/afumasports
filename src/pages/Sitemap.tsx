
import { Link } from "react-router-dom";

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
          <p className="text-xl text-gray-600">
            Find all pages and navigate easily through our website
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="text-orange-500 hover:text-orange-600">Home</Link></li>
              <li><Link to="/products" className="text-orange-500 hover:text-orange-600">All Products</Link></li>
              <li><Link to="/about" className="text-orange-500 hover:text-orange-600">About Us</Link></li>
              <li><Link to="/contact" className="text-orange-500 hover:text-orange-600">Contact</Link></li>
              <li><Link to="/faq" className="text-orange-500 hover:text-orange-600">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-orange-500 hover:text-orange-600">All Categories</Link></li>
              <li><Link to="/categories/engine" className="text-orange-500 hover:text-orange-600">Engine Parts</Link></li>
              <li><Link to="/categories/brakes" className="text-orange-500 hover:text-orange-600">Brake Parts</Link></li>
              <li><Link to="/categories/suspension" className="text-orange-500 hover:text-orange-600">Suspension</Link></li>
              <li><Link to="/categories/electrical" className="text-orange-500 hover:text-orange-600">Electrical</Link></li>
              <li><Link to="/categories/transmission" className="text-orange-500 hover:text-orange-600">Transmission</Link></li>
              <li><Link to="/categories/exhaust" className="text-orange-500 hover:text-orange-600">Exhaust</Link></li>
            </ul>
          </div>

          {/* Brands */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Brands</h2>
            <ul className="space-y-2">
              <li><Link to="/brands" className="text-orange-500 hover:text-orange-600">All Brands</Link></li>
              <li><Link to="/brands/acmeparts" className="text-orange-500 hover:text-orange-600">AcmeParts</Link></li>
              <li><Link to="/brands/flowmax" className="text-orange-500 hover:text-orange-600">FlowMax</Link></li>
              <li><Link to="/brands/ridecontrol" className="text-orange-500 hover:text-orange-600">RideControl</Link></li>
              <li><Link to="/brands/brighttech" className="text-orange-500 hover:text-orange-600">BrightTech</Link></li>
              <li><Link to="/brands/powerdrive" className="text-orange-500 hover:text-orange-600">PowerDrive</Link></li>
              <li><Link to="/brands/safestop" className="text-orange-500 hover:text-orange-600">SafeStop</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-orange-500 hover:text-orange-600">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-orange-500 hover:text-orange-600">Returns & Exchanges</Link></li>
              <li><Link to="/warranty" className="text-orange-500 hover:text-orange-600">Warranty</Link></li>
              <li><Link to="/faq" className="text-orange-500 hover:text-orange-600">FAQ</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
            <ul className="space-y-2">
              <li><Link to="/auth" className="text-orange-500 hover:text-orange-600">Sign In / Register</Link></li>
              <li><Link to="/account" className="text-orange-500 hover:text-orange-600">My Account</Link></li>
              <li><Link to="/cart" className="text-orange-500 hover:text-orange-600">Shopping Cart</Link></li>
              <li><Link to="/checkout" className="text-orange-500 hover:text-orange-600">Checkout</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Legal</h2>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-orange-500 hover:text-orange-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-orange-500 hover:text-orange-600">Terms of Service</Link></li>
              <li><Link to="/sitemap" className="text-orange-500 hover:text-orange-600">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </main>


    </div>
  );
};

export default Sitemap;
