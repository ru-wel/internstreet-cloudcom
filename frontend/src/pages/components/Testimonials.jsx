import React from "react";
import p1 from "/images/p1.jpg";
import p2 from "/images/p2.jpg";
import p3 from "/images/p3.jpg";



const testimonials = [
  {
    image: p1,
    message:
      "Finding the right internship felt overwhelming, but InternStreetPH made it easy. They matched me with a great company where I gained valuable experience. It was a rewarding journey that helped me grow in my career!",
    rating: 5,
  },
  {
    image: p2,
    message:
      "InternStreetPH made my internship journey smooth and rewarding. They connected me with a great company where I gained hands-on experience and valuable skills. Thanks to them, I felt confident stepping into the professional world!",
    rating: 5,
  },
  {
    image: p3,
    message:
      "Applying for an internship through InternStreetPH was simple and hassle-free. I received guidance every step of the way and was placed in a company where I learned valuable skills. It was a truly enriching experience!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gradient-to-r from-[#90d4cc] to-[#a1ded7]to-70%  rounded-[50px] mt-8 mb-6 mx-4 sm:mx-8 py-12 sm:py-16 lg:py-20 text-center border shadow-xl">
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-black">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 bg-[#f5f0e1] border rounded-2xl shadow-xl flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl max-w-xs sm:max-w-sm mx-auto"
          >
            <img
              src={testimonial.image}
              alt="Testimonial"
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-[#497D74] mb-3 sm:mb-4 shadow-md object-cover"
            />
            <p className="text-gray-700 text-base sm:text-lg italic my-4 sm:my-5 leading-relaxed">
              "{testimonial.message}"
            </p>
            <div className="text-yellow-500 text-2xl sm:text-3xl">
              {"★".repeat(testimonial.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
