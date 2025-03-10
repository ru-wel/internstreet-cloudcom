import React from 'react'
import { Helmet } from 'react-helmet';
import MoreAbout from '../components/MoreAbout'
import Nav from '../components/Nav'
import MeetTheTeam from '../components/MeetTheTeam'
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div>
        <Helmet>
          <title>About Us | InternStreet</title>
        </Helmet>
        <Nav></Nav>
        <MoreAbout></MoreAbout>
        <MeetTheTeam></MeetTheTeam>
        <Footer></Footer>
    </div>
  )
}

export default AboutPage