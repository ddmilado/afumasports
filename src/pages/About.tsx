
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Truck, Users, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About AutoParts Pro</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for premium automotive parts since 2010. We're committed to providing 
            quality parts, expert service, and competitive prices to keep your vehicles running smoothly.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">14</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">100K+</h3>
            <p className="text-gray-600">Parts Delivered</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
              Founded in 2010 by automotive enthusiasts, AutoParts Pro started as a small garage 
              operation with a simple mission: provide high-quality automotive parts at fair prices 
              with exceptional customer service.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we've grown from a local operation to a nationwide supplier, but our 
              core values remain the same. We believe that every vehicle deserves quality parts and 
              every customer deserves expert advice.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of customers across the country, from weekend 
              warriors to professional mechanics, helping them keep their vehicles running at peak performance.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop" 
              alt="AutoParts Pro warehouse"
              className="rounded-lg shadow-md w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We only stock parts from trusted manufacturers that meet or exceed OEM specifications.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600">
                Our knowledgeable team is here to help you find the right parts for your specific vehicle.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fair Pricing</h3>
              <p className="text-gray-600">
                We believe quality parts shouldn't break the bank. That's why we offer competitive prices every day.
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
