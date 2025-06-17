
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Settings } from "lucide-react";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-4">
        <Hero />
        <Categories />
        <FeaturedProducts />
      </main>
    </div>
  );
};

export default Index;
