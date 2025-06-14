
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Users, Package, DollarSign, TrendingUp, Plus, Edit, Trash2 } from "lucide-react";
import Header from "@/components/layout/Header";

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Revenue', value: '$124,856', change: '+12.5%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Total Orders', value: '1,247', change: '+8.2%', icon: Package, color: 'text-blue-600' },
    { label: 'Total Customers', value: '892', change: '+15.3%', icon: Users, color: 'text-purple-600' },
    { label: 'Conversion Rate', value: '3.24%', change: '+2.1%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', total: 179.98, status: 'Processing', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Jane Smith', total: 89.99, status: 'Shipped', date: '2024-01-14' },
    { id: 'ORD-003', customer: 'Mike Johnson', total: 245.50, status: 'Delivered', date: '2024-01-13' }
  ];

  const products = [
    { id: 1, name: 'Premium Brake Pad Set', brand: 'AcmeParts', price: 89.99, stock: 15, status: 'In Stock' },
    { id: 2, name: 'High-Flow Air Filter', brand: 'FlowMax', price: 45.99, stock: 8, status: 'Low Stock' },
    { id: 3, name: 'Performance Shock Absorber', brand: 'RideControl', price: 124.99, stock: 0, status: 'Out of Stock' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
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
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Order ID</th>
                          <th className="text-left py-3 px-4">Customer</th>
                          <th className="text-left py-3 px-4">Total</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{order.id}</td>
                            <td className="py-3 px-4">{order.customer}</td>
                            <td className="py-3 px-4">${order.total}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">{order.date}</td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Products</h2>
                  <div className="flex items-center space-x-4">
                    <Input placeholder="Search products..." className="w-64" />
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Product</th>
                        <th className="text-left py-3 px-4">Brand</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Stock</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{product.name}</td>
                          <td className="py-3 px-4">{product.brand}</td>
                          <td className="py-3 px-4">${product.price}</td>
                          <td className="py-3 px-4">{product.stock}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                              product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">All Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Total</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">${order.total}</td>
                          <td className="py-3 px-4">
                            <select className="border rounded px-2 py-1 text-sm">
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Customers</h2>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Customer management coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
