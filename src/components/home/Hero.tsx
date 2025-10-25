import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-in-gym_j0glj1.jpg')" }}></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">AFUMA SPORTS</h1>
        <p className="mt-4 text-lg md:text-xl font-light">Luxury Sportswear for the Modern Athlete</p>
        <div className="mt-8 flex w-full max-w-md items-center space-x-2">
          <Input type="text" placeholder="Search for luxury..." className="bg-transparent text-white placeholder-gray-400 border-white" />
          <Button type="submit" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
