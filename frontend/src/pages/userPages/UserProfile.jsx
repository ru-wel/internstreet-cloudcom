import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { FaLinkedin, FaGithub, FaEnvelope, FaBookmark } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import person from '/images/person-placeholder.png';
import Footer from '../components/Footer';
import google from '/images/google-logo.png';

function UserProfile() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState({ name: '', }); // ADD MORE FIELDS LATUR
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [UID, setUID] = useState(null);
  const [applications, setApplications] = useState([]);

  // const toggleModal = () => {
  //   setModalOpen(!isModalOpen);
  // }

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
        const response = await axios.put(`http://localhost:3000/users/profile/${UID}`, editUser);
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
        const response = await fetch(`http://localhost:3000/users/${UID}`);
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
        const response = await fetch('http://localhost:3000/apply-job');
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
    <div>
      <Nav></Nav>

      {/* MAS MADAGUL RIGHT CONTAINER */}

      {loading ? (
      <div className='flex justify-center align-middle h-screen w-screen'>Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (

        <div className='bg-[#ADC4C0] rounded-3xl flex flex-col items-center mx-5 my-5'> {/* remove mx-5 my-5 if ever, rounded-t-3xl */}
          <div className="flex flex-col md:flex-row lg:px-20 px-10 pt-26 pb-2 lg:w-4/5">

            <div className="bg-[#497D74] rounded-3xl p-6 md:w-1/3 relative">
              <div className="w-32 h-32 rounded-full border-4 border-gray-400 bg-cover bg-center absolute top-[-60px] left-1/2 transform -translate-x-1/2">
                <img src={person} alt="Profile" className="w-full h-full rounded-full" />
              </div>

              <div className="mt-20 text-white text-left">
                <h1 className="text-5xl font-bold">{user.name}</h1>
                <p className="text-xl my-4 text-[#EFE9D5]">Angeles City, Philippines | TO BE ADDED</p>
                <p className="text-xl text-[#EFE9D5]">{user.email}</p>
              </div>

              {/* TO BE DISCUSSED (CONTACT) */}

              {/* <div className="mt-6 text-left text-white">
                <h3 className="text-xl font-semibold">Contact</h3>
                <hr className="border-gray-700 border-t-2 my-2" />
                <div className="flex justify-start space-x-4 text-2xl">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href="mailto:example@example.com">
                    <FaEnvelope />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </div>
              </div> */}

              <div className="mt-6 text-right">
                <button className="bg-[#27445d] border-2 border-[#1d3346] border-b-6 border-r-6 text-white py-2 px-6 rounded-2xl transition transform hover:scale-105 mb-4 sm:mb-0 cursor-pointer" onClick={() => handleEdit(user)}>
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="mt-6 md:mt-0 md:w-2/3 md:ml-6 bg-[#EFE9D5] rounded-3xl p-10 shadow-lg">
              <h3 className="lg:text-5xl text-4xl font-bold mb-4">Personal Details:</h3>
              <p><strong>Bio:</strong> I am Levina. A Full-Stack Web Developer. I break down complex user experience problems to create integrity focussed solutions that connect billions of people. | TO BE ADDED</p>
              <p><strong>Phone:</strong> 0912 345 6789 | TO BE ADDED</p>
            </div>

          </div>

          {/* MODAL SECTION */}

          {editModalOpen && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Edit User</h2>
                {/* {errors.lrn && <p className="text-red-500 mb-3">{errors.lrn}</p>}
                {errors.password && <p className="text-red-500 mb-3">{errors.password}</p>} */}

                <form onSubmit={handleEditSubmit}>
                  <input type="text" placeholder="name" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/> { /* ADD MORE FIELDS LATER */ }
                  <div className="flex justify-end space-x-3 mt-2">
                    <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="bg-[#27445d] border-2 border-[#1d3346] border-b-6 border-r-6 text-white py-2 px-6 rounded-2xl transition transform hover:scale-105 mb-4 sm:mb-0 cursor-pointer">
                      Save
                    </button>
                  </div>
                </form>
                
              </div>
            </div>
          )}

          {/* APPLICATIONS SECTION | FRONTENDERS PLS MODIFY*/}

          <div className="bg-[#EBF1F0] rounded-3xl p-6 w-3/5 mt-2.5 mb-8">
            <div className="w-full flex items-center justify-center min-h-full p-2">
              <div className="container max-w-6xl">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">Applications</h2>
                        <p className="text-gray-500 mt-1">View and manage your applications here.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Application Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((application, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full object-cover" src={google} alt="" /> { /* TO BE CHANGED */ }
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
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#EFE9D5] text-yellow-800">
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

          
          {/* KUNG ITUTULOY ANG RESUME */}

          {/* <div className="pb-14">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-6xl font-bold mb-10">Resume</h2>

              <div className="bg-[#EBF1F0] rounded-lg p-8 shadow-lg">
                <p className="text-xl mb-6">Upload a resume for easy applying and access</p>

                <button className="bg-[#497D74] text-white px-6 py-3 rounded-full hover:opacity-90 transition-all">
                  Add Resume
                </button>
              </div>
            </div>
          </div> */}

        </div>
      )}
      <Footer></Footer>
    </div>
  )
}

export default UserProfile