import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
import StarRating from '../components/StarRating';
import ownerpic from '../search assets/main_page2.jpg'

const RoomDetails = () => {
    const {id}= useParams();
    const [room,setRoom]=useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(()=>{
        const room=roomsDummyData.find(room=> room._id === id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    },[]);

  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* RoomDetails */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2 '>
            <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-[#053005] rounded-full'>20% OFF</p>
        </div>

            {/* Room Rating */}
            <div className='flex items-center gap-1 mt-2'>
            <StarRating/>
            <p className='ml-2'>200+ reviews</p>
            </div>

            {/* Room Address  */}
           <div className='flex items-center text-gray-500 gap-1 mt-2'>
              <img src={assets.locationIcon} alt='location-icon' />
                <span>
                    {room.hotel.address}
                </span>
           </div>

           {/* Room images  */}

           <div className='flex flex-col lg:flex-row mt-6 gap-6'>
            <div className='lg:w-1/2 w-full'>
                <img src={mainImage} alt='Room-image' className='w-full rounded-xl shadow-lg object-cover' />
            </div>
            <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                {
                    room?.images.length>1 && room.images.map((image,index)=>(
                        <img onClick={()=>setMainImage(image)}
                        key={index} src={image} alt='room image'
                        className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage=== image && 'outline-3 outline-[#053005]'}`}/>
                    ))
                }
            </div>
           </div>

           {/* Room Highligts  */}
           <div className='mt-8 flex md:justify-between flex-col lg:flex-row'>
            <div>
             <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
              <div className='flex  flex-wrap item-center gap-4 mb-6 mt-4'>
                                 {room.amenities.map((item,index)=>(
                                     <div key={index} className='flex  item-center gap-2 bg-[#f5f5ff]/70 rounded-lg  px-3 py-2  '>
                                         <img src={facilityIcons[item]}  alt={item} className='w-5 h-5'/>
                                         <p className='text-xs font-playfair '>{item}</p>
                                     </div>
                                 ))}
                             </div >
            </div>
            <p className='text-2xl font-medium'>Rs{room.pricePerNight}/night</p>
           </div>
           {/* Checkin checckout form  */}
           
           
               <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>

                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>

                    <div className='flex flex-col'>
                     <label htmlFor="checkindate"  className='font-medium' >Check In</label>
                    <input type="date"  id="checkindate"  className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                    </div>

                    <div class="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

                     <div className='flex flex-col'>
                     <label htmlFor="checkoutdate"  className='font-medium' >Check Out</label>
                    <input type="date"id="checkoutdate"  className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                    </div>
                                 
                     <div class="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

                     <div className='flex flex-col'>
                     <label htmlFor="guests"  className='font-medium' >Guests</label>
                    <input type="number" max={6} min={0} placeholder='0'  id="guests"  className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                    </div>
                
                </div> 

                <button type='submit' className='bg-[#053005] hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
                   Check Availability
                </button>
                </form>      

                {/* Common Specification  */}
                <div className=' mt-25 space-y-4'>
                    {roomCommonData.map((item,index)=>(
                        <div key={index} className='flex items-start gap-2 mt-3'> 
                            <img src={item.icon} className='w-6.5'/>
                            <div>
                                <p className='text-base'>{item.title}</p>
                                <p className='text-gray-500'>{item.description}</p>
                                </div>
                        </div>
                    ))}
                </div>

                <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
                    <p>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
                </div>
                    {/* Hosted by */}

                <div className='flex flex-col items-start gap-4'>
                    <div className='flex gap-4'>
                        <img src={ownerpic} alt='Host' className='h-14 w-14 md:h-18 md:w-18 rounded-full'/>
                        <div>
                            <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}
                                <div className='flex items-center mt-1'>
                                    <StarRating/>
                                    <p className='ml-2'>200+review</p>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>

                <button className='px-6 py-2.5 mt-10 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>Contact now</button>

        </div>
  )
}

export default RoomDetails