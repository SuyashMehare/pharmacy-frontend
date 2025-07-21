import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { ENDPOINTS, PHARMACY_BACKEND } from '../../constants/backend_urls';
import { useNavigate } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../constants/frontend_urls';

const UserSignup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    message: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('User Signup Data:', formData);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    const res = await axios.post(ENDPOINTS.auth.user.signup, {
      email: formData.email,
      password: formData.password
    })

    if(!res.data.success) {
      setFormData(prev => ({...prev, message: res.data.message}))
      return;
    }
    
    setFormData(prev => ({...prev, message: res.data.message}))
    // navigate(FRONTEND_ROUTES.login)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Sign Up</h2>
      
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
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Sign Up
      </button>
    </form>
  );
};

export default UserSignup;