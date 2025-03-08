import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

  const [userData, setUserData] = useState({ name: '', email: '', password: '', });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateData = () => {
    const error = {};

    if (!userData.password || userData.password.length < 8 || !!/[A-Z]/.test(userData.password)){
      error.password = 'Password must be at least 8 characters and must include an uppercase letter.';
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
        console.log(userData);
        // insert axios link here
        navigate('/login');
      } catch (error) {
        console.error(error);
        alert(error.response.data.message || 'Registration failed');
      } finally { setLoading(false); }
    } else {
      console.log("Error with input validation: ", error);
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Full Name
          <input type="text" name="name" value={userData.name} onChange={handleChange} required style={{border: '1px solid #000'}}/>
        </label>

        <label htmlFor="email">Email
          <input type="email" name="email" value={userData.email} onChange={handleChange} required style={{border: '1px solid #000'}}/>
        </label>

        <label htmlFor="password">Password
          <input type="password" name="password" value={userData.password} onChange={handleChange} required style={{border: '1px solid #000'}}/>
        </label>

        {error.password && <p style={{ color: 'red' }}>{error.password}</p>} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}

        <button type='submit' disabled = {loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
    </div>
  )
}

export default Register