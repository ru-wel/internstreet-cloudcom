import React from 'react'
import Nav from '../components/Nav'
import google from '../../../public/images/google.png'
import Footer from '../components/Footer'

import { FaUpload } from "react-icons/fa";


const Application = () => {
    return (
        <div>
            <Nav></Nav>
            <div className="items-start bg-[#cfdbd8] px-10 py-7 rounded-t-3xl">
                <div className="flex flex-col lg:flex-row lg:ml-30 ml-0 mt-10 overflow-hidden max-w-2xl md:max-w-4xl w-full items-center justify-center">
                    <div className="bg-[#EFE9D5] p-2 rounded-3xl border-1 max-w-xs sm:max-w-md">
                        <img
                            src={google}
                            alt="Job Image"
                            className="w-48 p-4 h-auto object-cover rounded-2xl"
                        />
                    </div>

                    <div className="w-full lg:w-2/3 lg:ml-12 flex flex-col items-center lg:items-start justify-center mt-4 lg:mt-0">
                        <h3 className="text-gray-500 text-lg mb-2 font-semibold uppercase">Applying for</h3>
                        <h2 className="text-3xl lg:text-4xl font-bold text-black mt-2">Software Developer</h2>
                        <p className="text-black mt-1 text-lg">Google Inc.</p>
                        <a href="#" className="mt-4 text-black underline">View Job Description</a>
                    </div>
                </div>


                <hr className="my-8 border-t-2 border-gray-400 w-full max-w-7xl mx-auto" />

                <div className="bg-[#b1c7c3] p-6 max-w-7xl mx-auto rounded-3xl my-10">
                    <div className='max-w-5xl mx-auto'>
                        <h2 className="text-4xl font-bold text-center lg:text-left my-4">Personal Details</h2>
                        <form className="space-y-4 max-w-4xl mx-auto mt-8">
                            <div className="flex flex-col sm:flex-row sm:space-x-20">
                                <div className="w-full lg:w-1/2 mb-4 md:mb-0">
                                    <label className="block text-black font-semibold text-md mb-2">First Name</label>
                                    <input type="text" className="p-3 border border-gray-400 w-full rounded-3xl text-center bg-white placeholder-gray-500 text-black focus:outline-none" placeholder='First Name' />
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <label className="block text-black font-semibold text-md mb-2">Last Name</label>
                                    <input type="text" className="p-3 border border-gray-400 w-full rounded-3xl text-center bg-white placeholder-gray-500 text-black focus:outline-none" placeholder='Last Name' />
                                </div>
                            </div>

                            <div>
                                <label className="block text-black font-semibold text-md mb-2">Location</label>
                                <input type="text" className="p-3 border border-gray-400 w-full rounded-3xl text-center bg-white placeholder-gray-500 text-black focus:outline-none" placeholder='Location' />
                            </div>

                            <div>
                                <label className="block text-black font-semibold text-md mb-2">Phone Number</label>
                                <input type="text" className="p-3 border border-gray-400 w-full rounded-3xl text-center bg-white placeholder-gray-500 text-black focus:outline-none" placeholder='Phone Number' />
                            </div>

                            <div>
                                <p className="text-black font-semibold text-md">Email Address</p>
                                <p className="px-0 lg:px-10 py-2 text-lg">internstreetph@gmail.com</p>
                            </div>

                            <button type="button" className="bg-[#497D74] text-white px-8 py-2 text-lg rounded-3xl">Save</button>

                            <div className="flex space-x-4">
                                <div className="w-1/2 flex flex-col items-center">
                                    <p className="font-semibold text-lg">Resume</p>
                                    <button className="bg-[#497D74] text-white font-bold px-4 py-2 rounded-3xl mt-2 flex items-center gap-2 text-left">
                                        <FaUpload /> Upload
                                    </button>
                                </div>
                                <div className="w-1/2 flex flex-col items-center">
                                    <p className="font-semibold text-lg">Cover Letter</p>
                                    <button className="bg-[#497D74] text-white font-bold px-4 py-2 rounded-3xl mt-2 flex items-center gap-2 text-left">
                                        <FaUpload /> Upload
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center mt-8">
                                <button className="bg-[#27445d] border-2 border-[#1d3346] border-b-6 border-r-6 text-white py-2 px-6 rounded-3xl transition transform hover:scale-105 mb-4 sm:mb-0 cursor-pointer text-xl">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Application