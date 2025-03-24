import React from 'react'
import { Helmet } from 'react-helmet';
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Benefits from '../components/Benefits'
import Testimonials from '../components/Testimonials'
import FeaturedJob from '../components/FeaturedJob'
import About from '../components/About'
import Footer from '../components/Footer'


function Landing() {
  return (
<div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e2f3ef] via-[#d2eae6] to-[#d5f8f1] shadow-xl">
<Helmet>
        <title>Landing Page | InternStreet</title>
      </Helmet>
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