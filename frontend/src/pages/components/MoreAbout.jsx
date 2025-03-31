import React from 'react';
import heroimg from "/images/about-min.jpg";


function MoreAbout() {
  return (
    
    <div className="bg-gradient-to-r from-[#b8dad3] to-[#7fd2c7] p-15 border mx-15 mb-10 rounded-[30px]">
      {/* Header */}  
      <h1 className="text-4xl text-center md:text-5xl lg:text-6xl font-extrabold text-black tracking-wide drop-shadow-lg  mb-10">
      About <span className="text-[#497D74]">Intern StreetPH</span> </h1>

      {/* Container with Image and Paragraph */}
      <div className="flex flex-col md:flex-row items-center justify-center mx-8">
        {/* Left Side (Image) */}
        <div className="w-[280px] md:w-[680px] lg:w-[690px] h-[280px] md:h-[380px] lg:h-[500px] rounded-4xl shadow-lg border border-black/20 overflow-hidden lg:ml-10 items-center">        <img
              src={heroimg}
              alt="About Intern StreetPH"
              className="w-full h-full object-cover border-2"
              loading="lazy"
            />
        </div>

        {/* Right Side (Paragraph) */}
        <div className="bg-[#f5f0e1] text-gray-900  md:p-10 lg:pl-20 lg:pr-30 lg:py-20 lg:ml-20 md:ml-20 border rounded-3xl shadow-xl transition duration-300  md:text-center w-full md:w-[690px] p-10 mt-10 text-center">
          <p className="lg:text-xl text-md text-gray-700">
          Intern StreetPH's mission is to connect students and fresh graduates with valuable internship opportunities. Our platform offers a seamless experience for both interns and employers, helping them grow in their careers. <br /> <br />
          
          We aim to help young professionals gain the skills and connections they need to succeed in the industry!
          </p>
        </div>
      </div>
    </div>
  );
}

export default MoreAbout;
