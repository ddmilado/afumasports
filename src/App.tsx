
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { SessionTimeoutWarning } from "@/components/security/SessionTimeoutWarning";
import { useSecureAuth } from "@/hooks/useSecureAuth";
import Header from "@/components/layout/Header"; // Added import for Header
import Footer from "@/components/layout/Footer"; // Added import for Footer
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Warranty from "./pages/Warranty";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import PaymentSuccess from "./pages/PaymentSuccess";
import CryptoPayment from "./pages/CryptoPayment";
import Engine from "./pages/categories/Engine";
import Brakes from "./pages/categories/Brakes";
import Suspension from "./pages/categories/Suspension";
import Electrical from "./pages/categories/Electrical";
import AutoCare from "./pages/categories/AutoCare";

const queryClient = new QueryClient();

const AppContent = () => {
  const { sessionTimeoutWarning, extendSession, secureSignOut } = useSecureAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/engine" element={<Engine />} />
          <Route path="/categories/brakes" element={<Brakes />} />
          <Route path="/categories/suspension" element={<Suspension />} />
          <Route path="/categories/electrical" element={<Electrical />} />
          <Route path="/categories/autocare" element={<AutoCare />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/crypto" element={<CryptoPayment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      <SessionTimeoutWarning
        isOpen={sessionTimeoutWarning}
        onExtendSession={extendSession}
        onSignOut={secureSignOut}
      />
      
      <Toaster />
      <Sonner />
    </>
  );
};

function App() {
  const location = useLocation();
  const noHeaderFooterPaths = ['/auth'];
  const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
                {shouldShowHeaderFooter && <Header />}
                <main className={`flex-grow ${shouldShowHeaderFooter ? 'pt-28 pb-16' : ''}`}> {/* Added pt-28 to account for fixed header height, pb-16 for footer */}
                  <AppContent />
                </main>
                {shouldShowHeaderFooter && <Footer />}
              </div>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
