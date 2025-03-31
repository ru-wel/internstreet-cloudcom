import React, { useEffect, useState } from 'react';
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
          <a href="/landing">
            <img src={logo} alt="InternStreet Logo" className="h-15 w-auto" />
          </a>

          {/* Crabby Patty */}
          <div className="relative md:hidden">
            <button 
              className="text-black text-2xl focus:outline-none" 
              onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            
            {/* Mobile Nav */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-30 bg-[#8bbcb4] shadow-lg rounded-lg py-2 flex flex-col text-center items-center border border-[#497D74]">
                <a href="/" className="block px-4 py-2 text-white w-full">Find Jobs</a>
                {!role ? (
                  <>
                    <a href="/login" className="block px-4 py-2 text-white  text-center mx-2">Login</a>
                    <a href="/register" className="block px-4 py-2 text-white  text-center mx-2">Sign Up</a>
                  </>
                ) : (
                  <>
                    {role === 'admin' && (
                      <a href="/admin-dashboard" className="block px-4 py-2 text-white  w-full">Admin Dashboard</a>
                    )}
                    <a href="/profile" className="block px-4 py-2 text-white  w-full">Profile</a>
                    <a href="/logout" className="block px-4 py-2 text-white  w-full">Logout</a>
                  </>
                )}
              </div>
            )}
          </div>

            {/* Tablet-Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="/" className="text-black">Find Jobs</a>

            {!role ? (
              <>
                <a href="/login" className="border-2 border-[#497D74] text-black rounded-full py-2 px-6 hover:bg-[#497D74] hover:text-white transition transform hover:scale-105">
                  Login
                </a>
                <a href="/register" className="border-2 border-[#497D74] bg-[#497D74] text-white rounded-full py-2 px-6 transition transform hover:scale-105">
                  Sign Up
                </a>
              </>
            ) : (
              <>
                {role === 'admin' && (
                  <a href="/admin-dashboard" className="text-black">
                    Admin Dashboard
                  </a>
                )}
                <a href="/profile" className="border-2 border-[#497D74] text-black rounded-full py-2 px-6 hover:bg-[#497D74] hover:text-white">
                  Profile
                </a>
                <a href="/logout" className="border-2 border-[#497D74] bg-[#497D74] text-white rounded-full py-2 px-6">
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav