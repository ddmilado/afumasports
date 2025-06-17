
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Engine Parts",
    description: "Pistons, gaskets, filters & more",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    href: "/categories/engine",
    itemCount: 1247
  },
  {
    id: 2,
    name: "Brake System",
    description: "Pads, rotors, calipers & components",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    href: "/categories/brakes",
    itemCount: 856
  },
  {
    id: 3,
    name: "Suspension",
    description: "Shocks, struts, springs & bushings",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
    href: "/categories/suspension",
    itemCount: 623
  },
  {
    id: 4,
    name: "Electrical",
    description: "Batteries, alternators & sensors",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    href: "/categories/electrical",
    itemCount: 934
  },
  {
    id: 5,
    name: "Transmission",
    description: "Filters, fluids & rebuild kits",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    href: "/categories/transmission",
    itemCount: 445
  },
  {
    id: 6,
    name: "Auto Care",
    description: "Car wash, wax, cleaners & detailing",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    href: "/categories/auto-care",
    itemCount: 8
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Find the exact parts you need with our comprehensive catalog organized by vehicle systems
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-500"
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
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.itemCount} items</span>
                  <span className="text-orange-500 font-medium group-hover:text-orange-600">
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
