import React from 'react';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      console.log(email, password);
    } catch (error) {
      
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
        {error && <p>{error}</p>} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login