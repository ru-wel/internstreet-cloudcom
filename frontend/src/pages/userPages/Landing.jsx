import React from 'react'
import Nav from '../Nav'
import Hero from '../Hero'
import Marquee from '../Marquee'
import Benefits from '../Benefits'
import Testimonials from '../Testimonials'
import FeaturedJob from '../FeaturedJob'
import About from '../About'
import Footer from '../Footer'


function Landing() {
  return (
    <div>
      <Nav></Nav>
      <Hero></Hero>
      <Marquee></Marquee>
      <FeaturedJob></FeaturedJob>
      <About></About>
      <Benefits></Benefits>
      <Testimonials></Testimonials>
      <Footer></Footer>
    </div>
  )
}

export default Landing