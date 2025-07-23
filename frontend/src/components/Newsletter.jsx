import React from 'react'

const Newsletter = () => {
  return (
    <div className='bg-[#053005]  flex flex-col items-center justify-center m-20 rounded-3xl text-center  px-6 md:px-16 lg:px-24 xl:px-32 py-20 text-white'>
        <h1 className='font-playfair  text-4xl'>Stay Inspired</h1>
        <p className='text-sm  md:text-base font-playfair text-gray-300 mt-2'>Subscribe to our newsletter for exclusive offers, travel tips, and the latest updates from StayVia.</p>
        <form className='flex flex-col md:flex-row items-center justify-center gap-4 mt-6'>
            <input type='email' placeholder='Enter your email' className='px-4 py-2 rounded-full border w-full md:w-80 text-white' required />
            <button type='submit' className='bg-green-600 hover:bg-green-700 px-6 py-2 transition-all cursor-pointer'>Subscribe</button>  
        </form>
        <p className='text-xs  font-playfair text-gray-400 mt-4'>We respect your privacy. Unsubscribe at any time.</p>

    </div>
  )
}

export default Newsletter