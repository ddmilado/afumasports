
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_enquiries')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: ""
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
        <div className="relative z-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">Contact Us</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team of automotive experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-orange-500 pb-3">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    type="text" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="focus:border-orange-500 focus:ring-orange-500"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    type="text" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="focus:border-orange-500 focus:ring-orange-500"
                    required 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="focus:border-orange-500 focus:ring-orange-500"
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <select 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Technical Question</option>
                  <option>Return/Exchange</option>
                  <option>Warranty Claim</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  rows={5} 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help..."
                  className="focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-orange-500 pb-3">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      Dubai Marina<br />
                      Dubai, United Arab Emirates<br />
                      P.O. Box 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+971-55-288-0435</p>
                    <p className="text-gray-600">WhatsApp Available</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@auronauto.com</p>
                    <p className="text-gray-600">sales@auronauto.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Working Hours</h3>
                    <p className="text-gray-600">
                      Sunday - Thursday: 9:00 AM - 7:00 PM GST<br />
                      Friday: 2:00 PM - 7:00 PM GST<br />
                      Saturday: 9:00 AM - 6:00 PM GST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 transition-transform duration-300 hover:scale-[1.02]">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-orange-500 pb-3">Quick Help</h2>
              <div className="space-y-4">
                <a href="/faq" className="block text-slate-700 hover:text-orange-600 font-medium text-lg group transition-all duration-300 ease-in-out">
                  → <span className="group-hover:underline group-hover:ml-1 transition-all duration-300 ease-in-out">Frequently Asked Questions</span>
                </a>
                <a href="/shipping" className="block text-slate-700 hover:text-orange-600 font-medium text-lg group transition-all duration-300 ease-in-out">
                  → <span className="group-hover:underline group-hover:ml-1 transition-all duration-300 ease-in-out">Shipping Information</span>
                </a>
                <a href="/returns" className="block text-slate-700 hover:text-orange-600 font-medium text-lg group transition-all duration-300 ease-in-out">
                  → <span className="group-hover:underline group-hover:ml-1 transition-all duration-300 ease-in-out">Returns & Exchanges</span>
                </a>
                <a href="/warranty" className="block text-slate-700 hover:text-orange-600 font-medium text-lg group transition-all duration-300 ease-in-out">
                  → <span className="group-hover:underline group-hover:ml-1 transition-all duration-300 ease-in-out">Warranty Information</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div> {/* Closes div.relative.z-20 */}
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
