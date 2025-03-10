import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import Nav from '../components/Nav'
import Footer from '../components/Footer';
import google from '/images/google-logo.png';

function JobListing() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFiltered] = useState([]);
    const [jTitle, setJTitle] = useState("");
    const [jLocation, setJLocation] = useState("");
    const [error, setErrors] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const result = await fetch(`http://localhost:3000/jobs`);
                const fetchedJobs = await result.json();
                setJobs(fetchedJobs);
                filteredJobs.includes() ? null : (setFiltered(fetchedJobs));
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
                job.title.toLowerCase().includes(jTitle.toLowerCase()) && job.location.toLowerCase().includes(jLocation.toLowerCase())
        );
        setJobs(result);
    }
    
    if (error){
        console.log('Error handling search: ', error);
    }

    return (
        <div>
            <Helmet>
              <title>Search Jobs | InternStreet</title>
            </Helmet>
            <Nav></Nav>
            <div className="">
                <hr className="border-t-4 mx-10 border-gray-500 my-4" />

                <div className="bg-[#ADC4C0] shadow-md rounded-3xl">
                    <div className="bg-[#497D74] text-white text-center py-4 rounded-2xl shadow-md shadow-[#909090]">
                        <h1 className="lg:text-6xl text-4xl font-bold py-2 text-black">Find Jobs</h1>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="flex w-full md:w-2/3 gap-2 items-center md:my-10 my-4 flex-col md:flex-row">
                    
                            <div className="flex w-full items-center border bg-white border-gray-300 rounded-3xl p-2 mb-4 md:mb-0">
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

                            <button onClick={handleSearch} className="bg-[#1D3346] text-white px-6 py-4 rounded-3xl hover:opacity-90 hover:scale-105 text-center whitespace-nowrap">
                                Find Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className = "bg-[#d5e1df] rounded-3xl lg:p-10 md:p-5">
              <div className="lg:grid lg:grid-cols-3 gap-4 max-w-6xl lg:mx-auto md:mx-10 mx-10 m-5 p-5">

              {/* INDIV CARDS */}
              {jobs.map((job, index) => ( 
                <div key={index} className="my-2 lg:m-0 md:mx-25">
                    <div className="bg-[#EFE9D5] p-6 rounded-3xl border">
                        <div className="flex items-center">
                            <span className="text-xl">
                                <img src = {google} />
                            </span>
                            <div className="">
                                <h3 className=" ml-3 text-md font-bold text-gray-800 ">{job.company}</h3>
                                <p className=" ml-3 text-sm text-gray-800 ">{job.location}</p>
                            </div>
                        </div>

                        <div className="mt-9">
                            <h2 className = "text-xl text-left">{job.title}</h2>
                            <div className="">
                                <button className="bg-[#497D74] rounded-2xl px-3 text-sm text-white">Intern</button>
                            </div>
                            
                        </div>

                        <div className="flex pt-7 ">
                            <div className="flex justify-end mr-2">
                                <img className="border-2 border-white dark:border-gray-800 rounded-full h-5 w-5 -mr-2"
                                    src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                                <img className="border-2 border-white dark:border-gray-800 rounded-full h-5 w-5 -mr-2"
                                    src="https://randomuser.me/api/portraits/women/31.jpg" alt=""/>
                                <img className="border-2 border-white dark:border-gray-800 rounded-full h-5 w-5 -mr-2"
                                    src="https://randomuser.me/api/portraits/men/33.jpg" alt=""/>
                                
                                
                                <p className="pl-3 text-sm">+15 Applicants</p>
                                <p></p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-10 pt-8">
                            <button className="bg-[#497D74] lg:rounded-4xl rounded-2xl lg:px-7 px-5 p-1 text-md text-white transition transform hover:scale-105">Apply</button>
                            <button className="bg-[#27445D] lg:rounded-3xl rounded-2xl lg:px-7 px-4 p-1 text-md text-white transition transform hover:scale-105 border-[#1d3346] border-b-4 border-r-5"><a href={`/job/${job.id}`}>View Details</a></button>
                        </div>
                    </div> 
                </div>
                
              ))}
              </div>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default JobListing