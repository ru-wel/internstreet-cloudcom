import React from 'react'
import cloudstaff from '/images/companies/cloudstaff.png'
import co from '/images/companies/co.png'
import accenture from '/images/companies/accenture.png'
import concentrix from '/images/companies/concentrix.png'
import mvp from '/images/companies/mvp.png'
import shore from '/images/companies/shore360.png'
import taskus from '/images/companies/taskus.png'
import itsquarehub from '/images/companies/itsquarehub.png'
import bb88 from '/images/companies/bb88.png'
import hooli from '/images/companies/hooli.png'

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