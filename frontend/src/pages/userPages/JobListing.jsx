import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import Nav from '../components/Nav'
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function JobListing() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFiltered] = useState([]);
    const [jTitle, setJTitle] = useState("");
    const [jLocation, setJLocation] = useState("");
    const [error, setErrors] = useState("");
    const [applyData, setApplyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
          setLoading(true);
            try {
                const result = await fetch(import.meta.env.VITE_API_URL + `/jobs`);
                const fetchedJobs = await result.json();
                setJobs(fetchedJobs);
                filteredJobs.includes() ? null : (setFiltered(fetchedJobs));

                const jobApplications = await Promise.all(
                    fetchedJobs.map(async (job) => {
                      const application = await axios.get(
                        import.meta.env.VITE_API_URL + `/apply-job/${job.company}/${job.title}`
                      );
                      return { ...job, applicationData: application.data };
                    })
                );
                setApplyData(jobApplications);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setErrors(err.message || 'Failed to fetch jobs.');
            } finally {
            }
        };
        if (jTitle == "" && jLocation == ""){
            fetchJobs();
        }
        
    },[jTitle, jLocation]);

    const handleSearch = async () => {
        const result = filteredJobs.filter(
            (job) =>
                job.title.toLowerCase().includes(jTitle.toLowerCase()) || job.company.toLowerCase().includes(jTitle.toLowerCase()) && job.location.toLowerCase().includes(jLocation.toLowerCase())
        );
        setJobs(result);
        const jobApplications = await Promise.all(
            result.map(async (job) => {
              const application = await axios.get(
                import.meta.env.VITE_API_URL + `/apply-job/${job.company}/${job.title}`
              );
              return { ...job, applicationData: application.data };
            })
        );
    
        setApplyData(jobApplications);
    }
    const handleApply = (job) =>{
        navigate('/apply', { state: { title: job.title, desc: job.description, name: job.company, location: job.location, logo: job.logo, id: job.id }})
    }
    if (error){
        console.log('Error handling search: ', error);
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#ace4dc] via-[#d2eae6] to-[#5b9f92] shadow-xl">
            <Helmet>
              <title>Search Jobs | InternStreet</title>
            </Helmet>
            <Nav></Nav>
            <div className="">

                    <div className=" text-black-100 text-center py-12 ">
                        <h1 className="lg:text-6xl text-4xl font-bold py-2 tracking-wide">Find Jobs</h1>
                

                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="flex w-full md:w-2/3 gap-2 items-center md:my-10 my-4 flex-col md:flex-row">
                    
                            <div className="flex w-full items-center border bg-white border-black rounded-3xl p-2 mb-4 md:mb-0">
                                <div className="flex items-center w-1/2">
                                    <FaSearch className="text-gray-700 ms-3 text-xl" />
                                    <input
                                        type="text"
                                        placeholder="Job Title"
                                        value={jTitle}
                                        onChange={(e) => setJTitle(e.target.value)}
                                        className="w-full p-2 focus:outline-none text-center placeholder:text-center"
                                    />
                                </div>
                                <div className="border-l border-gray-600 h-6 mx-2"></div>
                                <div className="flex items-center w-1/2">
                                    <FaMapMarkerAlt className="text-gray-700 ms-3 text-xl" />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={jLocation}
                                        onChange={(e) => setJLocation(e.target.value)}
                                        className="w-full p-2 focus:outline-none text-center placeholder:text-center"
                                    />
                                </div>
                            </div>

                            <button onClick={handleSearch} className="bg-[#2d4e6c] border-[#1d3346] border-b-4 border-r-4  text-white px-8 py-3 rounded-3xl hover:opacity-90 hover:scale-105 text-center whitespace-nowrap cursor-pointer">
                                Find Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6 mx-4 p-6 text-center">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#1F3531] border-solid"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto p-5 text-left">
                  {jobs.map((job, index) => (
                    <div key={index} className="my-2">
                      <div className="bg-[#f5f0e1] p-6 rounded-3xl border-2 shadow-lg">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            <img src={job.logo} className="h-full w-full object-cover" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-md font-bold text-gray-800">{job.company}</h3>
                            <p className="text-sm text-gray-800">{job.location}</p>
                          </div>
                        </div>

                        <div className="mt-5">
                        <h2 className="text-lg sm:text-xl text-left">{job.title}</h2>
                        <button className="bg-[#497D74] rounded-2xl px-3 text-sm text-white mt-2">Intern</button>
                          
                        </div>

                        <div className="flex items-center pt-5 space-x-2 text-left">
                          <img className="border-2 border-white rounded-full h-5 w-5" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                          <img className="border-2 border-white rounded-full h-5 w-5" src="https://randomuser.me/api/portraits/women/31.jpg" alt="" />
                          <img className="border-2 border-white rounded-full h-5 w-5" src="https://randomuser.me/api/portraits/men/33.jpg" alt="" />
                          <p className="text-sm">+15 Applicants</p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                          <button
                            onClick={() => handleApply(job)}
                            className={`bg-[#497D74] rounded-full px-4 py-2 text-white transition transform border-[#224b45] border-r-4 border-b-4 ${
                              applyData[index]?.applicationData ? "" : "hover:scale-105 cursor-pointer"
                            }`}
                            disabled={applyData[index]?.applicationData}
                          >
                            {applyData[index]?.applicationData ? "Applied" : "Apply"}
                          </button>
                          <button className="bg-[#27445D] rounded-full px-4 py-2 text-white transition transform hover:scale-105 border-[#1d3346] border-r-4 border-b-4">
                            <a href={`/job/${job.id}`}>View Details</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
</div>

<Footer />

        </div>
    );
}

export default JobListing