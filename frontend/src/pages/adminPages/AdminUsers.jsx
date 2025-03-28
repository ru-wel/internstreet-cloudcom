import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', password: '', password2: '',});
  const [errors, setErrors] = useState({});

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({ admin_role: '', });

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(import.meta.env.VITE_API_URL + `/users`);
        if (!result.ok) {
          throw new Error('Failed to fetch users');
        }
        const fetchedUsers = await result.json();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message || 'Failed to fetch users.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // SEARCH FUNCTION
  useEffect(() => {
    const results = users.filter(user => {
      return (
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.user_role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // PAGINATION
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ADD ADMIN
  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value, });
  }

  const validateData = () => {
     const error = {};

    if (!userData.password || userData.password.length < 8 || !/[A-Z]/.test(userData.password)) {
      error.password = 'Password must be at least 8 characters and include an uppercase letter.';
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateData()){
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/users/add', userData);
        const newUser = response.data.newUser; 
        setFilteredUsers([...filteredUsers, newUser]);
        setAddModalOpen(false);
        setUserData({ name: '', email: '', password: '', password2: '', });
      } catch (error) {
        console.error('Error adding admin user:', error);
        alert(error.response.data.message || 'Failed to add admin user.');
        setUserData({ name: '', email: '', password: '', password2: '', });
        setAddModalOpen(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Error with input validation:", error);
      setIsLoading(false);
    }
  }

  const match = userData.password === userData.password2;

  // EDIT USER ROLE
  const handleEdit = (user) => {
    setEditUser(user);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(import.meta.env.VITE_API_URL + `/users/role/${editUser.id}`, editUser);
      alert('User details updated succesfully!');
      setEditModalOpen(false);
      setFilteredUsers(prevUsers => prevUsers.map(user => user.id === editUser.id ? { ...user, ...editUser } : user)
      );
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.response.data.message || 'Failed to update user details.');
    } finally {
      setIsLoading(false);
    }
  }

  // DELETE USER
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin - Users | InternStreet</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <button className="px-4 py-2 bg-[#1F3531] text-white font-medium rounded-md hover:bg-[#1F3531]/90 focus:outline-none focus:ring-2 focus:ring-[#1F3531] focus:ring-offset-2 transition-colors" onClick={() => handleAdd()}>
            + Add Admin
          </button>
        </div>

        {/* ADD ADMIN MODAL */}
        {addModalOpen && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add Admin</h2>

              <form onSubmit={handleSubmit} className='flex flex-col px-2'>

                <label htmlFor="name" className='text-left text-white text-md font-medium mb-1'>Name
                  <input type="text" name="name"  value={userData.name} onChange={handleChange} required placeholder='Name' className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
                </label>

                <label htmlFor="email" className='text-left text-white text-md font-medium mb-1'>Email
                  <input type="email" name="email"  value={userData.email} onChange={handleChange} required placeholder='Email' className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
                </label>

                <label htmlFor="password" className='text-left text-white font-medium'>Password
                  <input type="password" name="password" value={userData.password} onChange={handleChange} required placeholder='Password' className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
                </label>

                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                <label htmlFor="password2" className='text-left text-white font-medium'>Repeat Password
                  <input type="password" name="password2" value={userData.password2} onChange={handleChange} required placeholder='Repeat Password' className='w-full mt-2 p-3 mb-4 border rounded-3xl text-center bg-white placeholder-gray-500 text-black' />
                </label>

                {!match && userData.password2 && (
                  <p className='text-red-500 text-md font-bold'>Passwords do not match!</p>
                )} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}

                {match && userData.password2 && (
                  <p className='text-green-500 text-md font-bold'>Passwords match!</p>
                )} {/* LILITAW LANG PAG MAY ERROR | STYLE NIYO NALANG ACCORDINGLY */}

                <div className="flex justify-end gap-4 mt-6">

                  <button type='button' disabled={isLoading}  className="bg-gray-300 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-transform hover:scale-105 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500" onClick={() => setAddModalOpen(false)}>
                    Cancel
                  </button>

                  <button type='submit' disabled = {isLoading} className={`py-3 px-6 rounded-2xl font-medium transition-transform hover:scale-105 focus:ring-2 focus:ring-[#1F3531]/50 ${isLoading ? "bg-[#1F3531]/50 text-white cursor-not-allowed" : "bg-[#1F3531] text-white hover:bg-[#1F3531]/90"}`}>
                    {isLoading ? 'Adding Admin...' : 'Add Admin'}
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        )}  

        {/* EDIT USER ROLE MODAL */}
        {editModalOpen && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add Admin</h2>

              <form onSubmit={handleEditSubmit} className='flex flex-col px-2'>

                <select value={editUser.user_role} onChange={(e) => setEditUser({ ...editUser, user_role: e.target.value })} required >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                <div className="flex justify-end gap-4 mt-6">
                  <button type='button' disabled={isLoading}  className="bg-gray-300 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-transform hover:scale-105 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500" onClick={() => {
                    setEditModalOpen(false); 
                    setUserData({ name: '', email: '', password: '', password2: '', })}}>
                    Cancel
                  </button>
                  <button type='submit' disabled = {isLoading} className={`py-3 px-6 rounded-2xl font-medium transition-transform hover:scale-105 focus:ring-2 focus:ring-[#1F3531]/50 ${isLoading ? "bg-[#1F3531]/50 text-white cursor-not-allowed" : "bg-[#1F3531] text-white hover:bg-[#1F3531]/90"}`}>
                    {isLoading ? 'Editing User...' : 'Edit User'}
                  </button>
                </div>

              </form>
              
            </div>
          </div>
        )} 

        {/* SEARCH BAR */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md text-sm" value={searchTerm} onChange={handleSearch}/>
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F3531] mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading users...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-500 font-medium">
                                {user.name?.charAt(0)?.toUpperCase() || '?'}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.user_role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.user_role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.created_at ? new Date(user.created_at).toLocaleString() : "Loading..."}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "NULL"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => handleEdit(user)}>Edit</button>
                          <button className="text-red-600 hover:text-red-900" onClick={() => deleteUser(user.id)} disabled={isLoading}>
                            {isLoading ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        {searchTerm ? 'No users match your search' : 'No users found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {filteredUsers.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${ currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#1F3531]/10' }`}>
                    Previous
                  </button>
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${ currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#1F3531]/10' }`}>
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                      <span className="font-medium">
                        {indexOfLastUser > filteredUsers.length ? filteredUsers.length : indexOfLastUser}
                      </span>{' '}
                      of <span className="font-medium">{filteredUsers.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button onClick={() => paginate(currentPage - 1)}disabled={currentPage === 1} className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${ currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-[#1F3531]/10' }`} >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                        
                      {/* PAGINATION PAGE NUMBERS */}
                      {[...Array(totalPages).keys()].map(number => (
                        <button key={number + 1} onClick={() => paginate(number + 1)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${ currentPage === number + 1 ? 'z-10 bg-[#1F3531]/20 border-[#1F3531] text-blue-gray-900' : 'bg-white border-gray-300 text-gray-500 hover:bg-[#1F3531]/10' }`} >
                          {number + 1}
                        </button>
                      ))}
                      
                      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${ currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-[#1F3531]/10' }`} >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;