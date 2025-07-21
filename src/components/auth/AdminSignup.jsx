import { useState } from 'react';
import { Mail, Lock, Shield, Users, Package, ShoppingCart, Truck, Settings } from 'lucide-react';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    manageUsers: false,
    manageInventory: false,
    manageOrders: false,
    manageVendors: false,
    systemSettings: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your admin signup logic here
    console.log('Admin Signup Data:', {
      ...formData,
      role: 'Admin'
    });
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Proceed with signup
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Sign Up</h2>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-500" />
          Admin Permissions
        </h3>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="manageUsers"
              checked={formData.manageUsers}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="flex items-center text-gray-700">
              <Users className="h-4 w-4 mr-2" /> Manage Users
            </span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="manageInventory"
              checked={formData.manageInventory}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="flex items-center text-gray-700">
              <Package className="h-4 w-4 mr-2" /> Manage Inventory
            </span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="manageOrders"
              checked={formData.manageOrders}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="flex items-center text-gray-700">
              <ShoppingCart className="h-4 w-4 mr-2" /> Manage Orders
            </span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="manageVendors"
              checked={formData.manageVendors}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="flex items-center text-gray-700">
              <Truck className="h-4 w-4 mr-2" /> Manage Vendors
            </span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="systemSettings"
              checked={formData.systemSettings}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="flex items-center text-gray-700">
              <Settings className="h-4 w-4 mr-2" /> System Settings
            </span>
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Create Admin Account
      </button>
    </form>
  );
};

export default AdminSignup;