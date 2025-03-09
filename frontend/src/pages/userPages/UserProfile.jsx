import React from 'react'
import Nav from '../components/Nav'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { FaBookmark } from "react-icons/fa";
import person from '../../../public/images/person-placeholder.png'
import Footer from '../components/Footer'


function UserProfile() {
  return (
    <div>
      <Nav></Nav>

      {/* MAS MADAGUL RIGHT CONTAINER */}

      <div className='bg-[#ADC4C0] rounded-t-3xl'>
        <div className="flex flex-col md:flex-row lg:px-20 px-10 pt-26 pb-20">
          <div className="bg-[#497D74] rounded-3xl p-6 md:w-1/3 relative">
            <div className="w-32 h-32 rounded-full border-4 border-gray-400 bg-cover bg-center absolute top-[-60px] left-1/2 transform -translate-x-1/2">
              <img src={person} alt="Profile" className="w-full h-full rounded-full" />
            </div>

            <div className="mt-20 text-white text-center">
              <h1 className="text-5xl font-bold">Levina Mallari</h1>
              <p className="text-xl my-4 text-[#EFE9D5]">Angeles City, Philippines</p>
              <p className="text-xl text-[#EFE9D5]">Web Developer</p>
            </div>

            <div className="mt-6 text-left text-white">
              <h3 className="text-xl font-semibold">Contact</h3>
              <hr className="border-gray-700 border-t-2 my-2" />
              <div className="flex justify-start space-x-4 text-2xl">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="mailto:example@example.com">
                  <FaEnvelope />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button className="bg-[#27445d] border-2 border-[#1d3346] border-b-6 border-r-6 text-white py-2 px-6 rounded-2xl transition transform hover:scale-105 mb-4 sm:mb-0 cursor-pointer">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-2/3 md:ml-6 bg-[#EFE9D5] rounded-3xl p-10 shadow-lg">
            <h3 className="lg:text-5xl text-4xl font-bold mb-4">Personal Details:</h3>
            <p><strong>Email:</strong> levina@gmail.com</p>
            <p><strong>Phone:</strong> 0912 345 6789</p>
            <p><strong>Website:</strong> levina-portfolio.netlify.app</p>
            <p><strong>Bio:</strong> I am Levina. A Full-Stack Web Developer. I break down complex user experience problems to create integrity focussed solutions that connect billions of people.</p>
            <h1 className='font-bold text-4xl'>Ali ku balu nanu lage keni guyz</h1>
          </div>
        </div>

        {/* KUNG ITUTULOY ANG RESUME */}

        {/* <div className="pb-14">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-10">Resume</h2>

            <div className="bg-[#EBF1F0] rounded-lg p-8 shadow-lg">
              <p className="text-xl mb-6">Upload a resume for easy applying and access</p>

              <button className="bg-[#497D74] text-white px-6 py-3 rounded-full hover:opacity-90 transition-all">
                Add Resume
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <Footer></Footer>
    </div>
  )
}

export default UserProfile