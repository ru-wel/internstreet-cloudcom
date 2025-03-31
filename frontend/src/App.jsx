import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Landing from './pages/userPages/Landing';
import JobListing from './pages/userPages/JobListing';
import Login from './pages/userPages/Login';
import Logout from './pages/userPages/Logout';
import Register from './pages/userPages/Register';
import Dashboard from './pages/adminPages/Dashboard';
import AdminJobs from './pages/adminPages/AdminJobs';
import AdminUsers from './pages/adminPages/AdminUsers';
import AdminLogs from './pages/adminPages/AdminLogs';
import AdminDashboard from './pages/adminPages/AdminApplications';
import Job from './pages/userPages/Job';
import Profile from './pages/userPages/UserProfile';
import { UserWrapper, AdminWrapper, GuestWrapper } from './auth/authentication';
import AboutPage from './pages/userPages/AboutPage';
import Application from './pages/userPages/Application';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    const detectBrowser = async () => {
      try {
        await axios.get(import.meta.env.VITE_API_URL + '/utils/detect-browser');
      } catch (error) {
        console.error("Error detecting browser:", error);
      }
    };

    detectBrowser();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/" element={<JobListing />} />
      <Route path='/job/:jId' element={<Job />} />

      <Route element={<GuestWrapper />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<UserWrapper />}>
        <Route path='/apply' element={<Application />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />

        <Route element={<AdminWrapper />}> 
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/admin-jobs" element={<AdminJobs />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-logs" element={<AdminLogs />} />
          <Route path="/admin-applications" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
