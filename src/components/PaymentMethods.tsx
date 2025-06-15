
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Truck, Bitcoin, Copy, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PaymentMethodsProps {
  selectedCountry: string;
  shippingAddress: any;
  onPaymentSuccess: (orderId: string) => void;
}

const PaymentMethods = ({ selectedCountry, shippingAddress, onPaymentSuccess }: PaymentMethodsProps) => {
  const { state: cartState } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Crypto wallet addresses - replace with your actual addresses
  const cryptoWallets = {
    solana: "YOUR_SOLANA_WALLET_ADDRESS",
    usdc_solana: "YOUR_USDC_SOLANA_WALLET_ADDRESS", 
    ethereum: "YOUR_ETHEREUM_WALLET_ADDRESS"
  };

  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(type);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  const handleStripePayment = async () => {
    if (!user) {
      toast.error("Please sign in to continue");
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems: cartState.items,
          isRecurring: isRecurring
        }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Failed to create checkout session");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashOnDelivery = async () => {
    if (selectedCountry !== 'AE') {
      toast.error("Cash on delivery is only available for UAE");
      return;
    }

    setIsProcessing(true);
    try {
      // Create order with COD status
      const subtotal = cartState.total;
      const shipping = subtotal > 150 ? 0 : 15.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      const orderNumber = `COD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          order_number: orderNumber,
          subtotal: subtotal,
          shipping_cost: shipping,
          tax_amount: tax,
          total_amount: total,
          status: 'cash_on_delivery',
          shipping_address: shippingAddress
        })
        .select()
        .single();

      if (error) throw error;

      // Create order items
      const orderItems = cartState.items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_brand: item.brand,
        part_number: item.partNumber,
        quantity: item.quantity,
        price: item.price
      }));

      await supabase.from('order_items').insert(orderItems);

      onPaymentSuccess(order.id);
      toast.success("Cash on delivery order placed successfully!");
    } catch (error) {
      console.error('COD error:', error);
      toast.error("Failed to place cash on delivery order");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCryptoPayment = () => {
    // Navigate to crypto payment page
    window.location.href = `/crypto-payment?addresses=${encodeURIComponent(JSON.stringify(cryptoWallets))}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
        
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          {/* Card Payment */}
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="card" id="card" />
            <CreditCard className="w-5 h-5 text-orange-500" />
            <div className="flex-1">
              <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
              <p className="text-sm text-gray-500">Pay securely with Stripe</p>
            </div>
          </div>

          {/* Cash on Delivery - Only for UAE */}
          {selectedCountry === 'AE' && (
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="cod" id="cod" />
              <Truck className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <Label htmlFor="cod" className="font-medium">Cash on Delivery</Label>
                <p className="text-sm text-gray-500">Pay when you receive your order (UAE only)</p>
              </div>
            </div>
          )}

          {/* Crypto Payment */}
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="crypto" id="crypto" />
            <Bitcoin className="w-5 h-5 text-orange-500" />
            <div className="flex-1">
              <Label htmlFor="crypto" className="font-medium">Cryptocurrency</Label>
              <p className="text-sm text-gray-500">Pay with Solana, USDC, or Ethereum</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Recurring Option for Card Payments */}
      {paymentMethod === "card" && (
        <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="recurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-4 h-4 text-orange-500"
          />
          <Label htmlFor="recurring" className="text-sm">
            Make this a recurring monthly purchase
          </Label>
        </div>
      )}

      {/* Payment Action Button */}
      <div className="pt-4">
        {paymentMethod === "card" && (
          <Button 
            onClick={handleStripePayment} 
            disabled={isProcessing}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {isProcessing ? "Processing..." : `Pay with Card${isRecurring ? " (Recurring)" : ""}`}
          </Button>
        )}

        {paymentMethod === "cod" && selectedCountry === 'AE' && (
          <Button 
            onClick={handleCashOnDelivery} 
            disabled={isProcessing}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            {isProcessing ? "Processing..." : "Place Cash on Delivery Order"}
          </Button>
        )}

        {paymentMethod === "crypto" && (
          <Button 
            onClick={handleCryptoPayment}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            Continue with Crypto Payment
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
