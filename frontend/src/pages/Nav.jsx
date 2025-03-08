import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/internstreet-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  
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
      <nav className='bg-[#a4bdb9] shadow-md fixed w-full top-0 left-0 z-50 rounded-3xl'>
        <div className='w-[95%] mx-auto px-4 py-3 flex justify-between items-center rounded-lg'>
          <a href="#">
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
              <div className="absolute right-0 mt-2 w-30 bg-[#a4bdb9] shadow-lg rounded-lg py-2 flex flex-col text-center items-center border border-[#497D74]">
                <a href="#" className="block px-4 py-2 text-gray-700 w-full">Find Jobs</a>
                {!role ? (
                  <>
                    <a href="/login" className="block px-4 py-2 text-gray-700 text-center mx-2">Login</a>
                    <a href="/signup" className="block px-4 py-2 text-gray-700 text-center mx-2">Sign Up</a>
                  </>
                ) : (
                  <>
                    {role === 'admin' && (
                      <a href="/admin-dashboard" className="block px-4 py-2 text-gray-700 w-full">Admin Dashboard</a>
                    )}
                    <a href="/profile" className="block px-4 py-2 text-gray-700 w-full">Profile</a>
                    <a href="/logout" className="block px-4 py-2 text-gray-700 w-full">Logout</a>
                  </>
                )}
              </div>
            )}
          </div>

            {/* Tablet-Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#" className="text-black">Find Jobs</a>

            {!role ? (
              <>
                <a href="/login" className="border-2 border-[#497D74] text-black rounded-full py-2 px-6 hover:bg-[#497D74] hover:text-white">
                  Login
                </a>
                <a href="/signup" className="border-2 border-[#497D74] bg-[#497D74] text-white rounded-full py-2 px-6">
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