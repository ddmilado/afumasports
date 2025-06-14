import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative container mx-auto px-4 pt-52 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find the <span className="text-orange-500">Perfect Parts</span><br />
          for Your Vehicle
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Premium automotive parts from trusted brands. Quality guaranteed, fast shipping, 
          and expert support to keep your vehicle running at its best.
        </p>
        
        {/* Vehicle search form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto mb-8">
          <h3 className="text-lg font-semibold mb-4">Find Parts for Your Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="px-4 py-3 rounded-md bg-white text-gray-900 border-0 focus:ring-2 focus:ring-orange-500">
              <option>Select Year</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
            <select className="px-4 py-3 rounded-md bg-white text-gray-900 border-0 focus:ring-2 focus:ring-orange-500">
              <option>Select Make</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Ford</option>
              <option>Chevrolet</option>
              <option>BMW</option>
            </select>
            <select className="px-4 py-3 rounded-md bg-white text-gray-900 border-0 focus:ring-2 focus:ring-orange-500">
              <option>Select Model</option>
              <option>Camry</option>
              <option>Civic</option>
              <option>F-150</option>
              <option>Silverado</option>
              <option>3 Series</option>
            </select>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
              <Search className="w-4 h-4 mr-2" />
              Find Parts
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3">
            Shop Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3"
          >
            View Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
