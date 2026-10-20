import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import Landing from './pages/userPages/Landing';
import JobListing from './pages/userPages/JobListing';
import Login from './pages/userPages/Login';
import Logout from './pages/userPages/Logout';
import Register from './pages/userPages/Register';
// Admin pages (and their chart library) load only when an admin opens them
const Dashboard = lazy(() => import('./pages/adminPages/Dashboard'));
const AdminAnalytics = lazy(() => import('./pages/adminPages/AdminAnalytics'));
const AdminJobs = lazy(() => import('./pages/adminPages/AdminJobs'));
const AdminUsers = lazy(() => import('./pages/adminPages/AdminUsers'));
const AdminLogs = lazy(() => import('./pages/adminPages/AdminLogs'));
const AdminDashboard = lazy(() => import('./pages/adminPages/AdminApplications'));
import Job from './pages/userPages/Job';
import Profile from './pages/userPages/UserProfile';
import { UserWrapper, AdminWrapper, GuestWrapper } from './auth/authentication';
import AboutPage from './pages/userPages/AboutPage';
import Application from './pages/userPages/Application';

const AppContent = () => {

  return (
    <Suspense fallback={<div role="status" className="flex justify-center items-center h-screen">Loading…</div>}>
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
          {/* Dashboard is the sidebar layout; each section has its own URL */}
          <Route element={<Dashboard />}>
            <Route path="/admin-dashboard" element={<AdminAnalytics />} />
            <Route path="/admin-applications" element={<AdminDashboard />} />
            <Route path="/admin-users" element={<AdminUsers />} />
            <Route path="/admin-jobs" element={<AdminJobs />} />
            <Route path="/admin-logs" element={<AdminLogs />} />
          </Route>
        </Route>
      </Route>
    </Routes>
    </Suspense>
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
