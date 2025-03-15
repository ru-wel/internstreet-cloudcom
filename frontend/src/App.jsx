import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Job from './pages/userPages/Job';
import Profile from './pages/userPages/UserProfile';
import { UserWrapper, AdminWrapper, GuestWrapper } from './auth/authentication';
import AboutPage from './pages/userPages/AboutPage';
import Application from './pages/userPages/Application';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/landing" element={< Landing />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<JobListing/>} />
        <Route path='/job/:jId' element={<Job/>} />
        <Route path='/apply' element={<Application/>} />

        <Route element={<GuestWrapper/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Route>

        <Route element={<UserWrapper/>}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/logout" element={<Logout/>}/>

          <Route element={<AdminWrapper/>}> { /* TO BE TESTED */ }
            <Route path="/admin-dashboard" element={<Dashboard/>} />
            <Route path="/admin-jobs" element={<AdminJobs/>} />
            <Route path="/admin-users" element={<AdminUsers/>} />
            <Route path="/admin-logs" element={<AdminLogs/>} />
          </Route>
        </Route>

      </Routes>

    </Router>
  )
}

export default App
