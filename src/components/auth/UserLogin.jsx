import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { ENDPOINTS } from '../../constants/backend_urls';
import { useNavigate } from 'react-router-dom';
import { setRole, setToken } from '../../utils/localStorage';
import { FRONTEND_ROUTES } from '../../constants/frontend_urls';

const UserLogin = () => {
  const navigation = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('User Login Data:', formData);
    const res = await axios.post(ENDPOINTS.auth.user.login, formData);

    if(!res.data.success) {
      setMessage(res.data.message)
      return;
    }
    console.log(res);
    

    const { token } = res.data.data;
    setToken(token)
    setRole('regular')

    // if(role === 'admin')
    //   return navigation(FRONTEND_ROUTES.admin_dashboard)
    
      return navigation(FRONTEND_ROUTES.products)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Login</h2>
      
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
          className="pl-10 w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 text-black flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="pl-10 w-full px-4 py-2 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Login
      </button>
      
      <div className="text-center text-sm text-gray-600">
        <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
      </div>
    </form>
  );
};

export default UserLogin;