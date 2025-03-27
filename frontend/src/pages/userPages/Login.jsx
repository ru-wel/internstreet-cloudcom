import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import loginimg from '/images/login.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + `/login`, { email, password });
      await axios.get(import.meta.env.VITE_API_URL + '/utils/detect-browser');
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Login failed! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#8ecfc2] via-[#e1f7f3] to-[#78b8b1] shadow-xl">
      <Helmet>
        <title>Login | InternStreet</title>
      </Helmet>
      <Nav />                    
      <div className="flex flex-col items-center justify-center flex-grow px-4 sm:px-6">
      <h1 className="text-3xl sm:text-5xl font-bold text-[#000000] text-center mb-10 mt-6">Log in to Your Account</h1>

        <div className="bg-gradient-to-r from-[#93c7bd] to-[#cdf2ec] backdrop-blur-lg shadow-xl rounded-3xl p-8 sm:p-12 md:p-16 w-full max-w-4xl border-1 mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image - Hidden on small screens */}
            <img src={loginimg} alt="Login Illustration" className="hidden md:block w-4/5 mx-auto rounded-2xl shadow-md" />

            {/* Login Form */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#000000] text-center mb-4">Welcome Back!</h2>

              <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 text-md font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={email} 
                  placeholder="Enter your email" 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full mt-1 p-3 border rounded-lg text-gray-700 bg-white placeholder-gray-500 focus:ring-2 focus:ring-[#497D74] transition"
                  required
                />

                <label htmlFor="password" className="text-gray-700 text-md font-medium mt-4 mb-1">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={password} 
                  placeholder="Enter your password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full mt-1 p-3 border rounded-lg text-gray-700 bg-white placeholder-gray-500 focus:ring-2 focus:ring-[#497D74] transition"
                  required
                />

                {error && <p className="text-red-500 text-md font-semibold mt-2">{error}</p>}

                <button 
                  type="submit" 
                  className="bg-[#497D74] text-white py-3 mt-6 rounded-lg font-medium transition transform hover:scale-105 shadow-md"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-6 text-gray-700 text-center">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-[#497D74] hover:underline">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
