import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/userPages/Home';
import './App.css';
import JobListing from './pages/userPages/JobListing';
import Jobs from './pages/adminPages/Jobs';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-listing" element={<JobListing/>} />
        <Route path="/jobs" element={<Jobs/>} />
      </Routes>
    </Router>
  )
}

export default App
