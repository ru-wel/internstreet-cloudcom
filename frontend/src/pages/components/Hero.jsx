import React from 'react';
import heroimg from '/images/heroimgs.png';

const Hero = () => {
    return (
        <section className="bg-white">
            <div className='flex flex-col lg:flex-row-reverse items-center lg:items-start justify-center lg:justify-between lg:py-10 py-12 lg:px-20 '>
            <div className="w-full lg:w-2/5 flex justify-center mt-auto mb-6 md:mb-10 lg:mb-0">
            <img 
                src={heroimg} 
                alt="Internship Platform" 
                className="w-4/5 md:w-3/5 lg:w-3/4 h-auto mx-auto"
            />
            </div>


            <div className="flex flex-col items-center lg:items-start w-full lg:w-3/5 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black my-6 md:my-8 lg:my-10 text-center lg:text-left pt-16 md:pt-24">
                        Your Number 1 Platform to Land Internships in the Philippines!
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl text-black mb-8 text-center lg:text-left max-w-3xl">
                        Welcome to Intern Street! Your online platform that connects interns with companies to find job opportunities. 
                        Intern Street is an online platform that connects interns with companies to find job opportunities.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-[#497D74] border  text-white py-3 px-6 rounded-3xl transition transform hover:scale-105 hover:bg-opacity-90">
                            Get Started
                        </button>
                        <button className="border border-[#3c665f] hover:bg-[#3c665f] hover:text-white text-black py-3 px-6 rounded-3xl transition transform hover:scale-105">
                            For Employers
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;