import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FeatureDestination = () => {

  const {rooms, navigate} =useAppContext();
  return rooms.length>0 && (
  <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-6">


    <Title title="Featured Destination" subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences. "/>
    {/* <div className="mt-10 flex flex-col items-center ">
      <h1 className="text-4xl  font-playfair">Featured Destination</h1>
      <p className="text-gray-500 mt-3 text-lg font-playfair ">Discover our handpicked selection of exceptional properties around the world,</p>
      <p className="text-gray-500 text-lg font-playfair "> offering unparalleled luxury and unforgettable experiences.</p>
    </div> */}
      
      <div className="flex items-center justify-center flex-wrap gap-6  mt-18">
        {rooms?.slice(0, 4).map((room, index) => {
          return <HotelCard key={room._id} room={room} index={index} />;
        })}
      </div>

        <div className="my-16 px-4 py-2 text-sm font-medium border bg-white border-gray-400 hover:bg-gray-50 p-5 rounded-full transition-all cursor-pointer">
        <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}}>View All Hotels</button>
        </div>
      
    </div>
  )
  
};

export default FeatureDestination;
