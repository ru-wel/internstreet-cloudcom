import React from 'react';
import heroimg from '/images/heroimgs.png';

const Hero = () => {
    return (
        <section className="bg-white">
            <div className='flex flex-col lg:flex-row-reverse items-center lg:items-start justify-center lg:justify-between lg:py-10 py-12 lg:px-20 '>
                <div className="w-full lg:w-[40%] mt-auto mb-8 lg:mb-0 flex justify-center">
                    <img 
                        src={heroimg} 
                        alt="Internship Platform" 
                        className="lg:w-[75%] md:w-[75%] h-auto mx-auto mb-9 "
                    />
                </div>

                <div className="flex flex-col items-center lg:items-start lg:w-[55%]">
                    <h1 className="lg:text-6xl text-[40px] font-bold text-black lg:my-10 my-6 text-center lg:text-left pt-[100px]">
                        Your Number 1 Platform to Land Internships in the Philippines!
                    </h1>
                    <p className="text-xl text-black mb-10 text-center lg:text-left">
                        Welcome to Intern Street! Your online platform that connects interns with companies to find job opportunities. Intern Street is an online platform that connects interns with companies to find job opportunities.
                    </p>
                    <div className="flex sm:flex-row flex-col sm:space-x-4 items-center sm:items-start">
                        <button className="bg-[#497D74] border-1 border-[#3c665f] border-b-6 border-r-6 text-white py-2 px-6 rounded-3xl transition transform hover:scale-105 mb-4 sm:mb-0 cursor-pointer">
                            Get Started
                        </button>
                        <button className="border-2 border-[#3c665f] hover:bg-[#3c665f] hover:text-white text-black py-2 px-6 rounded-3xl transition transform hover:scale-105 cursor-pointer">
                            For Employers
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;