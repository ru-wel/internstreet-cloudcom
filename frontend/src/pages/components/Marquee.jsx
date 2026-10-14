import React from 'react'
import cloudstaff from '/images/companies/cloudstaff.webp'
import co from '/images/companies/co.webp'
import accenture from '/images/companies/accenture.webp'
import concentrix from '/images/companies/concentrix.webp'
import mvp from '/images/companies/mvp.webp'
import shore from '/images/companies/shore360.webp'
import taskus from '/images/companies/taskus.webp'
import itsquarehub from '/images/companies/itsquarehub.webp'
import bb88 from '/images/companies/bb88.webp'
import hooli from '/images/companies/hooli.webp'

const companies = [
    { logo: cloudstaff, name: 'Cloudstaff' }, { logo: co, name: 'Co' }, { logo: accenture, name: 'Accenture' },
    { logo: concentrix, name: 'Concentrix' }, { logo: mvp, name: 'MVP' }, { logo: shore, name: 'Shore360' },
    { logo: taskus, name: 'TaskUs' }, { logo: hooli, name: 'Hooli' }, { logo: itsquarehub, name: 'IT Squarehub' },
    { logo: bb88, name: 'BB88' }
];

const Marquee = () => {
  return (
    <div className="overflow-hidden py-4 relative w-full border mb-4">
      <div className="flex w-max whitespace-nowrap motion-safe:[animation:marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {/* The second copy only makes the loop seamless, so screen readers skip it */}
        {[...companies, ...companies].map((company, index) => (
          <img
            key={index}
            src={company.logo}
            alt={index < companies.length ? company.name : ''}
            aria-hidden={index >= companies.length}
            loading="lazy"
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