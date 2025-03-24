import React from "react";
import heroimg from "/images/about.jpg";

function About() {
  return (
    <section className="bg-gradient-to-r from-[#8ecfc2] to-[#cdf2ec] rounded-[40px] mt-8 mb-4 mx-4 sm:mx-6 p-6 md:p-12 border shadow-xl">
      
      {/* Title Section */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black tracking-wide drop-shadow-lg">
          About <span className="text-[#497D74]">Intern StreetPH</span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16">

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[500px] h-[280px] sm:h-[340px] md:h-[440px] lg:h-[500px] rounded-3xl shadow-lg border border-white/20 overflow-hidden transition-transform duration-300 hover:scale-105">
            <img
              src={heroimg}
              alt="About Intern StreetPH"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Content Section */}
        <div className="bg-[#F8F5EC] border text-gray-900 p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl w-full md:w-1/2 text-center md:text-left flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#386059] mb-4">
              About Us
            </h2>
            <p className="text-gray-800 leading-relaxed mb-4 text-sm sm:text-base md:text-lg">
              Intern StreetPH's mission is to connect students and fresh
              graduates with valuable internship opportunities. Our platform
              offers a seamless experience for both interns and employers,
              helping them grow in their careers.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm sm:text-base md:text-lg">
              We aim to help young professionals gain the skills and
              connections they need to succeed in the industry!
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="flex justify-end mt-6">
            <a href="/about">
              <button className="bg-[#497D74] rounded-full px-6 sm:px-8 py-3 text-sm sm:text-base text-white transition-transform duration-300 hover:scale-105 border-[#2b4843] border-b-4 border-r-4 shadow-lg">
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
