
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Package, MapPin, Settings, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Account = () => {
  const { user } = useAuth();
  const { orders, isLoading: ordersLoading } = useOrders();
  const { favorites, loadFavorites } = useFavorites();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Load wishlist items when favorites tab is active
  const loadWishlistItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          product_id,
          products (
            id,
            name,
            brand,
            price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      setWishlistItems(data?.map(item => ({
        id: item.product_id,
        name: item.products.name,
        brand: item.products.brand,
        price: item.products.price,
        image: item.products.image_url || '/placeholder.svg'
      })) || []);
    } catch (error) {
      console.error('Error loading wishlist items:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPassword(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsUpdatingPassword(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const removeFavorite = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user?.id)
        .eq('product_id', productId);

      if (error) throw error;

      setWishlistItems(prev => prev.filter(item => item.id !== productId));
      loadFavorites(); // Refresh favorites

      toast({
        title: "Removed from wishlist",
        description: "Item removed from your wishlist",
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Load wishlist items when wishlist tab is selected
  if (activeTab === 'wishlist' && wishlistItems.length === 0) {
    loadWishlistItems();
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h1>
          <p className="text-gray-600 mb-8">You need to be signed in to access your account.</p>
          <Button onClick={() => navigate('/auth')} className="bg-orange-500 hover:bg-orange-600">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

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
                <h3 className="font-semibold text-gray-900">
                  {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                </h3>
                <p className="text-gray-600">{user.email}</p>
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
                
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-3 text-left rounded-md text-red-600 hover:bg-red-50 transition-colors"
                >
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
                        <Input 
                          id="firstName" 
                          defaultValue={user.user_metadata?.first_name || ''} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          defaultValue={user.user_metadata?.last_name || ''} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={user.email || ''} 
                        readOnly 
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        defaultValue={user.user_metadata?.phone || ''} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="birthdate">Date of Birth</Label>
                      <Input 
                        id="birthdate" 
                        type="date" 
                        defaultValue={user.user_metadata?.birthdate || ''} 
                      />
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
                  {ordersLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Loading orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                      <Button 
                        onClick={() => navigate('/products')}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">Order {order.order_number}</h3>
                              <p className="text-gray-600">
                                Placed on {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-600">
                                {order.order_items.length} items
                              </p>
                              <p className="font-bold text-lg">${order.total_amount}</p>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {order.status === 'delivered' && (
                                <Button variant="outline" size="sm">
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Saved Addresses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-600 mb-4">Add some items to your wishlist to see them here.</p>
                      <Button 
                        onClick={() => navigate('/products')}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Browse Products
                      </Button>
                    </div>
                  ) : (
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
                              <Button 
                                variant="outline" 
                                className="w-full" 
                                size="sm"
                                onClick={() => removeFavorite(item.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            id="newPassword" 
                            name="newPassword"
                            type="password" 
                            required
                            minLength={6}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password" 
                            required
                            minLength={6}
                          />
                        </div>
                        <Button 
                          type="submit"
                          className="bg-orange-500 hover:bg-orange-600"
                          disabled={isUpdatingPassword}
                        >
                          {isUpdatingPassword ? 'Updating...' : 'Update Password'}
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
