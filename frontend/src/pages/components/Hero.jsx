import React from 'react';
import heroimg from '/images/is-hero.png';

const Hero = () => {
    return (
        
<section className="bg-gradient-to-r from-[#baece1] to-[#9eddd4] to-90% rounded-[60px] mb-6 mx-8 p-10 text-center border">

            <div className='flex flex-col lg:flex-row-reverse items-center lg:items-start justify-center lg:justify-between lg:py-10 py-12 lg:px-20 '>
            <div className="w-full lg:w-3/5 flex justify-center mt-auto mb-6 md:mb-10 lg:mb-0">
            <img 
                src={heroimg} 
                alt="Internship Platform" 
                className="w-4/5 md:w-3/5 lg:w-3/4 h-auto mx-auto"
            />
            </div>


            <div className="flex flex-col items-center lg:items-start w-full lg:w-3/5 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black my-4 sm:my-6 md:my-8 lg:my-10 text-center lg:text-left pt-8 sm:pt-12 md:pt-24">
                        Your Number 1 Platform to Land Internships in the Philippines!
                    </h1>

                    <p className="text-lg md:text-xl lg:text-1xl text-black mb-8 text-center lg:text-left max-w-3xl">
                        Welcome to Intern Street! Your online platform that connects interns with companies to find job opportunities. 
                        Intern Street is an online platform that connects interns with companies to find job opportunities.
                        </p>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <button className="bg-[#497D74] rounded-4xl px-8 sm:px-7 py-3 text-base sm:text-lg text-white transition transform hover:scale-105 border-[#2b4843] border-b-4 border-r-4">Get Started</button>
                    <button className="bg-[#2d4e6c] rounded-4xl px-8 sm:px-6 py-3 text-base sm:text-lg text-white transition transform hover:scale-105 border-[#1d3346] border-b-4 border-r-4"> For Employers </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;