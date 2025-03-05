import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/userPages/Home';
JobListing
import './App.css';
import JobListing from './pages/userPages/JobListing';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-listing" element={<JobListing/>} />
      </Routes>
    </Router>
  )
}

export default App
