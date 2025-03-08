import React from 'react'
import cloudstaff from '../assets/companies/cloudstaff.png'
import co from '../assets/companies/co.png'
import accenture from '../assets/companies/accenture.png'
import concentrix from '../assets/companies/concentrix.png'
import mvp from '../assets/companies/mvp.png'
import shore from '../assets/companies/shore360.png'
import taskus from '../assets/companies/taskus.png'
import itsquarehub from '../assets/companies/itsquarehub.png'
import bb88 from '../assets/companies/bb88.png'
import hooli from '../assets/companies/hooli.png'


const companies = [
    cloudstaff, co, accenture, concentrix, mvp, shore, taskus, hooli, itsquarehub, bb88
];

const Marquee = () => {
  return (
    <div className="overflow-hidden bg-[#a4bdb9] py-4 relative w-full">
      <div className="flex w-max whitespace-nowrap [animation:marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {[...companies, ...companies].map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="Company Logo"
            className="h-16 mx-8"
          />
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0%); }
            to { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Marquee