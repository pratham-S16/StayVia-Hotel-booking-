import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";


const HotelCard = ({room, index}) => {
  return (
   
      <Link
        to={`/rooms/${room._id}`}
        onClick={() => window.scrollTo(0, 0)}
        className='relative  max-w-70 w-full rounded-xl overflow-hidden bg-white  text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'
      >
        <img src={room.images[0]} alt={`image ${index}`} className="h-56 w-72 object-cover" />
        {index % 2 === 0 && (
          <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
            Best Seller
          </p>
        )}
        <div className="p-5"> 
          <div className="flex items-center  justify-between">
            <p className="font-playfair text-xl font-medium text-gray-800">
              {room.hotel.name}
            </p>
            <div className="flex items-center gap-1">
              <img src={assets.starIconFilled} alt="staricon" />
              4.5
            </div>
          </div>
          <div className="flex mt-0.5">
            <img
              src={assets.locationIcon}
              alt="location-icon"
              className="w-4 h-4 mr-1"
            />
            <span className="text-sm">{room.hotel.address}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p>
              <span className="text-xl font-playfair text-gray-800">
                 Rs {room.pricePerNight}/night
              </span>
            </p>
            <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    
  );
};

export default HotelCard;
