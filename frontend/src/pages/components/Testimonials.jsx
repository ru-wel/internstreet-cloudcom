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
    <div className="bg-[#a3c4be] py-20 px-6 text-center border">
      <h2 className="lg:text-6xl text-5xl font-bold mb-12 text-gray-900">
        Testimonials
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 bg-[#F8F5EC] border rounded-2xl shadow-xl flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={testimonial.image}
              alt="Testimonial"
              className="w-20 h-20 rounded-full border-4 border-[#497D74] mb-4 shadow-md"
            />
            <p className="text-gray-700 text-lg italic my-5 leading-relaxed">
              "{testimonial.message}"
            </p>
            <div className="text-yellow-500 text-3xl">
              {"★".repeat(testimonial.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
