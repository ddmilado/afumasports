
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List, ShoppingCart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "Premium Brake Pad Set",
    brand: "AcmeParts",
    partNumber: "BP-2024-PRO",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    rating: 4.8,
    inStock: true,
    category: "Brakes"
  },
  {
    id: 2,
    name: "High-Flow Air Filter",
    brand: "FlowMax",
    partNumber: "AF-3021-HF",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop",
    rating: 4.6,
    inStock: true,
    category: "Engine"
  },
  {
    id: 3,
    name: "Performance Shock Absorber",
    brand: "RideControl",
    partNumber: "SA-4567-PERF",
    price: 124.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop",
    rating: 4.9,
    inStock: true,
    category: "Suspension"
  },
  {
    id: 4,
    name: "LED Headlight Bulbs",
    brand: "BrightTech",
    partNumber: "LED-H11-6000K",
    price: 67.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop",
    rating: 4.7,
    inStock: true,
    category: "Electrical"
  }
];

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Home</Link> / Products
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Find the perfect parts for your vehicle</p>
          </div>
          
          {/* View Toggle */}
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search parts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {['Engine', 'Brakes', 'Suspension', 'Electrical', 'Transmission'].map((category) => (
                    <label key={category} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="w-20" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="w-20" />
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
                <div className="space-y-2">
                  {['AcmeParts', 'FlowMax', 'RideControl', 'BrightTech'].map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Showing {mockProducts.length} products</p>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {mockProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-orange-500 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">Part #: {product.partNumber}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
