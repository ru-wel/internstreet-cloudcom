import React from "react";
import heroimg from "/images/heroimgs.png";

function About() {
  return (
    <section className="bg-[#EFE9D5]  shadow-xl px-6 md:px-12 lg:px-20 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"></div>

      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-[#333] tracking-wide">
          About <span className="text-[#497D74]">Intern StreetPH</span>
        </h1>
      </div>

      {/* About Section */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-0">

    <div className="w-full md:w-1/2 flex justify-center md:justify-start">
    <img
      src={heroimg}
      alt="About Intern StreetPH"
      className="object-cover w-full max-w-[400px] md:max-w-[600px] lg:max-w-[650px] h-auto"
    />
  </div>


        {/* Content */}
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2  bg-white p-6 sm:p-10 md:p-16 lg:p-20 rounded-lg border md:rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-[#497D74] mb-4">
            About Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-xl">
            Intern StreetPH's very mission is to connect students and fresh
            graduates with valuable internship opportunities. Our platform
            provides a seamless experience for both interns and employers,
            helping them grow in their career development.
          </p>
          <p className="text-gray-700 leading-relaxed text-xl">
            This online platform aim to helping young professionals gain the skills and
            connections they need to succeed!
          </p>

          <div className="flex justify-center pt-10 ">
             <a href="/about"><button className="bg-[#497D74] rounded-3xl px-7 p-2 text-md text-white transition transform hover:scale-105 cursor-pointer">Read More &gt;&gt;</button></a>
          </div>

        </div>
   


      </div>
    </section>
  );
}

export default About;
