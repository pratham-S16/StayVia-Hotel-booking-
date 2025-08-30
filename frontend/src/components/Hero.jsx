import React from "react";
import Search from "./Search";

function Hero() {
  return (
    <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url(/src/assets/main_page1.jpg)]  bg-no-repeat bg-center bg-cover h-screen ">
      {/* <div className="absolute inset-0 bg-black/5 backdrop-blur-xs z-10" /> */}
      <div className="flex mt-28 flex-col items-start justify-center max-w-2xl z-20">
        <p className=" bg-green-800/50 px-3.5 py-1 rounded-full mt-2">
          The Serene Experience
        </p>
        <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
         Your next unforgettable Escape awaits.
        </h1>
        <p className="max-w-130 mt-2 text-sm  md:text-base">
          Start your Unimmaginable journey of Luxury and Comfort at India's most
          exotic hotels and resorts.
        </p>
        <Search />
      </div>
    </div>
  );
}

export default Hero;
