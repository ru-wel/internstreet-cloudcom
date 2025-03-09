import React from "react";
import person from "/images/person-placeholder.png"

const testimonials = [
  {
    image: person,
    message: "Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.",
    rating: 5,
  },
  {
    image: person,
    message: "Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.",
    rating: 5,
  },
  {
    image: person,
    message: "Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[#D5E1DF] py-18 px-6 text-center">
      <h2 className="lg:text-6xl text-5xl font-bold mb-12">Testimonials</h2>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 flex flex-col items-center">
            <img src={testimonial.image} alt="Testimonial" className="w-20 h-20 rounded-full border-2 mb-4" />
            <p className="text-gray-800 text-lg italic my-5">"{testimonial.message}"</p>
            <div className="text-yellow-500 text-4xl">
              {"★".repeat(testimonial.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
