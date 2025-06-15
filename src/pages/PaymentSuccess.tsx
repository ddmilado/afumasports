
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
    
    // You could fetch order details here if needed
    setOrderDetails({
      orderNumber: sessionId ? `STRIPE-${sessionId.slice(-8)}` : orderId,
      estimatedDelivery: "5-7 business days"
    });
  }, [sessionId, orderId, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600">
              Thank you for your order. We've received your payment and will process your order shortly.
            </p>
          </div>

          {orderDetails && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-orange-500 mr-3" />
                <h2 className="text-2xl font-semibold">Order Details</h2>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Order Number:</span>
                  <span className="font-mono">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Estimated Delivery:</span>
                  <span>{orderDetails.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Status:</span>
                  <span className="text-green-600 font-medium">Processing</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• You'll receive an order confirmation email shortly</li>
                <li>• We'll send you tracking information once your order ships</li>
                <li>• For crypto payments, we'll verify your payment and confirm your order</li>
                <li>• For cash on delivery orders, our team will contact you to schedule delivery</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account">
                <Button variant="outline" className="w-full sm:w-auto">
                  View Order History
                </Button>
              </Link>
              <Link to="/products">
                <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
