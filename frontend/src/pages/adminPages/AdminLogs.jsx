import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet';

function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  // FETCH ALL LOGS
  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(import.meta.env.VITE_API_URL + `/logs`);
        const fetchedLogs = await result.json();
        setLogs(fetchedLogs);
        setFilteredLogs(fetchedLogs);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError(err.response?.data?.message || "Failed to fetch logs.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // SEARCH FUNCTION
  useEffect(() => {
    const results = logs.filter(log => {
      return (
        log.executed_at && new Date(log.executed_at).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.os_version?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.browser_type?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredLogs(results);
    setCurrentPage(1);
  }, [searchTerm, logs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // PAGINATION
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // DELETE LOG
  const deleteLog = async (log) => {
    if (!log.id) {
      console.error("Log ID is missing:", log);
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this log?");
    if (!confirmDelete) return;
    setIsLoading(true);

    try {
      const response = await axios.delete(import.meta.env.VITE_API_URL + `/logs/${log.id}`);

      if (response.status === 200 || response.status === 204) {
        setLogs((prevLogs) => prevLogs.filter((l) => l.id !== log.id));
      } else {
        console.error("Failed to delete log. Response:", response);
        alert("Failed to delete log.");
      }
    } catch (error) {
      console.error("Error deleting log:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin - Logs | InternStreet</title>
      </Helmet>

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Logs Management</h1>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

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

        {/* LOGS TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F3531] mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading logs...</p>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date / Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS Version</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentLogs.length > 0 ? (
                    currentLogs.map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.executed_at ? new Date(log.executed_at).toLocaleString() : "Loading..."}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {log.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {log.action}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.ip_address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.os_version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.browser_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.location  }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-red-600 hover:text-red-900" onClick={() => deleteLog(log)} disabled={isLoading}>
                            {isLoading ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        {searchTerm ? 'No logs match your search' : 'No users found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {filteredLogs.length > 0 && (
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
                      Showing <span className="font-medium">{indexOfFirstLog + 1}</span> to{' '}
                      <span className="font-medium">
                        {indexOfLastLog > filteredLogs.length ? filteredLogs.length : indexOfLastLog}
                      </span>{' '}
                      of <span className="font-medium">{filteredLogs.length}</span> results
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

export default AdminLogs;
