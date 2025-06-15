
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Lock, Truck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PaymentMethods from "@/components/PaymentMethods";

const Checkout = () => {
  const { user, loading } = useAuth();
  const { state: cartState } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form states
  const [selectedCountry, setSelectedCountry] = useState('');
  const [shippingAddress, setShippingAddress] = useState<any>(null);

  const allowedCountries = [
    { code: 'AE', name: 'UAE' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'GH', name: 'Ghana' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'BJ', name: 'Benin Rep' },
    { code: 'TG', name: 'Togo' },
    { code: 'CF', name: 'CAR' },
    { code: 'GA', name: 'Gabon' }
  ];

  useEffect(() => {
    if (!loading && !user) {
      toast.error("You must be signed in to checkout. Please sign in to continue.");
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (cartState.items.length === 0) {
      navigate("/cart");
    }
  }, [cartState.items.length, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth page
  }

  const subtotal = cartState.total;
  const shipping = subtotal > 150 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = () => {
    // Collect shipping address data
    const formData = new FormData(document.querySelector('form') as HTMLFormElement);
    const address = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip'),
      country: selectedCountry
    };
    setShippingAddress(address);
    setStep(2);
  };

  const handlePaymentSuccess = (orderId: string) => {
    navigate(`/payment-success?order_id=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          type="text" 
                          required 
                          defaultValue={user?.user_metadata?.first_name || ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          type="text" 
                          required 
                          defaultValue={user?.user_metadata?.last_name || ''}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required value={user.email || ''} readOnly className="bg-gray-50" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" name="address" type="text" required />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" type="text" required />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input id="state" name="state" type="text" required placeholder="e.g., Lagos, Dubai, Accra" />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP/Postal Code</Label>
                        <Input id="zip" name="zip" type="text" required />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            {allowedCountries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="shipping" className="mr-4" defaultChecked />
                      <Truck className="w-6 h-6 text-orange-500 mr-3" />
                      <div className="flex-1">
                        <div className="font-medium">Standard Shipping (5-7 days)</div>
                        <div className="text-sm text-gray-500">Free for orders over $150</div>
                      </div>
                      <div className="font-bold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="shipping" className="mr-4" />
                      <Truck className="w-6 h-6 text-orange-500 mr-3" />
                      <div className="flex-1">
                        <div className="font-medium">Express Shipping (2-3 days)</div>
                        <div className="text-sm text-gray-500">Faster delivery</div>
                      </div>
                      <div className="font-bold">$19.99</div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="shipping" className="mr-4" />
                      <Truck className="w-6 h-6 text-orange-500 mr-3" />
                      <div className="flex-1">
                        <div className="font-medium">Overnight Shipping (1 day)</div>
                        <div className="text-sm text-gray-500">Next business day delivery</div>
                      </div>
                      <div className="font-bold">$39.99</div>
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <PaymentMethods 
                  selectedCountry={selectedCountry}
                  shippingAddress={shippingAddress}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                
                {step === 1 && (
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 ml-auto"
                    onClick={handleShippingSubmit}
                    disabled={!selectedCountry}
                  >
                    Continue
                  </Button>
                )}

                {step === 2 && (
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 ml-auto"
                    onClick={() => setStep(3)}
                  >
                    Continue to Payment
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cartState.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Lock className="w-4 h-4 mr-1" />
                  Secure SSL encrypted checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
