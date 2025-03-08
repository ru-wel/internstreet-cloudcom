import React from "react";
//import logo from '../assets/internstreet-logo.png';

function Footer (){

    return(
        

        <footer className="bg-[#497D74]">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex justify-center">
                    <a href="/landing" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Intern Street Logo?</span>
                    </a>
                </div>
                <hr className="my-6 border-white sm:mx-auto lg:my-6 " />
                <span className="block text-sm text-gray-500 sm:text-center text-white py-3">© 2025 Intern Street. All Rights Reserved.</span>
            </div>
        </footer>


    );

}

export default Footer;