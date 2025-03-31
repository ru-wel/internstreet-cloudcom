import React from 'react';
import heroimg from "/images/about-min.jpg";


function MoreAbout() {
  return (
    <div className="bg-gradient-to-r from-[#b8dad3] to-[#7fd2c7] p-6 md:p-10 lg:p-15 border mx-4 md:mx-10 lg:mx-15 mb-6 md:mb-10 rounded-[30px]">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl lg:text-6xl text-center font-extrabold text-black tracking-wide drop-shadow-lg mb-6 md:mb-10">
        About <span className="text-[#497D74]">Intern StreetPH</span>
      </h1>

      {/* Container with Image and Paragraph */}
      <div className="flex flex-col md:flex-row items-center justify-center mx-4 md:mx-8">
        {/* Left Side (Image) */}
        <div className="w-full md:w-[680px] lg:w-[690px] h-[240px] md:h-[380px] lg:h-[500px] rounded-3xl shadow-lg border border-black/20 overflow-hidden md:ml-4 lg:ml-10 flex items-center">
          <img
            src={heroimg}
            alt="About Intern StreetPH"
            className="w-full h-full object-cover border-2"
            loading="lazy"
          />
        </div>

        {/* Right Side (Paragraph) */}
        <div className="bg-[#f5f0e1] text-gray-900 p-6 md:p-10 lg:pl-20 lg:pr-30 lg:py-20 md:ml-4 lg:ml-20 border rounded-3xl shadow-xl transition duration-300 text-center w-full md:w-[690px] mt-6 md:mt-0">
          <p className="text-sm md:text-md lg:text-xl text-gray-700">
            Intern StreetPH's mission is to connect students and fresh graduates with valuable internship opportunities. Our platform offers a seamless experience for both interns and employers, helping them grow in their careers.
            <br /> <br />
            We aim to help young professionals gain the skills and connections they need to succeed in the industry!
          </p>
        </div>
      </div>
    </div>
  );
}

export default MoreAbout;