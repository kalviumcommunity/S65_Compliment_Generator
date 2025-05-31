import axios  from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from './Nav';
import Footer from './Footer';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/user/login', userData);
        const data = response.data; 

        alert(data.message || 'Login successful!');
  
        setUserData({ email: '', password: '' });
        setErrorMessage(''); 
        navigate('/');
      } catch (error) {
        console.error('Signup Error:', error);
        setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
      }
    };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Navigation */}
        <Nav />
        
        <div className="flex justify-center items-center py-20">
          <div className="w-96 p-8 bg-white shadow-2xl rounded-3xl border-4 border-pink-700">
            <h2 className="text-4xl font-extrabold text-lime-800 text-center mb-6">Welcome Back! 👋</h2>
            {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <label className="block text-xl font-medium text-pink-800 mb-2">Email</label>
              <input 
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-lg text-gray-700 border border-pink-800 rounded-lg focus:ring-2 focus:ring-pink-600 outline-none"
                required
              />

              <label className="block text-xl font-medium text-pink-800 mt-4 mb-2">Password</label>
              <input 
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-lg text-gray-700 border border-pink-800 rounded-lg focus:ring-2 focus:ring-pink-600 outline-none"
              />

              <button 
                type="submit"
                className="mt-6 w-full bg-lime-800 text-white text-lg font-semibold py-2 rounded-lg hover:bg-lime-700 transition-all"
              >
                Login
              </button>
            </form>

            <p className="text-center text-pink-800 mt-4">
              Dont have an account? <Link to="/signup" className="font-bold text-lime-800 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Login;
