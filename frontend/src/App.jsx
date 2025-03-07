import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/userPages/Home';
import JobListing from './pages/userPages/JobListing';
import Jobs from './pages/adminPages/Jobs';
import Login from './pages/userPages/Login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-listing" element={<JobListing/>} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
