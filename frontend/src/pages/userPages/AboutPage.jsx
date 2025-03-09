import React from 'react'
import { Helmet } from 'react-helmet';
import MoreAbout from '../components/MoreAbout'
import Nav from '../components/Nav'
import MeetTheTeam from '../components/MeetTheTeam'

const AboutPage = () => {
  return (
    <div>
        <Helmet>
          <title>About Us | InternStreet</title>
        </Helmet>
        <Nav></Nav>
        <MoreAbout></MoreAbout>
        <MeetTheTeam></MeetTheTeam>
    </div>
  )
}

export default AboutPage