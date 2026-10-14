import React, { useState, } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import loginimg from '/images/login.webp';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // Set by UserWrapper when a logged-out user opens a protected page (e.g. /apply)
  const from = useLocation().state?.from;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + `/login`, { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate(from ? from.pathname : '/', { state: from?.state, replace: true });
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
            <img src={loginimg} alt="Login Illustration" loading="lazy" className="hidden md:block w-4/5 mx-auto rounded-2xl shadow-md" />

            {/* Login Form */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#000000] text-center mb-4">Welcome Back!</h2>
              {from && (
                <p role="status" className="text-[#1F3531] bg-[#e6f4f1] rounded-lg p-3 mb-4 text-center">
                  {from.pathname === '/apply' && from.state?.title
                    ? `Log in to apply for ${from.state.title} at ${from.state.name}.`
                    : 'Log in to continue.'}
                </p>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 text-md font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  autoComplete="email"
                  value={email} 
                  placeholder="Enter your email" 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full mt-1 p-3 border rounded-lg text-gray-700 bg-white placeholder-gray-500 focus:ring-2 focus:ring-[#497D74] transition"
                  required
                />

                <label htmlFor="password" className="text-gray-700 text-md font-medium mt-4 mb-1">Password</label>
                <input 
                  type="password" 
                  id="password"
                  name="password" 
                  autoComplete="current-password"
                  value={password} 
                  placeholder="Enter your password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full mt-1 p-3 border rounded-lg text-gray-700 bg-white placeholder-gray-500 focus:ring-2 focus:ring-[#497D74] transition"
                  required
                />

                {error && <p className="text-red-500 text-md font-semibold mt-2">{error}</p>}

                <button 
                  type="submit" 
                  className="bg-[#497D74] text-white py-3 mt-6 rounded-xl font-medium transition transform motion-safe:hover:scale-105 shadow-md"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-6 text-gray-700 text-center">
                  Don't have an account?{' '}
                  <Link to="/register" state={from && { from }} className="font-medium text-[#497D74] hover:underline">
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
