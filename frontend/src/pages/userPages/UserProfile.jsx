import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Nav from '../components/Nav';
import person from '/images/person-placeholder.png';
import Footer from '../components/Footer';

function UserProfile() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState({ name: '', location: '', number: '', bio: '', });
  const maxChars = 300;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [UID, setUID] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUID(decoded.id);
    }
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(error).length === 0){
      try {
        const response = await axios.put(import.meta.env.VITE_API_URL + `/users/profile/${UID}`, editUser);
        alert('User details updated succesfully!');
        setEditModalOpen(false);
        setUser(editUser);
      } catch (error) {
        console.error('Error updating user:', error);
        alert(error.response.data.message || 'Failed to update user details.');
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        if (!UID) return;
        const response = await fetch(import.meta.env.VITE_API_URL + `/users/${UID}`);
        const result = await response.json();
        setUser(result);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message || 'Failed to fetch user.');
      } finally { 
        setLoading(false); 
      }
    }
    fetchUser();
  }, [UID]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/apply-job');
        const result = await response.json();
        setApplications(result);
      } catch (error) {
        console.error('Error fetching applications:', err);
        setError(err.message || 'Failed to fetch applications.');
      }
    }
    fetchApplications();
  }, []);

  return (
    <div className='bg-gradient-to-br from-[#8ecfc2] via-[#e1f7f3] to-[#78b8b1]'>
      <Helmet>
        <title>My Profile | InternStreet</title>
      </Helmet>
      <Nav></Nav>

      {loading ? (
        <div className="text-center py-12 ">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F3531] mx-auto "></div>
          <p className="mt-4 text-gray-500">Loading data...</p>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (

        <div className="flex flex-col items-center w-full px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold py-2 tracking-wide mt-16 sm:mt-20 mb-8 sm:mb-10 text-center">
          My Profile
        </h1>
      
        <div className="bg-gradient-to-br from-[#8ecfc2] via-[#e1f7f3] to-[#78b8b1] rounded-3xl flex flex-col items-center mx-auto my-5 w-full max-w-6xl shadow-lg p-6 sm:p-10 border">
          <div className="flex flex-col md:flex-row w-full gap-6">
            
            {/* Profile Card */}
            <div className="bg-gradient-to-r from-[#8ac4be] via-[#a6dbd0] to-[#80c7bf] border backdrop-blur-lg rounded-2xl p-6 sm:p-8 mt-10 md:mt-8 md:w-1/3 relative shadow-md text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-stone-100 p-1 shadow-lg absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img src={person} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
      
              <div className="mt-14 sm:mt-16 text-white">
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">{user.name}</h1>
      
                <div className="flex items-center justify-center gap-1 my-3 text-white text-lg sm:text-base">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{user.location || "ADD YOUR LOCATION"}</span>
                </div>
      
                <div className="flex items-center justify-center gap-1 text-white text-sm sm:text-base">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{user.email}</span>
                </div>
              </div>
      
              <div className="mt-6">
                <button className="bg-[#619c92] border-[#2b4843] border-r-4 border-b-4 text-white py-2 px-4 rounded-3xl transition hover:scale-105 text-sm sm:text-base">
                  Edit Profile
                </button>
              </div>
            </div>
      
            {/* About Me Section */}
            <div className="md:w-2/3 bg-gradient-to-r from-[#8ecfc2] via-[#a9dbd1] to-[#80c7bf]  border-zinc-600 backdrop-blur-lg rounded-2xl p-6 sm:p-8 mt-6 md:mt-8 shadow-md border">
              <h3 className="text-xl sm:text-xl font-bold mb-4 sm:mb-6 text-white border-b border-[#497D74] pb-2">
                About Me
              </h3>
      
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h4 className=" sm:text-sm uppercase text-white text-lg mb-1">Bio</h4>
                  <p className="text-white text-lg sm:text-base">{user.bio || "ADD YOUR BIO"}</p>
                </div>
      
                <div>
                  <h4 className="text-xs sm:text-sm uppercase text-white font-medium mb-1">Contact</h4>
                  <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{user.number || "ADD YOUR PHONE NUMBER"}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* MODAL SECTION */}

            {editModalOpen && (
              <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Edit User</h2>

                  <form onSubmit={handleEditSubmit}>

                    <input type="text" placeholder="name" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>

                    <input type="text" placeholder="location" value={editUser.location} onChange={(e) => setEditUser({ ...editUser, location: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>

                    <input type="text" placeholder="number (09**)" maxLength="11" value={editUser.number} onChange={(e) => setEditUser({ ...editUser, number: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>

                    <textarea placeholder='personal bio' value={editUser.bio} onChange={(e) => {
                      if (e.target.value.length <= maxChars){
                        setEditUser({ ...editUser, bio: e.target.value })
                      }
                      }} 
                      required className="w-full min-h-24 p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </textarea>

                    <div className="text-right text-sm mt-1">
                      <span className={(editUser.bio?.length ?? 0) >= maxChars - 10 ? "text-red-500" : "text-gray-500"}>
                        {editUser.bio?.length ?? 0}/{maxChars}
                      </span>
                    </div>

                    <div className="flex justify-end space-x-3 mt-2">
                      <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800  rounded-2xl hover:bg-gray-300 transition-colors">
                        Cancel
                      </button>
                      <button type="submit" className="bg-[#5c938a] border-[#2b4843] border-r-4 border-b-4 text-white py-2 px-4 rounded-2xl transition transform hover:scale-105 mb-4 sm:mb-0 cursor-pointer">
                        Save
                      </button>
                    </div>
                  </form>
                  
                </div>
              </div>
            )}   
            </div>
          </div>

          {/* APPLICATIONS SECTION */}

          <div className='bg-gradient-to-br from-[#8ecfc2] via-[#e1f7f3] to-[#78b8b1] border rounded-3xl flex flex-col items-center mx-auto my-5 max-w-6xl shadow-lg w-[95%] mb-30'>
            <div className="w-full flex items-center justify-center min-h-full p-6 lg:p-10">
              <div className="container max-w-6xl">
                <div className="bg-gradient-to-br from-[#f5f0e1] via-[#f5f0e1] to-[#ddd8c9] rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 ">Applications</h2>
                        <p className="text-gray-500 mt-1">View and manage your applications here.</p>
                      </div>
                    </div>
                  </div>
                
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-br from-[#f5f0e1] via-[#f5f0e1] to-[#ddd8c9] ">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Company
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Position
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Application Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gradient-to-br from-[#f5f0e1] via-[#f5f0e1] to-[#ddd8c9] divide-y divide-gray-200">
                        {applications.map((application, index) => (
                          <tr key={index} className="hover:bg-yellow-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full object-cover" src={application.c_logo} alt="" /> { /* TO BE CHANGED */ }
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{application.c_name}</div>
                                  <div className="text-sm text-gray-500">{application.c_location}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900"><a href={`/job/${application.job_id}`} className='text-blue-500 underline'>{application.c_position}</a></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  application.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : application.status === 'approved'
                                    ? 'bg-green-100 text-green-800'
                                    : application.status === 'denied'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                {application.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{application.applied_at.split('T')[0]}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}
      <Footer></Footer>
    </div>
  )
}

export default UserProfile