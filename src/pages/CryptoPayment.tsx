
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Upload } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CryptoPayment = () => {
  const [searchParams] = useSearchParams();
  const { state: cartState } = useCart();
  const { user } = useAuth();
  
  const [selectedCrypto, setSelectedCrypto] = useState("solana");
  const [transactionLink, setTransactionLink] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get wallet addresses from URL params
  const addressesParam = searchParams.get('addresses');
  const cryptoWallets = addressesParam ? JSON.parse(decodeURIComponent(addressesParam)) : {};

  const cryptoOptions = [
    { id: "solana", name: "Solana (SOL)", address: cryptoWallets.solana },
    { id: "usdc_solana", name: "USDC (Solana)", address: cryptoWallets.usdc_solana },
    { id: "ethereum", name: "Ethereum (ETH)", address: cryptoWallets.ethereum },
    { id: "bitcoin", name: "Bitcoin (BTC)", address: cryptoWallets.bitcoin }
  ];

  const subtotal = cartState.total;
  const shipping = subtotal > 150 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const handleSubmitProof = async () => {
    if (!transactionLink && !paymentProof) {
      toast.error("Please provide either a transaction link or upload payment proof");
      return;
    }

    if (!user) {
      toast.error("Please sign in to continue");
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert file to base64 if uploaded
      let paymentProofData = null;
      if (paymentProof) {
        const reader = new FileReader();
        paymentProofData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(paymentProof);
        });
      }

      const { data, error } = await supabase.functions.invoke('submit-crypto-proof', {
        body: {
          transactionLink,
          paymentProofFile: paymentProofData,
          cryptoMethod: selectedCrypto,
          cartItems: cartState.items,
          userEmail: user.email,
          shippingAddress: {
            // Get from session storage or form state
            country: localStorage.getItem('checkout_country') || 'UAE'
          }
        }
      });

      if (error) throw error;

      toast.success("Payment proof submitted successfully!");
      window.location.href = `/payment-success?order_id=${data.orderId}`;
    } catch (error) {
      console.error('Crypto proof submission error:', error);
      toast.error("Failed to submit payment proof");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cryptocurrency Payment</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Total: ${total.toFixed(2)}</h2>
            
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">Select Cryptocurrency:</h3>
              
              <RadioGroup value={selectedCrypto} onValueChange={setSelectedCrypto}>
                {cryptoOptions.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="font-medium flex-1">
                        {option.name}
                      </Label>
                    </div>
                    
                    {selectedCrypto === option.id && (
                      <div className="ml-6 p-4 bg-gray-50 rounded-lg">
                        <Label className="text-sm font-medium">Wallet Address:</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input 
                            value={option.address} 
                            readOnly 
                            className="font-mono text-sm"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(option.address, option.id)}
                          >
                            {copiedAddress === option.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">Payment Proof</h3>
              <p className="text-sm text-gray-600">
                After sending the payment, please provide proof by either uploading a screenshot or providing the transaction link.
              </p>
              
              <div>
                <Label htmlFor="txLink">Transaction Link (Optional)</Label>
                <Input
                  id="txLink"
                  placeholder="https://solscan.io/tx/... or https://etherscan.io/tx/..."
                  value={transactionLink}
                  onChange={(e) => setTransactionLink(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="proofFile">Upload Payment Proof (Optional)</Label>
                <div className="mt-1">
                  <input
                    id="proofFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                </div>
                {paymentProof && (
                  <p className="text-sm text-green-600 mt-1">File uploaded: {paymentProof.name}</p>
                )}
              </div>
            </div>

            <Button 
              onClick={handleSubmitProof}
              disabled={isSubmitting || (!transactionLink && !paymentProof)}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              {isSubmitting ? "Submitting..." : "Submit Payment Proof"}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CryptoPayment;
