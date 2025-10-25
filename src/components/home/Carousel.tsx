import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-in-gym_j0glj1.jpg",
    headline: "Performance Meets Style",
    subheadline: "Discover our latest collection of luxury activewear."
  },
  {
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269381/afuma-man-in-gym_y6j2ln.jpg",
    headline: "Engineered for Excellence",
    subheadline: "Experience the difference with our premium fabrics."
  },
  {
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1750269382/afuma-woman-stretching_u2w5r2.jpg",
    headline: "Unleash Your Potential",
    subheadline: "Elevate your workout with Afuma Sports."
  }
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));

  useEffect(() => {
    const slideInterval = setInterval(next, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img src={slides[current].image} className="w-full h-screen object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <AnimatePresence>
          <motion.h1
            key={current}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold"
          >
            {slides[current].headline}
          </motion.h1>
          <motion.p
            key={current + '_sub'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-lg md:text-xl"
          >
            {slides[current].subheadline}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all w-3 h-3 bg-white rounded-full cursor-pointer ${
                current === i ? "p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
