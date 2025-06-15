
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing to our newsletter. You'll receive the latest deals and automotive innovations.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-slate-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Auron Auto
                </h3>
              </div>
            </div>
            <p className="text-white mb-4">
              Your trusted source for premium automotive parts and cutting-edge solutions. 
              Innovation meets reliability since 2020.
            </p>
            <div className="text-sm text-white">
              <p>📞 +971-55-288-0435</p>
              <p>✉️ support@auronauto.com</p>
              <p>📍 Dubai Marina, Dubai, United Arab Emirates</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-white">
              <li><Link to="/products" className="hover:text-blue-400 transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-blue-400 transition-colors">Categories</Link></li>
              <li><Link to="/brands" className="hover:text-blue-400 transition-colors">Brands</Link></li>
              <li><Link to="/deals" className="hover:text-blue-400 transition-colors">Special Deals</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-blue-400 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Customer Service</h4>
            <ul className="space-y-2 text-white">
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-blue-400 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-blue-400 transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/warranty" className="hover:text-blue-400 transition-colors">Warranty</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Stay Connected</h4>
            <p className="text-white mb-4">
              Get the latest deals, innovations, and automotive solutions delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-md focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white text-sm">
            © 2024 Auron Autospace. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-white hover:text-blue-400 text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
