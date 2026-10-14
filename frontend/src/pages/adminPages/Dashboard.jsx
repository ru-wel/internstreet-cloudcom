import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [user, setUser] = useState([]);
  const [UID, setUID] = useState(null);

  const linkClass = ({ isActive }) => `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200 hover:bg-[#345952] focus-visible:outline-2 focus-visible:outline-white ${isActive ? "bg-[#2C4B45] text-white" : "bg-transparent text-gray-300"}`;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUID(decoded.id);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!UID) return;
        const response = await fetch(import.meta.env.VITE_API_URL + `/users/${UID}`);
        const result = await response.json();
        setUser(result);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    }
    fetchUser();
  }, [UID]);

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard | InternStreet</title>
      </Helmet>
      <div className="flex max-h-full min-h-screen">
        <aside className="h-screen w-64 fixed bg-[#1F3531] text-white flex-shrink-0">
          <div className="p-4 border-b border-[#2C4B45]">
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold">InternStreet | Admin</span>
            </div>
          </div>

          <nav className="mt-5 px-2">
            <div className="space-y-4">
              <NavLink to="/admin-dashboard" className={linkClass}>
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
              </NavLink>

              <NavLink to="/admin-applications" className={linkClass}>
              <svg className="h-5 w-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
              </svg>
                  Applications
              </NavLink>

              <NavLink to="/admin-users" className={linkClass}>
              <svg className="h-5 w-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>

                  Users
              </NavLink>

              <NavLink to="/admin-jobs" className={linkClass}>
              <svg className="h-5 w-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"/>
              </svg>
                  Jobs
              </NavLink>

              <NavLink to="/admin-logs" className={linkClass}>
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Logs
              </NavLink>
            </div>
          </nav>

          <div className="mt-5 p-4 border-t border-[#2C4B45]">
            <Link to="/profile" className="block rounded-lg focus-visible:outline-2 focus-visible:outline-white">
              <div className="flex items-center px-4 py-2.5 rounded-lg group transition-all duration-200 hover:bg-[#345952]">
                <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-200 flex items-center justify-center">
                  <img src={`https://avatar.iran.liara.run/username?username=${user.name}`} alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="px-2">
            <Link to="/" className="focus-visible:outline-2 focus-visible:outline-white flex items-center cursor-pointer px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 group transition-all duration-200 hover:bg-[#345952]">
            <svg className="h-5 w-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            Return to Site
            </Link>
          </div>

          <div className="px-2">
            <Link to="/logout" className="focus-visible:outline-2 focus-visible:outline-white flex items-center cursor-pointer px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 group transition-all duration-200 hover:bg-[#345952]">
            <svg className="h-5 w-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" transform="scale(-1, 1)">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
            </svg>
            Logout
            </Link>
          </div>
          
        </aside>

        <main className="flex-1 p-6 pl-70 bg-gray-100">
            <div className='mt-4 p-6 bg-white rounded-lg shadow-md'>
              <Outlet />
            </div>
        </main>
        
    </div>

    </div>
  )
}

export default Dashboard