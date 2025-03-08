import React from 'react';

function MeetTheTeam() {
  const team = [
    { name: "Gabrielle Mae Rose Delos Santos", role: "Role/Position", imgSrc: "https://placehold.co/400" },
    { name: "Abby Dizon", role: "Role/Position", imgSrc: "https://placehold.co/400" },
    { name: "Ethan James Gonzales", role: "Role/Position", imgSrc: "https://placehold.co/400" },
    { name: "Levin Mallari", role: "Role/Position", imgSrc: "https://placehold.co/400" },
    { name: "Reuel Christian Sundiam", role: "Role/Position", imgSrc: "https://placehold.co/400" },
    { name: "Almina Tanglao", role: "Role/Position", imgSrc: "https://placehold.co/400" }
  ];

  return (
    <div className="bg-[#F8F5EC] py-12">
      {/* Header */}
      <h1 className="lg:text-6xl text-4xl font-bold text-center py-10">Meet the Team</h1>

      {/* Grid Container for Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-8 lg:px-20 lg:mx-20 mx-8">
        {team.map((member, index) => (
          <div key={index} className="text-center hover:scale-105 transition-all duration-300 pb-4">
            <img 
              src={member.imgSrc} 
              alt={member.name} 
              className="w-full mx-auto object-cover rounded-3xl mb-4"
            />
            <p className="text-xl font-semibold text-[#27445D]">{member.name}</p>
            <p className="text-md text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetTheTeam;
