import React from 'react';
import heroimg from '../assets/heroimg.png';

const Hero = () => {
    return (
        <section className="bg-white">
            <div className='flex flex-col lg:flex-row-reverse items-center lg:items-start justify-center lg:justify-between lg:py-16 py-12 lg:px-20 px-8'>
                <div className="w-full lg:w-[45%] mb-8 lg:mb-0 flex justify-center">
                    <img 
                        src={heroimg} 
                        alt="Internship Platform" 
                        className="lg:w-[80%] md:w-[60%] h-auto mx-auto"
                    />
                </div>

                <div className="flex flex-col items-center lg:items-start lg:w-[55%]">
                    <h1 className="lg:text-6xl text-3xl font-bold text-black lg:my-10 my-6 text-center lg:text-left">
                        Your Number 1 Platform to Land Internships in the Philippines!
                    </h1>
                    <p className="text-xl text-black mb-10 text-center lg:text-left">
                        Intern Street is an online platform that connects interns with companies to find job opportunities. Intern Street is an online platform that connects interns with companies to find job opportunities.
                    </p>
                    <div className="flex sm:flex-row flex-col sm:space-x-4 items-center sm:items-start">
                        <button className="bg-[#27445d] border-2 border-[#1d3346] border-b-6 border-r-6 text-white py-2 px-6 rounded-2xl transition transform hover:scale-105 mb-4 sm:mb-0">
                            Get Started
                        </button>
                        <button className="border-2 border-[#27445D] text-black py-2 px-6 rounded-2xl transition transform hover:scale-105">
                            For Employers
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;