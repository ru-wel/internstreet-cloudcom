import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(7);

  const [errors, setErrors] = useState({});

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editApplication, setEditApplication] = useState({ status: '', });


  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(import.meta.env.VITE_API_URL + `/apply-job/all`);
        if (!result.ok) {
          throw new Error('Failed to fetch applications');
        }
        const fetchedApplications = await result.json();
        setApplications(fetchedApplications);
        setFilteredApplications(fetchedApplications);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setErrors(err.response?.data?.message || 'Failed to fetch jobs.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // SEARCH FUNCTION
  useEffect(() => {
    const results = applications.filter(application => {
      return (
        application.id?.includes(searchTerm.toLowerCase()) ||
        application.applied_at && new Date(application.applied_at).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.c_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.c_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.c_position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredApplications(results);
    setCurrentPage(1);
  }, [searchTerm, applications]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // PAGINATION
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // EDIT app ROLE
  const handleEdit = (app) => {
    setEditApplication(app);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(import.meta.env.VITE_API_URL + `/apply-job/${editApplication.id}`, editApplication);
      alert('Application status updated succesfully!');
      setEditModalOpen(false);
      setFilteredApplications(prevApplications => prevApplications.map(app => app.id === editApplication.id ? { ...app, ...editApplication } : app)
      );
    } catch (error) {
      console.error('Error updating application:', error);
      alert(error.response.data.message || 'Failed to update application status.');
    } finally {
      setIsLoading(false);
    }
  }

  // DELETE app
  const deleteApplication = async (appId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/apply-job/${appId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete application");
      }
      setFilteredApplications(prevApplications => prevApplications.filter(app => app.id !== appId));
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin - Applications | InternStreet</title>
      </Helmet>

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
        </div>

        {/* EDIT APPLICATION STATUS MODAL */}
        {editModalOpen && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add Admin</h2>

              <form onSubmit={handleEditSubmit} className='flex flex-col px-2'>

                <select value={editApplication.status} onChange={(e) => setEditApplication({ ...editApplication, status: e.target.value })} required >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                </select>

                <div className="flex justify-end gap-4 mt-6">
                  <button type='button' disabled={isLoading}  className="bg-gray-300 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-transform hover:scale-105 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500" onClick={() => {
                    setEditModalOpen(false); 
                    setEditApplication({ status: '', })}}>
                    Cancel
                  </button>
                  <button type='submit' disabled = {isLoading} className={`py-3 px-6 rounded-2xl font-medium transition-transform hover:scale-105 focus:ring-2 focus:ring-[#1F3531]/50 ${isLoading ? "bg-[#1F3531]/50 text-white cursor-not-allowed" : "bg-[#1F3531] text-white hover:bg-[#1F3531]/90"}`}>
                    {isLoading ? 'Editing Application...' : 'Edit Application'}
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

        {/* APPLICATIONS TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F3531] mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading applications...</p>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover Letter</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentApplications.length > 0 ? (
                    currentApplications.map((app, index) => (
                      <tr key={index} className="hover:bg-gray-50">

                        <td className="px-1 py-4 w-12 text-sm font-medium text-gray-900 text-center">{app.id}</td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.applied_at ? new Date(app.applied_at).toLocaleString() : "Loading..."}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{app.email}</td> 

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{app.c_name}</div>
                            <div className="text-sm text-gray-500">{app.c_location}</div>
                          </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.c_position}</td> 

                        <td className="px-2 py-4 max-w-[150px] truncate text-sm">
                          <a href={import.meta.env.VITE_API_URL + "/utils/download/"+app.id+"/"+app.resume} download className='text-purple-600 underline hover:text-purple-800'>
                            {app.resume}
                          </a>
                        </td>

                        <td className="px-2 py-4 max-w-[150px] truncate text-sm">
                          <a href={import.meta.env.VITE_API_URL + "/utils/download/"+app.id+"/"+app.cover_letter} download className='text-purple-600 underline hover:text-purple-800'>
                            {app.cover_letter}
                          </a>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.updatedAt ? new Date(app.updatedAt).toLocaleString() : "NULL"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : app.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : app.status === 'denied'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => handleEdit(app)}>Edit</button>
                          <button className="text-red-600 hover:text-red-900" onClick={() => deleteApplication(app.id)} disabled={isLoading}>
                            {isLoading ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        {searchTerm ? 'No applications match your search' : 'No applications found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {filteredApplications.length > 0 && (
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
                      Showing <span className="font-medium">{indexOfFirstApplication + 1}</span> to{' '}
                      <span className="font-medium">
                        {indexOfLastApplication > filteredApplications.length ? filteredApplications.length : indexOfLastApplication}
                      </span>{' '}
                      of <span className="font-medium">{filteredApplications.length}</span> results
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
  )
}

export default AdminApplications