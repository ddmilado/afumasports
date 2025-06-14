
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help. Reach out to our team of automotive experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" type="text" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" type="text" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <select id="subject" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Technical Question</option>
                  <option>Return/Exchange</option>
                  <option>Warranty Claim</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>
              </div>
              
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Auto Street<br />
                      Detroit, MI 48201<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">1-800-AUTO-PARTS</p>
                    <p className="text-gray-600">(1-800-288-6727)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@autopartspro.com</p>
                    <p className="text-gray-600">sales@autopartspro.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 8:00 PM EST<br />
                      Saturday: 9:00 AM - 6:00 PM EST<br />
                      Sunday: 10:00 AM - 4:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Help</h3>
              <div className="space-y-3">
                <a href="/faq" className="block text-orange-500 hover:text-orange-600">
                  → Frequently Asked Questions
                </a>
                <a href="/shipping" className="block text-orange-500 hover:text-orange-600">
                  → Shipping Information
                </a>
                <a href="/returns" className="block text-orange-500 hover:text-orange-600">
                  → Returns & Exchanges
                </a>
                <a href="/warranty" className="block text-orange-500 hover:text-orange-600">
                  → Warranty Information
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
