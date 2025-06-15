import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // Generate years from 2010 to 2024
  const years = Array.from({ length: 15 }, (_, i) => 2024 - i);

  // Most popular car makes
  const makes = [
    "Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", 
    "Audi", "Volkswagen", "Nissan", "Hyundai", "Kia", "Subaru", 
    "Mazda", "Lexus", "Acura", "Infiniti", "Cadillac", "Lincoln", 
    "Buick", "GMC", "Jeep", "Ram"
  ];

  // Model data based on make
  const modelsByMake = {
    "Toyota": ["Camry", "Corolla", "Prius", "RAV4", "Highlander", "Tacoma", "Tundra", "4Runner"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Fit", "HR-V", "Ridgeline", "Passport"],
    "Ford": ["F-150", "Escape", "Explorer", "Focus", "Fusion", "Mustang", "Edge", "Expedition"],
    "Chevrolet": ["Silverado", "Equinox", "Malibu", "Cruze", "Tahoe", "Suburban", "Camaro", "Traverse"],
    "BMW": ["3 Series", "5 Series", "X3", "X5", "7 Series", "X1", "4 Series", "2 Series"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "A-Class", "CLA", "GLA"],
    "Audi": ["A4", "A6", "Q5", "Q7", "A3", "Q3", "A8", "TT"],
    "Volkswagen": ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Beetle", "Arteon", "ID.4"],
    "Nissan": ["Altima", "Sentra", "Rogue", "Pathfinder", "Maxima", "Murano", "Frontier", "Titan"],
    "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Accent", "Palisade", "Kona", "Venue"],
    "Kia": ["Forte", "Optima", "Sorento", "Sportage", "Soul", "Telluride", "Rio", "Stinger"],
    "Subaru": ["Outback", "Forester", "Impreza", "Legacy", "Crosstrek", "Ascent", "WRX", "BRZ"],
    "Mazda": ["Mazda3", "Mazda6", "CX-5", "CX-9", "CX-3", "CX-30", "MX-5 Miata", "CX-50"],
    "Lexus": ["ES", "RX", "NX", "GX", "LX", "IS", "LS", "UX"],
    "Acura": ["TLX", "MDX", "RDX", "ILX", "NSX", "TL", "TSX", "ZDX"],
    "Infiniti": ["Q50", "QX60", "QX80", "Q60", "QX50", "Q70", "QX30", "M"],
    "Cadillac": ["Escalade", "XT5", "ATS", "CTS", "SRX", "XTS", "CT6", "XT4"],
    "Lincoln": ["Navigator", "MKZ", "MKX", "MKC", "Continental", "Aviator", "Corsair", "Nautilus"],
    "Buick": ["Enclave", "Encore", "LaCrosse", "Regal", "Verano", "Envision", "Cascada", "Envista"],
    "GMC": ["Sierra", "Acadia", "Terrain", "Yukon", "Canyon", "Savana", "Envoy", "Denali"],
    "Jeep": ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade", "Gladiator", "Patriot", "Liberty"],
    "Ram": ["1500", "2500", "3500", "ProMaster", "Dakota", "ProMaster City", "Chassis Cab", "C/V"]
  };

  // Reset model when make changes
  useEffect(() => {
    setSelectedModel("");
  }, [selectedMake]);

  // Reset model when year changes
  useEffect(() => {
    setSelectedModel("");
  }, [selectedYear]);

  const getAvailableModels = () => {
    if (!selectedMake) return [];
    return modelsByMake[selectedMake] || [];
  };

  const handleFindParts = () => {
    // Create a more specific search query based on vehicle selection
    const params = new URLSearchParams();
    
    // Build a search query that includes vehicle information
    let searchTerms = [];
    if (selectedYear) searchTerms.push(selectedYear);
    if (selectedMake) searchTerms.push(selectedMake);
    if (selectedModel) searchTerms.push(selectedModel);
    
    // If we have vehicle info, search for parts that match this vehicle
    if (searchTerms.length > 0) {
      const vehicleSearch = searchTerms.join(' ');
      params.append('search', vehicleSearch);
    }
    
    // Also add individual filters for more precise filtering
    if (selectedYear) params.append('year', selectedYear);
    if (selectedMake) params.append('make', selectedMake);
    if (selectedModel) params.append('model', selectedModel);
    
    navigate(`/products?${params.toString()}`);
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleViewCatalog = () => {
    navigate('/products');
  };

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
      
      <div className="relative container mx-auto px-4 pt-44 pb-20 text-center">
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
            <select 
              className="px-4 py-3 rounded-md bg-white text-gray-900 border-0 focus:ring-2 focus:ring-orange-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select 
              className="px-4 py-3 rounded-md bg-white text-gray-900 border-0 focus:ring-2 focus:ring-orange-500"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">Select Make</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            <select 
              className="px-4 py-3 rounded-md bg-white text-gray-900 border-0 focus:ring-2 focus:ring-orange-500"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedMake}
            >
              <option value="">Select Model</option>
              {getAvailableModels().map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
              onClick={handleFindParts}
            >
              <Search className="w-4 h-4 mr-2" />
              Find Parts
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3"
            onClick={handleShopNow}
          >
            Shop Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3"
            onClick={handleViewCatalog}
          >
            View Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
