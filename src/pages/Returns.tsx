
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RotateCcw, Shield, CheckCircle } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
          <p className="text-xl text-gray-600">
            Hassle-free returns within 30 days of purchase
          </p>
        </div>

        {/* Return Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
            <p className="text-gray-600">Call or email us to initiate your return</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Package & Ship</h3>
            <p className="text-gray-600">Pack the item securely and ship with provided label</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Refunded</h3>
            <p className="text-gray-600">Receive your refund within 5-7 business days</p>
          </div>
        </div>

        {/* Return Policy Details */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Return Policy</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Return Window</h3>
                <p className="text-gray-600">
                  Items can be returned within 30 days of delivery for a full refund.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Original Condition Required</h3>
                <p className="text-gray-600">
                  Items must be in original packaging and unused condition.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <RotateCcw className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Exchanges Available</h3>
                <p className="text-gray-600">
                  We offer exchanges for different sizes or alternative parts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Defective Items</h3>
                <p className="text-gray-600">
                  Defective items are eligible for return beyond the 30-day window.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Non-Returnable Items</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Electrical components that have been installed</li>
              <li>Fluids and chemicals</li>
              <li>Custom or special order items</li>
              <li>Items damaged due to misuse or installation errors</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;
