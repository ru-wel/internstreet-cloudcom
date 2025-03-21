import React from "react";
import figma from '/images/figma-logo.png';
import google from '/images/google-logo.png';
import microsoft from '/images/microsoft-logo.png';


function FeaturedJob(){
    return(
      <div className = "bg-[#7bafa6] lg:p-10 md:p-5 border"> 

            <h1 className="text-6xl font-bold text-center lg:pt-4 md:pt-6 pt-15 text-black">Featured Jobs</h1>
    
            <div className="lg:grid lg:grid-cols-2 gap-10 max-w-6xl lg:mx-auto md:mx-10 mx-10 m-5 p-5">
                
                <div className="my-2 lg:m-0 md:mx-25">
                <div className="bg-[#EFE9D5] p-8 border-2 rounded-3xl shadow-xl transform transition-all hover:scale-103">
                        <div className="flex items-center">
                            <span className="text-xl">
                                <img src = {google} />
                            </span>
                            <div className="">
                                <h3 className=" ml-3 text-md font-bold text-gray-800 ">Google</h3>
                                <p className=" ml-3 text-sm text-gray-800 ">Angeles City</p>
                            </div>
                        </div>

                        <div className="mt-9">
                            <h2 className = "text-xl text-left">Full Stack Developer</h2>
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
                            <button className="bg-[#27445D] lg:rounded-3xl rounded-2xl lg:px-7 px-4 p-1 text-md text-white transition transform hover:scale-105 border-[#1d3346] border-b-4 border-r-5">View Details</button>
                        </div>
                    </div> 
                </div>

                
                <div className="my-2 lg:m-0 md:mx-25">
                <div className="bg-[#EFE9D5] p-8 border-2 rounded-3xl shadow-xl transform transition-all hover:scale-103">
                <div className="flex items-center">
                            <span className="text-xl">
                                <img src = {microsoft} />
                            </span>
                            <div className="">
                                <h3 className=" ml-3 text-md font-bold text-gray-800 ">Microsoft</h3>
                                <p className=" ml-3 text-sm text-gray-800 ">Angeles City</p>
                            </div>
                        </div>

                        <div className="mt-9">
                            <h2 className = "text-xl text-left">Back-end Developer</h2>
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
                            <button className="bg-[#27445D] lg:rounded-3xl rounded-2xl lg:px-7 px-4 p-1 text-md text-white transition transform hover:scale-105 border-[#1d3346] border-b-4 border-r-5">View Details</button>
                        </div>
                    </div> 
                </div>

                <div className="my-2 lg:m-0 md:mx-25">
                <div className="bg-[#EFE9D5] p-8 border-2 rounded-3xl shadow-xl transform transition-all hover:scale-103">
                <div className="flex items-center">
                            <span className="text-xl">
                                <img src = {microsoft} />
                            </span>
                            <div className="">
                                <h3 className=" ml-3 text-md font-bold text-gray-800 ">Microsoft</h3>
                                <p className=" ml-3 text-sm text-gray-800 ">Angeles City</p>
                            </div>
                        </div>

                        <div className="mt-9">
                            <h2 className = "text-xl text-left">Back-end Developer</h2>
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
                            <button className="bg-[#27445D] lg:rounded-3xl rounded-2xl lg:px-7 px-4 p-1 text-md text-white transition transform hover:scale-105 border-[#1d3346] border-b-4 border-r-5">View Details</button>
                        </div>
                    </div> 
                </div>


                <div className="my-2 lg:m-0 md:mx-25">
                <div className="bg-[#EFE9D5] p-8 border-2 rounded-3xl shadow-xl transform transition-all hover:scale-103">
                <div className="flex items-center">
                            <span className="text-xl">
                                <img src = {figma} />
                            </span>
                            <div className="">
                                <h3 className=" ml-3 text-md font-bold text-gray-800 ">Figma</h3>
                                <p className=" ml-3 text-sm text-gray-800 ">Angeles City</p>
                            </div>
                        </div>

                        <div className="mt-9">
                            <h2 className = "text-xl text-left">Back-end Developer</h2>
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
                            <button className="bg-[#27445D] lg:rounded-3xl rounded-2xl lg:px-7 px-4 p-1 text-md text-white transition transform hover:scale-105 border-[#1d3346] border-b-4 border-r-5">View Details</button>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="flex justify-center pb-3">
            <button className="bg-[#27445D] text-white text-lg px-6 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-1xl">
                Browse More Jobs &gt;&gt;
              </button>
            </div>
      </div>
        
    )
}

export default FeaturedJob