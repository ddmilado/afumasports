import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const prev = () => setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
  const next = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));

  useEffect(() => {
    const slideInterval = setInterval(next, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div className="w-full flex-shrink-0 relative" key={i}>
            <img src={slide.image} className="w-full h-screen object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-bold">{slide.headline}</h1>
              <p className="mt-4 text-lg md:text-xl">{slide.subheadline}</p>
            </div>
          </div>
        ))}
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
