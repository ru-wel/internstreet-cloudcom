import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/userPages/Home';
import JobListing from './pages/userPages/JobListing';
import Login from './pages/userPages/Login';
import Register from './pages/userPages/Register';
import AdminJobs from './pages/adminPages/AdminJobs';
import AdminUsers from './pages/adminPages/AdminUsers';
import AdminLogs from './pages/adminPages/AdminLogs';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/job-listing" element={<JobListing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin-jobs" element={<AdminJobs/>} />
        <Route path="/admin-users" element={<AdminUsers/>} />
        <Route path="/admin-logs" element={<AdminLogs/>} />
      </Routes>
    </Router>
  )
}

export default App
