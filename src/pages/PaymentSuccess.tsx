
import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { clearCartAfterCheckout } = useCart();
  const orderId = searchParams.get('order_id');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear cart after successful checkout
    console.log('Payment successful, clearing cart');
    clearCartAfterCheckout();
  }, [clearCartAfterCheckout]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600">
              Thank you for your order. Your payment has been processed successfully.
            </p>
          </div>

          {orderId && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h2>
              <p className="text-gray-600">Order ID: <span className="font-mono text-sm">{orderId}</span></p>
              {sessionId && (
                <p className="text-gray-600">Session ID: <span className="font-mono text-sm">{sessionId}</span></p>
              )}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <Package className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What's Next?</h3>
            <div className="text-left max-w-md mx-auto space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                <p className="text-gray-600">We'll send you an order confirmation email shortly</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                <p className="text-gray-600">Your order will be processed and prepared for shipping</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                <p className="text-gray-600">You'll receive tracking information once your order ships</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  View Order History
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
            
            <Link to="/" className="inline-block">
              <Button variant="ghost" className="text-gray-600">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
