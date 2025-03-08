import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email
          <input type="email" name="email" value={email} onChange={handleEmailChange} style={{border: '1px solid #000'}}/>
        </label>
        <label htmlFor="password">Password
          <input type="password" name="password" value={password} onChange={handlePasswordChange} style={{border: '1px solid #000'}}/>
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login