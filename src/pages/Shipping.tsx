
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-xl text-gray-600">
            Fast, reliable shipping to get your parts when you need them
          </p>
        </div>

        {/* Shipping Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Standard Shipping</h3>
            <p className="text-gray-600 mb-2">5-7 business days</p>
            <p className="text-orange-500 font-semibold">FREE on orders over $150</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Express Shipping</h3>
            <p className="text-gray-600 mb-2">2-3 business days</p>
            <p className="text-orange-500 font-semibold">$19.99</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Overnight Shipping</h3>
            <p className="text-gray-600 mb-2">Next business day</p>
            <p className="text-orange-500 font-semibold">$39.99</p>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Details</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h3>
              <p className="text-gray-600">
                Orders placed before 2:00 PM EST Monday-Friday are processed the same day. 
                Orders placed after 2:00 PM or on weekends are processed the next business day.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Areas</h3>
              <p className="text-gray-600">
                We ship to all 50 US states, including Alaska and Hawaii. International 
                shipping is currently not available.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Package Tracking</h3>
              <p className="text-gray-600">
                Once your order ships, you'll receive a tracking number via email. You can 
                also track your order through your account dashboard.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Items</h3>
              <p className="text-gray-600">
                Large items (engines, transmissions) may require freight shipping with 
                extended delivery times. We'll contact you with details and scheduling.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
