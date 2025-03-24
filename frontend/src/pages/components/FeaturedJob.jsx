import React from "react";
import figma from '/images/figma-logo.png';
import google from '/images/google-logo.png';
import microsoft from '/images/microsoft-logo.png';

function FeaturedJob(){
    return(
        <div className="bg-gradient-to-r from-[#8ecfc2] to-[#c6eee7] to-90% rounded-[50px] mt-8 mb-2 mx-4 sm:mx-6 md:mx-8 py-8 border shadow-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center pt-6 text-black">Featured Jobs</h1>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto p-5">
                {[ 
                    { company: "Google", logo: google, position: "Full Stack Developer" },
                    { company: "Microsoft", logo: microsoft, position: "Back-end Developer" },
                    { company: "Microsoft", logo: microsoft, position: "Back-end Developer" },
                    { company: "Figma", logo: figma, position: "Back-end Developer" }
                ].map((job, index) => (
        <div key={index} className="bg-[#EFE9D5] p-4 sm:p-6 md:p-8 border-2 rounded-3xl shadow-xl transform transition-all">
         <div className="flex items-center">
                            <span className="w-12 h-12 flex-shrink-0">
                                <img src={job.logo} alt={job.company} className="w-full" />
                            </span>
                            <div className="ml-3">
                                <h3 className="text-md font-bold text-gray-800">{job.company}</h3>
                                <p className="text-sm text-gray-800">Angeles City</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg sm:text-xl text-left">{job.position}</h2>
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
                            <button className="bg-[#497D74] rounded-3xl px-4 sm:px-7 py-2 text-sm sm:text-md text-white transition transform hover:scale-105 border-[#2b4843] border-b-5 border-r-5">
                                Apply
                            </button>
                            <button className="bg-[#2d4e6c] rounded-3xl px-4 sm:px-6 py-2 text-sm sm:text-md text-white transition transform hover:scale-105 border-[#1d3346] border-b-5 border-r-5">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedJob;
