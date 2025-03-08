import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      console.log(email, password);
      const response = await axios.post(`http://localhost:3000/login`, { email, password });
      await axios.get('http://localhost:3000/utils/detect-browser');
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // navigate('/job-listing');
      navigate('/'); // ----- TESTING PURPOSES ONLY -----
    } catch (error) {
      console.error('Login failed: ', error.response.data || error.message);
      setError(error.response.data.message || 'Login failed! Please try again.');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div>
      <Nav></Nav>
      <h1 className='lg:text-5xl text-3xl font-bold text-center my-10'>Log in to Your Account</h1>

      <div className='flex items-center justify-center mx-8'>
        <div className='bg-[#27445D] lg:p-12 p-4 rounded-4xl shadow-lg text-center max-w-md w-full'>
          <h2 className='text-4xl font-bold mb-6 mt-4 text-white'>Log in</h2>

          <form onSubmit={handleSubmit} className='flex flex-col px-2'>
            <label htmlFor="email" className='text-left text-white text-md font-medium mb-1'>Email
              <input type="email" name="email" value={email} placeholder='Email' onChange={handleEmailChange} className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
            </label>

            <label htmlFor="password" className='text-left text-white font-medium'>Password
              <input type="password" name="password" value={password} placeholder='Password' onChange={handlePasswordChange} className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
            </label>

            {error && <p className='text-red-500 text-md font-bold'>{error}</p>} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}

            <button type='submit' className="bg-[#497D74] text-white py-3 mt-6 rounded-2xl font-medium transition transform hover:scale-105">
              Submit
            </button>

            <p className='mt-6 text-white'>
              Don't have an Account?{' '}
              <a href="/register" className="font-medium hover:underline">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login