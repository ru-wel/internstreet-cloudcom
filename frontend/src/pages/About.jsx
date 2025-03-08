import React from "react";
import heroimg from '../assets/heroimg.png';

function About (){
    return(

        <section className="bg-[#EFE9D5] rounded-3xl">

            <h1 className="text-5xl font-bold text-center lg:pt-20 md:pt-6 pt-15">About Intern StreetPH</h1>

            <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between lg:py-10 py-12 lg:px-20 px-8'>
                <div className="w-full lg:w-[45%] mb-8 lg:mb-0 flex justify-center">
                    <img 
                        src={heroimg} 
                        alt="Internship Platform" 
                        className="lg:w-[80%] md:w-[60%] h-auto mx-auto"
                    />
                </div>

                <div className="flex flex-col items-center lg:items-start lg:w-[55%]">
                    <div className="lg:my-30">
                    <p className="text-xl text-black text-center lg:text-left ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div className="flex justify-center pt-10 pb-3">
                        <button className="bg-[#497D74] rounded-3xl px-7 p-2 text-md text-white transition transform hover:scale-105">Read More &gt;&gt;</button>
                    </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default About;