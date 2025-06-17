
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Engine",
    description: "Engine parts, filters, belts, and performance components",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    productCount: 1234,
    slug: "engine"
  },
  {
    id: 2,
    name: "Brakes",
    description: "Brake pads, rotors, calipers, and brake system components",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    productCount: 856,
    slug: "brakes"
  },
  {
    id: 3,
    name: "Suspension",
    description: "Shocks, struts, springs, and suspension system parts",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
    productCount: 642,
    slug: "suspension"
  },
  {
    id: 4,
    name: "Electrical",
    description: "Batteries, alternators, starters, and electrical components",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    productCount: 789,
    slug: "electrical"
  },
  {
    id: 5,
    name: "Transmission",
    description: "Transmission parts, fluids, and drivetrain components",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    productCount: 423,
    slug: "transmission"
  },
  {
    id: 6,
    name: "Exhaust",
    description: "Exhaust pipes, mufflers, and emission system parts",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
    productCount: 356,
    slug: "exhaust"
  },
  {
    id: 7,
    name: "Auto Care",
    description: "Car wash, wax, cleaners, and detailing products",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    productCount: 8,
    slug: "auto-care"
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-600">
            Find the perfect parts for your vehicle from our extensive catalog
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.slug}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.productCount.toLocaleString()} products
                  </span>
                  <span className="text-orange-500 font-medium group-hover:underline">
                    Shop Now →
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

export default Categories;
