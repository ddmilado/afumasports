
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Cart = () => {
  const { state: cartState, updateQuantity, removeItem } = useCart();

  const subtotal = cartState.total;
  const shipping = subtotal > 150 ? 0 : 15.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cartState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner size="lg" />
            <span className="text-lg text-gray-600">Loading your cart...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some automotive parts to get started!</p>
            <Link to="/products">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-orange-500 hover:text-orange-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Cart Items ({cartState.items.length})</h2>
              </div>
              
              <div className="divide-y">
                {cartState.items.map((item) => (
                  <div key={item.id} className="p-6 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">{item.brand}</p>
                      <p className="text-sm text-gray-500">Part #: {item.partNumber}</p>
                      <p className="text-lg font-bold text-orange-500 mt-2">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-md p-3 mb-6">
                  <p className="text-sm text-orange-700">
                    Add ${(150 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <Link to="/checkout">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
