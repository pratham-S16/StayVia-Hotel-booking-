import React from 'react'
import Hero from '../components/Hero'
import FeatureDestination from '../components/FeatureDestination'
import ExclusiceOffers from '../components/ExclusiceOffers'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'


function Home() {
  return (
    <>
        <Hero/>
        <FeatureDestination/>
        <ExclusiceOffers/>
        <Testimonial/>
        <Newsletter/>
        {/* <Footer/> */}
    </>
  )
}

export default Home