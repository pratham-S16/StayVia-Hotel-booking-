import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'
import Footer from '../components/Footer'

const CheckBox= ({label, selected=false, onChange=()=>{}}) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type='checkbox' checked={selected} onChange={(e)=>onChange(e.target.checked, label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton= ({label, selected=false, onChange=()=>{}}) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type='radio' name='sortOption' checked={selected} onChange={()=>onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}


const Allrooms = () => {
    const navigate= useNavigate();
    const [openFilter, setOpenFilter] = useState(false);

    const roomTypes=[
        "Single Bed",
        "Double Bed",
        "Luxury Room",
        "Family Suite"
    ];

    const priceRanges=[
        '0 to 1000',
        '1000 to 3000',
        '3000 to 5000',
        '5000 to 10000',
    ]

    const sortOptions=[
        'Price Low to High',
        'Price High to Low',
        'Newest First',
    ]

  return (
    <div className='flex flex-col-reverse lg:flex-row  items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24'>
        <div className='flex flex-col items-start text-left'>
            <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
            <p className='text-sm md:text-base text-gray-500/90 max-w-174  mt-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, iusto explicabo cumque dignissimos beatae repellat.</p>

        <div className='mt-3 '>
            {roomsDummyData.map((room)=>(
                <div className='mt-10 mb-10 flex flex-col border-b border-gray-300 last:pb-10 last:border-0  md:flex-row  lg:flex-row gap-6'>
                <img onClick={()=>{navigate(`/rooms/${room._id}`); window.scrollTo(0,0)}}
                 src={room.images[0]} alt='hotel-image' title='View Room Details' className='max-h-56  md:w-1/2  rounded-xl shadow-lg object-cover cursor-pointer' />
                 <div className='flex flex-col gap-3 '>
                  <p className='text-gray-500'>{room.hotel.city}</p>
                  <p onClick={()=>{navigate(`/rooms/${room._id}`); window.scrollTo(0,0)}}
                  className='text-gray-900 text-3xl font-playfair cursor-pointer'>{room.hotel.name}</p>
                  <div className='flex items-center '>
                    <StarRating/>
                    <p className='ml-2'>200+ reviews</p>
                  </div>
                <div className='flex items-center gap-2 mt-2 text-gray-500 text-sm'>
                    <img src={assets.locationIcon} alt='location-icon' />
                    <span>
                        {room.hotel.address}
                    </span>
                </div>
                {/* ammeneties */} <div className='flex  flex-wrap item-center gap-2 mt-4'>
                    {room.amenities.map((item)=>(
                        <div className='flex  item-center gap-2 bg-[#f5f5ff]/70 rounded-lg  px-3 py-2  '>
                            <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                            <p className='text-xs font-playfair '>{item}</p>
                        </div>
                    ))}
                </div >
                    {/* Room price */}
                    <p className='text-gray-700 ml-4 mb-10  text-xl font-medium mt-4'>
                        Rs {room.pricePerNight}/night
                    </p>
                    
                </div>
                
                </div>
                
            ))}
            
            
        </div >
        </div>
        {/* filters */}
        <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
            <div className={`flex items-center justify-between px-5 py-2.5  min-lg:border-b  border-gray-300 ${openFilter && "border-b" }`}>
                <p className='text-base font-medium text-gray-800'>FILTERS</p>
                <div className='text-xs cursor-pointer'>
                    <span onClick={()=> setOpenFilter(!openFilter)} className='lg:hidden'>{openFilter? 'HIDE' : 'SHOW'}</span>
                    <span className='hidden lg:block'> CLEAR</span>
                </div>
            </div>
            <div className={`${openFilter? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700 `}> 
                <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
                     {roomTypes.map((room,index)=>(
                        <CheckBox key={index} label={room}/>
                     ))}
                </div>
                <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Price Range </p>
                     {priceRanges.map((range,index)=>(
                        <CheckBox key={index} label={`${range}`}/>
                     ))}
                </div>

                 <div className='px-5 pt-5 pb-7'>
                    <p className='font-medium text-gray-800 pb-2'>Sort By  </p>
                     {sortOptions.map((option,index)=>(
                       <RadioButton key={index} label={option} onChange={(value)=>console.log(value)} />
                     ))}
                </div>

            </div>

        </div>
       

       

    </div>
  )
}

export default Allrooms;