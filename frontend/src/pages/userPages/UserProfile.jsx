import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { FaLinkedin, FaGithub, FaEnvelope, FaBookmark } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import person from '/images/person-placeholder.png';
import Footer from '../components/Footer';

function UserProfile() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState({ name: '', }); // ADD MORE FIELDS LATUR
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [id, setId] = useState(null);

  // const toggleModal = () => {
  //   setModalOpen(!isModalOpen);
  // }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setId(decoded.id);
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
        const response = await axios.put(`http://localhost:3000/users/profile/${id}`, editUser);
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
        if (!id) return;
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const result = await response.json();
        setUser(result);
      } catch (err) {
        console.error('Error fetching user', err);
        setError(err.message || 'Failed to fetch user.');
      } finally { 
        setLoading(false); 
      }
    }
    fetchUser();
  }, [id]);

  return (
    <div>
      <Nav></Nav>

      {/* MAS MADAGUL RIGHT CONTAINER */}

      {loading ? (
      <div className='flex justify-center align-middle h-screen w-screen'>Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (

        <div className='bg-[#ADC4C0] rounded-t-3xl flex justify-center'>
          <div className="flex flex-col md:flex-row lg:px-20 px-10 pt-26 pb-20 w-4/5">
            <div className="bg-[#497D74] rounded-3xl p-6 md:w-1/3 relative">
              <div className="w-32 h-32 rounded-full border-4 border-gray-400 bg-cover bg-center absolute top-[-60px] left-1/2 transform -translate-x-1/2">
                <img src={person} alt="Profile" className="w-full h-full rounded-full" />
              </div>

              <div className="mt-20 text-white text-center">
                <h1 className="text-5xl font-bold">{user.name}</h1>
                <p className="text-xl my-4 text-[#EFE9D5]">Angeles City, Philippines | TO BE DISCUSSED</p>
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
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> 0912 345 6789 | TO BE DISCUSSED</p>
              <p><strong>Bio:</strong> I am Levina. A Full-Stack Web Developer. I break down complex user experience problems to create integrity focussed solutions that connect billions of people. | TO BE DISCUSSED</p>
            </div>
          </div>

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