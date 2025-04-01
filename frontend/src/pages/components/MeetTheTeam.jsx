import React from 'react';
import gab from "/images/gab.jpg";
import abby from "/images/abby-min.jpg";
import ethan from "/images/ethan-min.png";
import levin from "/images/levin.jpg";
import wel from "/images/wel.jpg";
import mina from "/images/mina.jpg";

function MeetTheTeam() {
  const team = [
    { name: "Gabrielle Mae Rose Delos Santos", role: "Frontend Developer", imgSrc: gab },
    { name: "Abby Dizon", role: " UI/UX & Frontend Developer", imgSrc: abby },
    { name: "Ethan James Gonzales", role: "Frontend Developer", imgSrc: ethan },
    { name: "Levin Mallari", role: "Backend Developer", imgSrc: levin },
    { name: "Reuel Christian Sundiam", role: "Backend Developer", imgSrc: wel },
    { name: "Almina Tanglao", role: "Mockups & UI/UX Developer", imgSrc: mina }
  ];

  return (
    <div className="bg-[#F8F5EC] py-12">
      <h1 className="lg:text-6xl text-4xl font-bold text-center py-10">Meet the Team</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-8 lg:px-20 lg:mx-20 mx-8 ">
        {team.map((member, index) => (
          <div key={index} className="text-center hover:scale-105 transition-all duration-300 pb-4">
            <img 
              src={member.imgSrc} 
              alt={member.name} 
              className="w-md  mx-auto object-cover rounded-3xl mb-6 border-2"
            />
            <p className="text-xl font-semibold text-[#427068]">{member.name}</p>
            <p className="text-md text-gray-700">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetTheTeam;
