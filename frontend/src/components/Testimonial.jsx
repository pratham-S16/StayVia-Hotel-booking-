import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Title
        title="What our Guests Say"
        subtitle="Discover why discerning travelers consistently choose StayVia for their exclusive and luxurious accommodations around the world."
      />
      <div className="mt-10">
        <div class="flex md:flex-row flex-col gap-5">
          {testimonials.map((testimonial) => (
            <div class="w-80 flex flex-col items-center border border-gray-300 p-10 rounded-lg">
              <img
                class="h-20 w-20 rounded-full"
                src={testimonial.image}
                alt="userImage1"
              />
              <h2 class="text-lg text-gray-900 font-medium mt-2">
                {testimonial.name}
              </h2>
              <p class="text-sm text-gray-500">{testimonial.address}</p>
              <div class="flex items-center justify-center mt-3 gap-1">
               <StarRating  rating={testimonial.rating} />
              </div>
              <p class="text-center text-[15px] mt-3 text-gray-500">
                {testimonial.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
