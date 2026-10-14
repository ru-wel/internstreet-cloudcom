import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from '/images/internstreet-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {

  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
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
      <nav className=" top-0 w-full sticky z-50 ">
        <div className='w-full mx-auto px-8 py-3 flex justify-between items-center '>
          <Link to="/landing">
            <img src={logo} alt="InternStreet Logo" className="h-15 w-auto" />
          </Link>

          {/* Crabby Patty */}
          <div className="relative md:hidden">
            <button 
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="text-black text-2xl p-3 -m-3" 
              onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
            
            {/* Mobile Nav */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-30 bg-[#8bbcb4] shadow-lg rounded-lg py-2 flex flex-col text-center items-center border border-[#497D74]">
                <Link to="/" className="block px-4 py-2 text-[#1F3531] font-medium w-full">Find Jobs</Link>
                {!role ? (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-[#1F3531] font-medium  text-center mx-2">Login</Link>
                    <Link to="/register" className="block px-4 py-2 text-[#1F3531] font-medium  text-center mx-2">Sign Up</Link>
                  </>
                ) : (
                  <>
                    {role === 'admin' && (
                      <Link to="/admin-dashboard" className="block px-4 py-2 text-[#1F3531] font-medium  w-full">Admin Dashboard</Link>
                    )}
                    <Link to="/profile" className="block px-4 py-2 text-[#1F3531] font-medium  w-full">Profile</Link>
                    <Link to="/logout" className="block px-4 py-2 text-[#1F3531] font-medium  w-full">Logout</Link>
                  </>
                )}
              </div>
            )}
          </div>

            {/* Tablet-Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-black">Find Jobs</Link>

            {!role ? (
              <>
                <Link to="/login" className="border-2 border-[#497D74] text-black rounded-full py-2 px-6 hover:bg-[#497D74] hover:text-white transition transform motion-safe:hover:scale-105">
                  Login
                </Link>
                <Link to="/register" className="border-2 border-[#497D74] bg-[#497D74] text-white rounded-full py-2 px-6 transition transform motion-safe:hover:scale-105">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {role === 'admin' && (
                  <Link to="/admin-dashboard" className="text-black">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" className="border-2 border-[#497D74] text-black rounded-full py-2 px-6 hover:bg-[#497D74] hover:text-white">
                  Profile
                </Link>
                <Link to="/logout" className="border-2 border-[#497D74] bg-[#497D74] text-white rounded-full py-2 px-6">
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav