
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Package, MapPin, Settings, Heart, LogOut } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 179.98,
      items: 3
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 89.99,
      items: 1
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      status: "Processing",
      total: 245.50,
      items: 4
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Performance Air Intake",
      brand: "AirFlow Pro",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      name: "LED Headlight Kit",
      brand: "BrightBeam",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop"
    }
  ];

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-gray-600">john.doe@email.com</p>
              </div>
              
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors ${
                      activeTab === item.id
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                ))}
                
                <button className="w-full flex items-center px-4 py-3 text-left rounded-md text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@email.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    
                    <div>
                      <Label htmlFor="birthdate">Date of Birth</Label>
                      <Input id="birthdate" type="date" />
                    </div>
                    
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Update Profile
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Order History</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">Order {order.id}</h3>
                            <p className="text-gray-600">Placed on {order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">{order.items} items</p>
                            <p className="font-bold text-lg">${order.total}</p>
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {order.status === 'Delivered' && (
                              <Button variant="outline" size="sm">
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Saved Addresses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Home Address</h3>
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Default</span>
                      </div>
                      <div className="text-gray-600">
                        <p>123 Main Street</p>
                        <p>Apartment 4B</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                      </div>
                      <div className="mt-4 space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center">
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Add New Address
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Wishlist</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                          <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-lg font-bold text-orange-500 mb-4">${item.price}</p>
                          <div className="space-y-2">
                            <Button className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                              Add to Cart
                            </Button>
                            <Button variant="outline" className="w-full" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <form className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          Update Password
                        </Button>
                      </form>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span>Order updates and shipping notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span>New product announcements</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span>Special offers and promotions</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
