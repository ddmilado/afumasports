
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List, ShoppingCart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import FavoriteButton from "@/components/FavoriteButton";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  // Vehicle filter states
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  // Initialize from URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlYear = searchParams.get('year');
    const urlMake = searchParams.get('make');
    const urlModel = searchParams.get('model');
    
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    if (urlYear) {
      setVehicleYear(urlYear);
    }
    if (urlMake) {
      setVehicleMake(urlMake);
    }
    if (urlModel) {
      setVehicleModel(urlModel);
    }
  }, [searchParams]);

  // Pass vehicle parameters to the hook for precise database searching
  const { data: products, isLoading, error } = useProducts(
    searchQuery, 
    selectedCategory, 
    vehicleYear, 
    vehicleMake, 
    vehicleModel
  );

  // Filter products by additional criteria (price and brand)
  const filteredProducts = products?.filter(product => {
    let matches = true;

    if (selectedBrand && product.brand !== selectedBrand) {
      matches = false;
    }

    if (priceMin && product.price < parseFloat(priceMin)) {
      matches = false;
    }

    if (priceMax && product.price > parseFloat(priceMax)) {
      matches = false;
    }

    return matches;
  }) || [];

  const categories = ['Engine', 'Brakes', 'Suspension', 'Electrical', 'Tires', 'Auto Care'];
  const brands = ['AcmeParts', 'FlowMax', 'RideControl', 'BrightTech', 'PureTech', 'PowerFlow', 'StopMax', 'GripTech', 'CleanMax', 'DetailPro', 'GlossTech', 'ClearView', 'LuxeLeather', 'PowerClean', 'ShineGuard'];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('');
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrand(brand);
    } else {
      setSelectedBrand('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 pt-32">
          <Link to="/" className="hover:text-orange-500">Home</Link> / Products
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Find the perfect parts for your vehicle</p>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-1">Search results for: "{searchQuery}"</p>
            )}
            {(vehicleYear || vehicleMake || vehicleModel) && (
              <p className="text-sm text-blue-600 mt-1">
                Parts for: {vehicleYear} {vehicleMake} {vehicleModel}
              </p>
            )}
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
              
              {/* Vehicle Information Display */}
              {(vehicleYear || vehicleMake || vehicleModel) && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Vehicle Selected</h4>
                  <p className="text-sm text-blue-700">
                    {vehicleYear} {vehicleMake} {vehicleModel}
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 text-xs"
                    onClick={() => {
                      setVehicleYear('');
                      setVehicleMake('');
                      setVehicleModel('');
                      setSearchQuery('');
                      window.history.replaceState({}, '', '/products');
                    }}
                  >
                    Clear Vehicle Filter
                  </Button>
                </div>
              )}
              
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
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        checked={selectedCategory === category}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    className="w-20"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                  />
                  <span>-</span>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    className="w-20"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        checked={selectedBrand === brand}
                        onChange={(e) => handleBrandChange(brand, e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">Error loading products. Please try again later.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">Showing {filteredProducts.length} products</p>
                  <select className="border rounded-md px-3 py-2 text-sm">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Name: A to Z</option>
                    <option>Newest First</option>
                  </select>
                </div>

                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={product.image_url || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop'}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            <FavoriteButton productId={product.id} />
                          </div>
                        </div>
                      </Link>
                      
                      <div className="p-4">
                        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-orange-500 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">Part #: {product.part_number}</p>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400 text-sm">
                            {'★'.repeat(Math.floor(product.rating || 4.5))}
                            {'☆'.repeat(5 - Math.floor(product.rating || 4.5))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({product.rating || 4.5})</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-gray-900">${product.price}</span>
                            {product.original_price && (
                              <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          disabled={!product.in_stock}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && !isLoading && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No products found matching your criteria.</p>
                    {(vehicleYear || vehicleMake || vehicleModel) && (
                      <p className="text-sm text-gray-500 mt-2">
                        Try searching for a different vehicle or browse all products.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
