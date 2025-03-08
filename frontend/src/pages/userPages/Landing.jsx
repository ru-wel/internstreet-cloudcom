import React from 'react'
import Nav from '../Nav'
import Hero from '../Hero'
import Marquee from '../Marquee'
import Benefits from '../Benefits'
import Testimonials from '../Testimonials'
import FeaturedJob from '../FeaturedJob'

function Landing() {
  return (
    <div>
      <Nav></Nav>
      <Hero></Hero>
      <Marquee></Marquee>
      <FeaturedJob></FeaturedJob>
      <Benefits></Benefits>
      <Testimonials></Testimonials>
    </div>
  )
}

export default Landing