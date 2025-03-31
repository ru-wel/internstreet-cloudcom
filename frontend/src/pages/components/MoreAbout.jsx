import React from 'react';
import heroimg from "/images/about-min.jpg";


function MoreAbout() {
  return (
    <div className="bg-gradient-to-br from-[#8ecfc2] via-[#e1f7f3] to-[#78b8b1] p-6 md:p-10 lg:p-15 border mx-4 md:mx-10 lg:mx-15 mb-6 md:mb-10 rounded-[30px]">
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
        <div className="bg-[#f5f0e1] text-gray-900 p-4 sm:p-6 md:p-10 lg:py-35 md:ml-4 lg:ml-20 border rounded-3xl shadow-xl transition duration-300 w-full md:w-[690px] mt-6 md:mt-0 sm:mt-4">
      
        <p className="text-xs sm:text-sm md:text-md lg:text-xl text-center tracking-wide leading-relaxed text-[#1f2524]">
        <span className="font-bold text-3xl"> Intern StreetPH's </span>mission is to connect <span className="font-bold">students</span> and <span className="font-bold">fresh graduates</span> with valuable internship opportunities.  
        Our platform offers a <span className="italic">seamless experience</span> for both interns and employers, helping them grow in their careers.
        <br /><br />
        We aim to help young professionals gain the <span className="underline decoration-[#3b8070]">skills</span> and <span className="underline decoration-[#1f5e5a]">connections</span> they need to succeed in the industry!
      </p>

        </div>
      </div>
    </div>
  );
}

export default MoreAbout;