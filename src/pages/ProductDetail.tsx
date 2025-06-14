
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data
  const product = {
    id: 1,
    name: "Premium Brake Pad Set",
    brand: "AcmeParts",
    partNumber: "BP-2024-PRO",
    price: 89.99,
    originalPrice: 109.99,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockQuantity: 15,
    description: "High-performance brake pads designed for optimal stopping power and longevity. Features advanced ceramic compound for reduced noise and dust.",
    specifications: {
      "Material": "Ceramic Composite",
      "Thickness": "12mm",
      "Width": "140mm",
      "Height": "58mm",
      "Weight": "1.2kg",
      "Temperature Range": "-40°C to 400°C"
    },
    compatibility: ["Honda Civic 2016-2021", "Honda Accord 2018-2021", "Acura ILX 2016-2022"],
    features: [
      "Superior stopping power",
      "Low noise operation",
      "Minimal dust production",
      "Extended pad life",
      "OEM quality construction"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Home</Link> / 
          <Link to="/products" className="hover:text-orange-500"> Products</Link> / 
          {product.name}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-white">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">Part #: {product.partNumber}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 text-lg">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-600 ml-2">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <p className="text-green-600 font-medium">
                  ✓ In Stock ({product.stockQuantity} available)
                </p>
              ) : (
                <p className="text-red-600 font-medium">✗ Out of Stock</p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <Truck className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $150</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium">2 Year Warranty</p>
                <p className="text-xs text-gray-500">Quality guaranteed</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-orange-500 text-orange-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Specifications
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Compatibility
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Reviews
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {/* Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Technical Specifications</h4>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-600">{key}:</dt>
                      <dd className="font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Vehicle Compatibility</h4>
                <ul className="space-y-2">
                  {product.compatibility.map((vehicle, index) => (
                    <li key={index} className="text-gray-600">
                      • {vehicle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
