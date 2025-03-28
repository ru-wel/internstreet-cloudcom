import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import google from '/images/google-logo.png';

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const initialJobData = {
    company: '', 
    location: '', 
    title: '', 
    details: {
      job_description: '',
      job_qualifications: '',
      employer_questions: '',
    },
  }
  const [jobData, setJobData] = useState(initialJobData);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editJob, setEditJob] = useState({
    company: '', 
    location: '', 
    title: '', 
    details: {
      job_description: '',
      job_qualifications: '',
      employer_questions: '',
    }
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
          const result = await fetch(import.meta.env.VITE_API_URL + `/jobs`);
          if (!result.ok) {
            throw new Error('Failed to fetch jobs');
          }
          const fetchedJobs = await result.json();
          setJobs(fetchedJobs);
          setFilteredJobs(fetchedJobs);
        } catch (err) {
          console.error('Error fetching jobs:', err);
          setError(err.response?.data?.message || 'Failed to fetch jobs.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchJobs();
  }, []);

  // SEARCH FUNCTION
  useEffect(() => {
    const results = jobs.filter(job => {
      return (
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredJobs(results);
    setCurrentPage(1);
  }, [searchTerm, jobs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // PAGINATION
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ADD JOB
  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value, });
  }

  const handleJobDetailsChange = (event) => { 
    const { name, value } = event.target;
    setJobData(prev => ({
      ...prev, details: { ...prev.details, [name]: value }
    }));
  }

  // const validateData = () => {
  //    const error = {};

  //   if (!jobData.password || jobData.password.length < 8 || !/[A-Z]/.test(jobData.password)) {
  //     error.password = 'Password must be at least 8 characters and include an uppercase letter.';
  //   }

  //   setErrors(error);
  //   return Object.keys(error).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if (validateData()){
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/jobs/add', jobData);
        const newJob = response.data.newJob; 
        setFilteredJobs([...filteredJobs, newJob]);
        setAddModalOpen(false);
        setJobData(initialJobData);
      } catch (error) {
        console.error('Error adding job posting:', error);
        alert(error.response.data.message || 'Failed to add job posting.');
        setJobData(initialJobData);
        setAddModalOpen(false);
      } finally {
        setIsLoading(false);
      }
    } 
    // else {
    //   console.log("Error with input validation:", error);
    //   setIsLoading(false);
    // }
  // }

  // EDIT JOB
  const handleEdit = (job) => {
    setEditJob(job);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditJob(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value
      }
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(import.meta.env.VITE_API_URL + `/jobs/${editJob.id}`, editJob);
      alert('Job details updated succesfully!');
      setEditModalOpen(false);
      setFilteredJobs(prevJobs => prevJobs.map(job => job.id === editJob.id ? { ...job, ...editJob } : job)
      );
    } catch (error) {
      console.error('Error updating job:', error);
      alert(error.response.data.message || 'Failed to update job details.');
    } finally {
      setIsLoading(false);
    }
  }

  // DELETE JOB
  const deleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job? Doing so will delete selected job in the applications table.");
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      setFilteredJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin - Jobs | InternStreet</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <button className="px-4 py-2 bg-[#1F3531] text-white font-medium rounded-md hover:bg-[#1F3531]/90 focus:outline-none focus:ring-2 focus:ring-[#1F3531] focus:ring-offset-2 transition-colors" onClick={() => handleAdd()}>
            + Add Job
          </button>
        </div>

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

        {/* ADD JOB MODAL */}
        {addModalOpen && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 relative">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Job</h2>

              <form onSubmit={handleSubmit} className='flex flex-col'>

                <label htmlFor="company" className='text-left text-gray-700 text-md font-semibold mb-1'>Company
                  <input type="text" name="company" value={jobData.company} onChange={handleChange} required placeholder='Company' className='w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#497D74]'
                  />
                </label>

                <label htmlFor="location" className='text-left text-gray-700 text-md font-semibold mb-1'>Location
                  <input type="text" name="location" value={jobData.location} onChange={handleChange} required placeholder='Location' className='w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#497D74]'
                  />
                </label>

                <label htmlFor="title" className='text-left text-gray-700 font-semibold'>Job Title
                  <input type="text" name="title" value={jobData.title} onChange={handleChange} required placeholder='Job Title' className='w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#497D74]' 
                  />
                </label>

                <label htmlFor="job_description" className='text-left text-gray-700 font-semibold'>Job Description
                  <textarea name="job_description" value={jobData.details.job_description} onChange={handleJobDetailsChange} required placeholder='Job Description' className="w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#497D74] h-24"
                  ></textarea>
                </label>

                <label htmlFor="job_qualifications" className='text-left text-gray-700 font-semibold'>Job Qualifications
                  <textarea name="job_qualifications" value={jobData.details.job_qualifications} onChange={handleJobDetailsChange} required placeholder='Job Qualifications' className="w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#497D74] h-24"
                  ></textarea>
                </label>

                <label htmlFor="employer_questions" className='text-left text-gray-700 font-semibold'>Employer Questions
                  <textarea name="employer_questions" value={jobData.details.employer_questions} onChange={handleJobDetailsChange} required placeholder='Employer Questions' className="w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#497D74] h-24"
                  ></textarea>
                </label>

                <div className="flex justify-end gap-4 mt-6">

                  <button type='button' disabled={isLoading}  className="bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium transition-transform hover:scale-105 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500" onClick={() => { setAddModalOpen(false); setJobData(initialJobData); }}>
                    Cancel
                  </button>

                  <button type='submit' disabled = {isLoading} className={`py-3 px-6 rounded-xl font-medium transition-transform hover:scale-105 focus:ring-2 focus:ring-[#1F3531]/50 ${ isLoading ? "bg-[#497D74]/50 text-white cursor-not-allowed" : "bg-[#1F3531] text-white hover:bg-[#1F3531]/90" }`} >
                    {isLoading ? 'Adding Job...' : 'Add Job'}
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

                {/* <select value={editJob.user_role} onChange={(e) => setEditJob({ ...editJob, user_role: e.target.value })} required >
                  <option value="admin">Admin</option>
                  <option value="job">User</option>
                </select> */}

                <label htmlFor="company" className='text-left text-gray-700 text-md font-semibold mb-1'>Company
                  <input type="text" name="company" value={editJob.company} onChange={handleEditChange} required placeholder='Company' className='w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#497D74]'
                  />
                </label>

                <label htmlFor="location" className='text-left text-gray-700 text-md font-semibold mb-1'>Location
                  <input type="text" name="location" value={editJob.location} onChange={handleEditChange} required placeholder='Location' className='w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#497D74]'
                  />
                </label>

                <label htmlFor="title" className='text-left text-gray-700 font-semibold'>Job Title
                  <input type="text" name="title" value={editJob.title} onChange={handleEditChange} required placeholder='Job Title' className='w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#497D74]' 
                  />
                </label>

                <label htmlFor="job_description" className='text-left text-gray-700 font-semibold'>Job Description
                  <textarea name="job_description" value={editJob.details.job_description} onChange={handleEditDetailsChange} required placeholder='Job Description' className="w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#497D74] h-24"
                  ></textarea>
                </label>

                <label htmlFor="job_qualifications" className='text-left text-gray-700 font-semibold'>Job Qualifications
                  <textarea name="job_qualifications" value={editJob.details.job_qualifications} onChange={handleEditDetailsChange} required placeholder='Job Qualifications' className="w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#497D74] h-24"
                  ></textarea>
                </label>

                <label htmlFor="employer_questions" className='text-left text-gray-700 font-semibold'>Employer Questions
                  <textarea name="employer_questions" value={editJob.details.employer_questions} onChange={handleEditDetailsChange} required placeholder='Employer Questions' className="w-full mt-2 p-3 mb-4 border rounded-xl text-black bg-gray-50 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#497D74] h-24"
                  ></textarea>
                </label>

                <div className="flex justify-end gap-4 mt-6">
                  <button type='button' disabled={isLoading}  className="bg-gray-300 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-transform hover:scale-105 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500" onClick={() => {
                    setEditModalOpen(false); 
                    setJobData(initialJobData)}}>
                    Cancel
                  </button>
                  <button type='submit' disabled = {isLoading} className={`py-3 px-6 rounded-2xl font-medium transition-transform hover:scale-105 focus:ring-2 focus:ring-[#1F3531]/50 ${isLoading ? "bg-[#1F3531]/50 text-white cursor-not-allowed" : "bg-[#1F3531] text-white hover:bg-[#1F3531]/90"}`}>
                    {isLoading ? 'Editing Job...' : 'Edit Job'}
                  </button>
                </div>

              </form>
              
            </div>
          </div>
        )} 

        {/* JOBS TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F3531] mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading jobs...</p>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentJobs.length > 0 ? (
                    currentJobs.map((job, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            <img src={job.logo} className="h-full w-full object-cover" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{job.company}</div>
                            <div className="text-sm text-gray-500">{job.location}</div>
                          </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{job.title}</td>
                        <td className="px-6 py-4 max-w-[400px] break-words" style={{ whiteSpace: 'pre-line' }}>
                          {job.details.job_description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.created_at ? new Date(job.created_at).toLocaleString() : "Loading..."}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.updatedAt ? new Date(job.updatedAt).toLocaleString() : "NULL"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => handleEdit(job)}>Edit</button>
                          <button className="text-red-600 hover:text-red-900" onClick={() => deleteJob(job.id)} disabled={isLoading}>
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
            {filteredJobs.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${ currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50' }`}>
                    Previous
                  </button>
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${ currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50' }`}>
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstJob + 1}</span> to{' '}
                      <span className="font-medium">
                        {indexOfLastJob > filteredJobs.length ? filteredJobs.length : indexOfLastJob}
                      </span>{' '}
                      of <span className="font-medium">{filteredJobs.length}</span> results
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

export default AdminJobs;