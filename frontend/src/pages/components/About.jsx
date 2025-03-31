import React from "react";
import heroimg from "/images/about-min.jpg";

function About() {
  return (
    <section className="bg-gradient-to-r from-[#8ecfc2] to-[#bbefe5] rounded-[30px] mt-6 mb-6 mx-4 md:mx-6 lg:mx-8 p-6 md:p-12 lg:p-18 border shadow-lg">
      
      {/* Title Section */}
      <div className="text-center relative z-10 mb-6 md:mb-8 lg:mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-wide drop-shadow-lg">
          About <span className="text-[#497D74]">Intern StreetPH</span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[280px] md:w-[460px] lg:w-[690px] h-[280px] md:h-[680px] lg:h-[500px] rounded-4xl shadow-lg border border-black/20 overflow-hidden lg:ml-10">
            <img
              src={heroimg}
              alt="About Intern StreetPH"
              className="w-full h-full object-cover border-2"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text Content Section */}
        <div className="bg-[#f5f0e1] text-gray-900 p-6 md:p-10 lg:pl-20 lg:pr-30 lg:py-20 border rounded-3xl shadow-xl transition duration-300 text-center md:text-left w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#386059] mb-4 ">
            About Us
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4 text-base md:text-lg lg:text-xl">
            Intern StreetPH's mission is to connect students and fresh
            graduates with valuable internship opportunities. Our platform
            offers a seamless experience for both interns and employers,
            helping them grow in their careers.
          </p>
          <p className="text-gray-800 leading-relaxed text-base md:text-lg lg:text-xl">
            We aim to help young professionals gain the skills and
            connections they need to succeed in the industry!
          </p>

          {/* Call to Action Button */}
          <div className="flex justify-center md:justify-start pt-6">
            <a href="/about" className="cursor-pointer">
              <button className="bg-[#5c938a] text-[#ffffff] px-4 sm:px-7 py-2 sm:py-3 text-base sm:text-lg rounded-full shadow-md hover:bg-[#538376] transition-all border-[#2b4843] border-b-4 border-r-4 cursor-pointer">
                Read More &gt;&gt;
              </button>
            </a>
          </div>
        </div>

      </div>
      
    </section>
  );
}

export default About;
