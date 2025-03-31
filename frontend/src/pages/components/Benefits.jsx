import React from "react";

const Benefits = () => {
  return (
    <section className="bg-gradient-to-r from-[#90d4cc] to-[#a1ded7]to-70% flex flex-col items-center text-center rounded-[50px] mt-8 mb-4 mx-4 sm:mx-8 p-6 sm:p-12 md:p-18 border shadow-xl">
      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-10 tracking-wide text-black">
        Why Choose Intern Street?
      </h2>
      
      <p className="max-w-3xl text-base sm:text-lg text-black mb-8 sm:mb-12">
        Whether you're a student looking for real-world experience or a company searching for top talent, Intern StreetPH connects the best opportunities with the right people.
      </p>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full">
        
        {/* Student Benefits */}
        <div className="bg-[#f5f0e1] text-gray-900 p-10 sm:p-16 md:p-20 border rounded-3xl shadow-xl transform transition-all hover:scale-105">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-[#497D74]">
            For Student Interns
          </h3>
          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
            <li>✓ Gain hands-on industry experience</li>
            <li>✓ Connect with top companies</li>
            <li>✓ Build a strong professional network</li>
          </ul>
        </div>
        
        {/* Company Benefits */}
        <div className="bg-[#f5f0e1] text-gray-900 p-10 sm:p-16 md:p-20 border rounded-3xl shadow-xl transform transition-all hover:scale-105">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-[#497D74]">
            For Companies
          </h3>
          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
            <li>✓ Enhance workplace innovation</li>
            <li>✓ Streamline recruitment with easy onboarding</li>
            <li>✓ Grow a skilled workforce for the future</li>
          </ul>
        </div>

      </div>

      {/* Call to Action */}
      <div className="mt-10 sm:mt-14">
      <a href="/login" className="bg-[#5c938a] text-[#ffffff] px-4 sm:px-7 py-2 sm:py-3 text-lg sm:text-lg rounded-full shadow-md hover:bg-[#538376] transition-all border-[#2b4843] border-b-4 border-r-4">
        Get Started Now
      </a>

      </div>
    </section>
  );
};

export default Benefits;
