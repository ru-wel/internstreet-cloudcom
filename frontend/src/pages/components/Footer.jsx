import React from "react";
import logo from '/images/internstreet-logo.png';

//import logo from '../assets/internstreet-logo.png';

function Footer (){

    return(
        

        <footer className="bg-[#5f8d85]">
            <div className="w-full  mx-auto p-4 md:py-8">
                <div className="flex justify-start">
                    <a href="/landing" className="flex items-start mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse bg-gradient-to-r from-[#baece1] to-[#7bb4ad] p-2 rounded-xl ">
                    <img src={logo} alt="InternStreet Logo" className="h-12 w-auto" />
                    </a>
                </div>
                <hr className="block my-5 border-white sm:mx-auto lg:my-5s " />
                <span className=" text-m text-center text-white py-3">© 2025 Intern Street. All Rights Reserved.</span>
            </div>
        </footer>


    );

}

export default Footer;