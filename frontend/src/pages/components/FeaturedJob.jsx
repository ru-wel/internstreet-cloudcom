import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeaturedJob = () => {
    const navigate = useNavigate();
    const [fetchedJobs, setFetchJobs] = useState([]);
    const [applyData, setApplyData] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const result = await fetch(import.meta.env.VITE_API_URL + `/jobs`);
            if (!result.ok) {
              throw new Error('Failed to fetch data');
            }
            const jobs = await result.json();
            const slicedJobs = jobs.slice(0, 4);
      
            setFetchJobs(slicedJobs);
      
            const jobApplications = await Promise.all(
              slicedJobs.map(async (job) => {
                const application = await axios.get(
                  import.meta.env.VITE_API_URL + `/apply-job/${job.company}/${job.title}`
                );
                return { ...job, applicationData: application.data };
              })
            );
      
            setApplyData(jobApplications);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchJobs();
    }, []);
      
    const handleApply = (job) =>{
        navigate('/apply', { state: { title: job.title, desc: job.description, name: job.company, location: job.location, logo: job.logo, id: job.id }})
    }
    return(
        <div className="bg-gradient-to-r from-[#90d4cc] to-[#a1ded7]to-70%  rounded-[50px] mt-8 mb-2 mx-4 sm:mx-6 md:mx-8 py-8 border shadow-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center pt-6 text-black">Featured Jobs</h1>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto p-5">
                {fetchedJobs.map((job, jobIndex) => (
        <div key={jobIndex} className="bg-[#f5f0e1] p-4 sm:p-6 md:p-8 border-2 rounded-3xl shadow-xl transform transition-all">
         <div className="flex items-center">
                            <span className="w-12 h-12 flex-shrink-0">
                                <img src={job.logo} alt={job.company} className="w-full" />
                            </span>
                            <div className="ml-3">
                                <h3 className="text-md font-bold text-gray-800">{job.company}</h3>
                                <p className="text-sm text-gray-800">{job.location}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg sm:text-xl text-left">{job.title}</h2>
                            <button className="bg-[#497D74] rounded-2xl px-3 text-sm text-white mt-2">Intern</button>
                        </div>

                        <div className="flex pt-5">
                            <div className="flex justify-end mr-2">
                                {[32, 31, 33].map((id) => (
                                    <img key={id} className="border-2 border-white dark:border-gray-800 rounded-full h-5 w-5 -mr-2"
                                        src={`https://randomuser.me/api/portraits/men/${id}.jpg`} alt="" />
                                ))}
                                <p className="pl-3 text-sm">+15 Applicants</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 pt-4 w-full sm:w-auto">
                            <button onClick={() => handleApply(job)} className={`bg-[#497D74] rounded-3xl px-4 sm:px-7 py-2 text-sm sm:text-md text-white transition transform ${applyData[jobIndex]?.applicationData ? "" : "hover:scale-105 cursor-pointer"} border-[#2b4843] border-b-4 border-r-4`} disabled={applyData[jobIndex]?.applicationData}>
                            {applyData[jobIndex]?.applicationData ? "Applied" : "Apply"}
                            </button>
                            <a href={`/job/${job.id}`} className="bg-[#2d4e6c] rounded-3xl px-4 sm:px-6 py-2 text-sm sm:text-md text-white transition transform hover:scale-105 border-[#1d3346] border-b-4 border-r-4">
                                View Details
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedJob;
