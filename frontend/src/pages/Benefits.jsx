import React from "react";

const Benefits = () => {
  return (
    <div className="bg-[#497D74] text-white py-20 px-6 flex flex-col items-center text-center">
      <h2 className="lg:text-6xl text-5xl font-bold mb-8">Why Choose Intern Street?</h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl w-full my-6">
        <div className="bg-[#F8F5EC] text-gray-900 p-6 rounded-4xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Benefits for Student Interns</h3>
          <ul className="space-y-5 mb-5">
            <li>✓ Basic Themes</li>
            <li>✓ 100 Gb Storage</li>
            <li>✓ Unlimited Bandwidth</li>
            <li>✓ Unlimited Designs</li>
          </ul>
        </div>
        
        <div className="bg-[#F8F5EC] text-gray-900 p-6 rounded-4xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Benefits for Companies</h3>
          <ul className="space-y-5 mb-5">
            <li>✓ Basic Themes</li>
            <li>✓ 100 Gb Storage</li>
            <li>✓ Unlimited Bandwidth</li>
            <li>✓ Unlimited Designs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
