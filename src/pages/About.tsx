
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Truck, Users, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-32">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Auron Autospace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for premium automotive parts and innovative solutions since 2020. 
            We're committed to providing cutting-edge parts, expert service, and competitive prices 
            to keep your vehicles running at peak performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">25K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">4</h3>
            <p className="text-gray-600">Years Excellence</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
            <p className="text-gray-600">Parts Delivered</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Customer Support</p>
          </div>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020 in the heart of Dubai, Auron Autospace emerged from a vision to 
              revolutionize the automotive parts industry in the UAE and beyond. We started as a 
              tech-driven operation with a clear mission: provide premium automotive parts with 
              innovative solutions and exceptional customer service.
            </p>
            <p className="text-gray-600 mb-4">
              Located in the vibrant Dubai Marina, we've quickly grown to become a trusted supplier 
              across the Emirates, but our core values remain unchanged. We believe that every vehicle 
              deserves cutting-edge parts and every customer deserves expert, personalized service.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of customers across the region, from automotive 
              enthusiasts to professional mechanics, helping them achieve peak vehicle performance 
              with our innovative solutions.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop" 
              alt="Auron Autospace facility"
              className="rounded-lg shadow-md w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation First</h3>
              <p className="text-gray-600">
                We source the latest automotive technologies and parts that exceed industry standards and OEM specifications.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Solutions</h3>
              <p className="text-gray-600">
                Our specialized team provides technical expertise to help you find the perfect parts for your specific needs.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Competitive Excellence</h3>
              <p className="text-gray-600">
                We believe premium quality shouldn't compromise affordability. That's why we offer competitive pricing every day.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
