
import { Link } from "react-router-dom";

const brands = [
  {
    id: 1,
    name: "AcmeParts",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    description: "Premium aftermarket parts with OEM quality",
    productCount: 1245,
    slug: "acmeparts"
  },
  {
    id: 2,
    name: "FlowMax",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    description: "High-performance air filters and intake systems",
    productCount: 567,
    slug: "flowmax"
  },
  {
    id: 3,
    name: "RideControl",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    description: "Suspension and steering components",
    productCount: 823,
    slug: "ridecontrol"
  },
  {
    id: 4,
    name: "BrightTech",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    description: "LED lighting and electrical solutions",
    productCount: 445,
    slug: "brighttech"
  },
  {
    id: 5,
    name: "PowerDrive",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    description: "Engine performance and drivetrain parts",
    productCount: 678,
    slug: "powerdrive"
  },
  {
    id: 6,
    name: "SafeStop",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    description: "Brake systems and safety components",
    productCount: 389,
    slug: "safestop"
  }
];

const Brands = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      
      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Brand</h1>
          <p className="text-xl text-gray-600">
            Discover quality parts from trusted automotive brands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to={`/brands/${brand.slug}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 border-b bg-gray-50">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-16 mx-auto object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-slate-500 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-gray-600 mb-4">{brand.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {brand.productCount.toLocaleString()} products
                  </span>
                  <span className="text-slate-500 font-medium group-hover:underline">
                    View Products →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>


    </div>
  );
};

export default Brands;
