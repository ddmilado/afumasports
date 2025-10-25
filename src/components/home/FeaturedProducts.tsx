import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const placeholderProducts = [
  {
    id: "1",
    name: "Afuma TechPro Run",
    category: "Men's Running",
    price: 180,
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-in-gym_j0glj1.jpg",
    inStock: true,
  },
  {
    id: "2",
    name: "Afuma Lux-Flex Leggings",
    category: "Women's Yoga",
    price: 120,
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269381/afuma-man-in-gym_y6j2ln.jpg",
    inStock: true,
  },
  {
    id: "3",
    name: "Afuma Aero-Tee",
    category: "Men's Training",
    price: 75,
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-stretching_u2w5r2.jpg",
    inStock: false,
  },
  {
    id: "4",
    name: "Afuma Aura Sports Bra",
    category: "Women's Training",
    price: 95,
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-in-gym_j0glj1.jpg",
    inStock: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Featured Collection</h2>
          <p className="text-lg text-gray-400 mt-2">Discover the art of performance</p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {placeholderProducts.map((product) => (
            <motion.div variants={itemVariants} key={product.id}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

