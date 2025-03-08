import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Nav = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token){
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()){
          localStorage.removeItem('token');
          setRole(null);
        } else { setRole(decoded.role); }
      } catch (error) {
        console.error('Error decoding token: ', error);
      }
    }
  }, []);

  return (
    <div>
      <nav style={{backgroundColor: '#497D74'}}>
        <a href="">Find Jobs</a>
        {!role ? (
          <>
            <a href="/login" style={{ marginRight: '10px', color: 'white', textDecoration: 'none' }}>
              Login
            </a>
            <a href="/signup" style={{ color: 'white', textDecoration: 'none' }}>
              Sign Up
            </a>
          </>
        ) : (
          <>
            {role === 'admin' && (
              <a href="/admin-dashboard" style={{ marginRight: '10px', color: 'white', textDecoration: 'none' }}>
                Admin Dashboard
              </a>
            )}
            <a href="/profile" style={{ marginRight: '10px', color: 'white', textDecoration: 'none' }}>
              Profile
            </a>
            <a href="/logout" style={{ color: 'white', textDecoration: 'none' }}>
              Logout
            </a>
          </>
        )}
      </nav>
    </div>
  )
}

export default Nav