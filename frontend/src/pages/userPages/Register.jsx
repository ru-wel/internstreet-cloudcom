import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import Footer from '../components/Footer'

function Register() {

  const [userData, setUserData] = useState({ name: '', email: '', password: '', password2: '', });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateData = () => {
    const error = {};

    if (!userData.password || userData.password.length < 8 || !/[A-Z]/.test(userData.password)){
      error.password = 'Password must be at least 8 characters and must include an uppercase letter.';
    }

    if (userData.name.length > 100){
      error.name = 'Name must not succeed 100 characters.';
    }

    if (userData.email.length > 100){
      error.email = 'Email must not succeed 100 characters.';
    }
    
    setError(error);
    return Object.keys(error).length === 0;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value, });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (validateData()){
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/register', userData);
        setUserData({ name: '', email: '', password: '', password2: '', });
        alert('Registration successful! You can now log in.');
        navigate('/login');
      } catch (error) {
        console.error(error);
        alert(error.response.data.message || 'Registration failed');
      } finally { 
        setLoading(false); 
      }
    } else {
      console.log("Error with input validation: ", error);
      setLoading(false);
    }
  }

  const match = userData.password === userData.password2;

  return (
    <div className='bg-gradient-to-br from-[#8ecfc2] via-[#e1f7f3] to-[#78b8b1] shadow-xl'>
      <Helmet>
        <title>Register | InternStreet</title>
      </Helmet>
      <Nav></Nav>
      <h1 className='lg:text-5xl text-3xl font-bold text-center my-10'>Create Your Account</h1>

      <div className='flex items-center justify-center mx-8 my-10'>
        <div className='bg-gradient-to-r from-[#87b7ad] to-[#b1d3cd] backdrop-blur-lg shadow-xl rounded-3xl p-8 sm:p-12 md:p-16 w-full max-w-xl border-1 mb-16'>
          <h2 className='text-4xl font-bold mb-6 mt-4 text-white'>Sign Up</h2>

          <form onSubmit={handleSubmit} className='flex flex-col px-2'>

            <label htmlFor="name" className='text-left text-white text-md font-medium mb-1'>Name
              <input type="text" name="name"  value={userData.name} onChange={handleChange} required placeholder='Name' className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
            </label>

            <label htmlFor="email" className='text-left text-white text-md font-medium mb-1'>Email
              <input type="email" name="email"  value={userData.email} onChange={handleChange} required placeholder='Email' className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
            </label>

            <label htmlFor="password" className='text-left text-white font-medium'>Password
              <input type="password" name="password" value={userData.password} onChange={handleChange} required placeholder='Password' className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
            </label>

            <label htmlFor="password2" className='text-left text-white font-medium'>Repeat Password
              <input type="password" name="password2" value={userData.password2} onChange={handleChange} required placeholder='Repeat Password' className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
            </label>

            {(error.password || error.name || error.email) && (
              <p className='text-red-500 text-md font-bold'>
                {error.password || error.name || error.email}
              </p>
            )} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}

            {!match && userData.password2 && (
              <p className='text-red-500 text-md font-bold'>Passwords do not match!</p>
            )} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}

            {match && userData.password2 && (
              <p className='text-green-500 text-md font-bold'>Passwords match!</p>
            )} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}

            <button type='submit' disabled = {loading} className="bg-[#497D74] text-white p-3 mt-6 rounded-xl font-medium transition transform hover:scale-105">
            {loading ? 'Registering...' : 'Register'}
            </button>

            <p className='mt-6 text-white'>
              Already have an account?{' '}
              <a href="/login" className="font-medium hover:underline">Log in</a>
            </p>
          </form>
        </div>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default Register