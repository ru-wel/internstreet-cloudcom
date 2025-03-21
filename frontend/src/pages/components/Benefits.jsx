import React from "react";

const Benefits = () => {
  return (
    <section className="bg-[#497D74] py-20 px-6 flex flex-col items-center text-center border">
      <h2 className="lg:text-6xl text-5xl font-extrabold mb-10 tracking-wide text-white">
        Why Choose Intern Street?
      </h2>
      
      <p className="max-w-3xl text-lg text-white mb-12 ">
        Whether you're a student looking for real-world experience or a company searching for top talent, Intern StreetPH connects the best opportunities with the right people.
      </p>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        {/* Student Benefits */}
        <div className="bg-[#F8F5EC] text-gray-900 p-20 border rounded-3xl shadow-xl transform transition-all hover:scale-105">
          <h3 className="text-3xl font-semibold mb-6 text-[#497D74]">For Student Interns</h3>
          <ul className="space-y-4 text-lg">
            <li>✓ Gain hands-on industry experience</li>
            <li>✓ Connect with top companies</li>
            <li>✓ Build a strong professional network</li>
          </ul>
        </div>
        
        {/* Company Benefits */}
        <div className="bg-[#F8F5EC] text-gray-900 p-20 border rounded-3xl shadow-xl transform transition-all hover:scale-105">
          <h3 className="text-3xl font-semibold mb-6 text-[#497D74]">For Companies</h3>
          <ul className="space-y-4 text-lg">
            <li>✓ Enhance workplace innovation</li>
            <li>✓ Streamline recruitment with easy onboarding</li>
            <li>✓ Grow a skilled workforce for the future</li>
          </ul>
        </div>

      </div>

      {/* Call to Action */}
      <div className="mt-14">
        <a href="/apply" className="bg-[#5c938a] text-[#ffffff] px-8 py-3 text-lg rounded-full shadow-md hover:bg-[#538376] transition-all">
          Get Started Today
        </a>
      </div>
    </section>
  );
};

export default Benefits;
