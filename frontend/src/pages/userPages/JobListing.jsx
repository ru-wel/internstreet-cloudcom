import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import Nav from '../components/Nav'
import Footer from '../components/Footer';

function JobListing() {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const result = await fetch(`http://localhost:3000/jobs`);
                const fetchedJobs = await result.json();
                setJobs(fetchedJobs);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setErrors(err.response?.data?.message || 'Failed to fetch jobs.');
            } finally {
            }
        };
        fetchJobs();
    }, []);
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
                            {/* Search Bar Container */}
                            <div className="flex w-full items-center border bg-white border-gray-300 rounded-3xl p-2 mb-4 md:mb-0">
                                <div className="flex items-center w-1/2">
                                    <FaSearch className="text-gray-700 ms-3 text-xl" />
                                    <input
                                        type="text"
                                        placeholder="Job Title"
                                        className="w-full p-2 focus:outline-none text-center placeholder:text-center"
                                    />
                                </div>
                                <div className="border-l border-gray-600 h-6 mx-2"></div>
                                <div className="flex items-center w-1/2">
                                    <FaMapMarkerAlt className="text-gray-700 ms-3 text-xl" />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        className="w-full p-2 focus:outline-none text-center placeholder:text-center"
                                    />
                                </div>
                            </div>

                            {/* Find Jobs Button */}
                            <button className="bg-[#1D3346] text-white px-6 py-4 rounded-3xl hover:opacity-90 hover:scale-105 text-center whitespace-nowrap">
                                Find Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {jobs.map((job, index) => (
                <div key={index} className='p-20'>
                    <h2 className='font-bold'>Job Title: {job.title}</h2>
                    <p>Job Description: {job.description}</p>
                    <p>Company: {job.company}</p>
                    <p>Location: {job.location}</p>
                </div>
            ))}

            <h2></h2>
            <Footer></Footer>
        </div>
    );
}

export default JobListing