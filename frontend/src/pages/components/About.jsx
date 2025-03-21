import React from "react";
import heroimg from "/images/about.jpg";

function About() {
  return (
    <section className="bg-gradient-to-r from-[#9ab8b2] to-[#bbefe5] to-90% rounded-[50px] mt-8 mb-6 mx-8 p-18 border shadow-xl">
      
      {/* Title Section */}
      <div className="text-center relative z-10 mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-wide drop-shadow-lg">
          About <span className="text-[#497D74]">Intern StreetPH</span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[320px] md:w-[420px] lg:w-[460px] h-[320px] md:h-[420px] lg:h-[460px] rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <img
              src={heroimg}
              alt="About Intern StreetPH"
              className="w-full h-full object-cover border-2"
            />
          </div>
        </div>

        {/* Text Content Section */}
        <div className="bg-[#F8F5EC] text-gray-900 p-20 border rounded-3xl shadow-xl  transition duration-30  ">
          <h2 className="text-4xl font-bold text-[#386059] mb-4">
            About Us
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4 text-lg">
            Intern StreetPH's mission is to connect students and fresh
            graduates with valuable internship opportunities. Our platform
            offers a seamless experience for both interns and employers,
            helping them grow in their careers.
          </p>
          <p className="text-gray-800 leading-relaxed text-lg">
            We aim to help young professionals gain the skills and
            connections they need to succeed in the industry!
          </p>

          {/* Call to Action Button */}
          <div className="flex justify-center pt-6">
            <a href="/about">
              <button className="bg-[#497D74] text-white text-lg px-6 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl">
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
