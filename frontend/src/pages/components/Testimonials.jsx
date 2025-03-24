import React from "react";
import person from "/images/person-placeholder.png";

const testimonials = [
  {
    image: person,
    message:
      "Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.",
    rating: 5,
  },
  {
    image: person,
    message:
      "Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.",
    rating: 5,
  },
  {
    image: person,
    message:
      "Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gradient-to-r from-[#8ecfc2] to-[#cdf2ec] to-90% rounded-[50px] mt-8 mb-6 mx-4 sm:mx-8 py-12 sm:py-16 lg:py-20 text-center border shadow-xl">
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-gray-900">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 bg-[#F8F5EC] border rounded-2xl shadow-xl flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl max-w-xs sm:max-w-sm mx-auto"
          >
            <img
              src={testimonial.image}
              alt="Testimonial"
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-[#497D74] mb-3 sm:mb-4 shadow-md"
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
