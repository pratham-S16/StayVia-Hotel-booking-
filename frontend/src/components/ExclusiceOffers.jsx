import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiceOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24  py-6 m-4 '>
        <div className='flex flex-col md:flex-row justify-between items-center w-full '>
            <Title align='left' title='Exclusive Offers'  subtitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories." />
            <button className=' flex items-center gap-2 px-4 py-2 text-sm font-medium  transition-all cursor-pointer'>
                View All Offers
                <img src={assets.arrowIcon} alt='arrow icon'
                className='group hover:translate-x-1 transition-all'/>
            </button>
        </div>

        <div className='flex flex-wrap justify-center items-center gap-6 mt-20 mb-20'>
            {exclusiveOffers.map((item)=>(
                <div key={item.id} className='group h-64 w-72  relative flex flex-col pt-16 gap-0.5  md:pt-16 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center ' style={{backgroundImage: `url(${item.image})`}}>
                    <p className=' py-1 px-3 rounded-full text-xs absolute top-4 left-3 text-black bg-white/80 '>{item.priceOff}% OFF</p>
                    <p className='font-playfair font-medium text-2xl text-white'>{item.title}</p>
                    <p className='font-playfair text-gray-100 '>{item.description}</p>
                    <p className='text-xs text-gray-300 mt-2'>Expires { item.expiryDate}</p>

                    <button className=' absolute bottom-2 flex items-center gap-2  py-3 text-sm font-medium  transition-all cursor-pointer'>
                View Offer
                <img src={assets.arrowIcon} alt='arrow icon'
                className=' invert-100  group-hover:translate-x-1 transition-all'/>
            </button>

                </div>
            


            ))}
        </div>


        
    </div>
  )
}

export default ExclusiceOffers