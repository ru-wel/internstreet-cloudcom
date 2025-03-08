import React from 'react';

function MoreAbout() {
  return (
    <div className="my-12">
      {/* Header */}
      <h1 className="lg:text-6xl md:text-4xl text-3xl font-bold text-center lg:mb-14 mb-8">About Intern StreetPH</h1>

      {/* Container with Image and Paragraph */}
      <div className="flex flex-col md:flex-row items-center justify-center mx-8">
        {/* Left Side (Image) */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img 
            src="https://placehold.co/600x400" 
            alt="Intern StreetPH" 
            className="lg:w-[80%] md:w-[60%] h-auto mx-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Side (Paragraph) */}
        <div className="md:w-1/2 text-center md:text-left px-4">
          <p className="lg:text-xl text-md text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MoreAbout;
