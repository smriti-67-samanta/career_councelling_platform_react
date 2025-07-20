import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './features/auth/Login';
import Home from './components/Home';
import Session from './components/Session';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './features/auth/SignUp';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './components/DashBoard';
import Profile from './components/Profile';
import Resources from './components/Resources';
import JobBoard from './components/JobBoard';
import JobApplication from './components/JobApplication';
import CommunityForum from './components/CommunityForum';
import CareerAssessment from './components/CareerAssessment';
import Feedback from './components/FeedBack';
import Query from './components/Query'
import SuccessStories from './components/SuccessStories';
import StoryDetail from './components/StoryDetail';
import CareerSuggestion from './components/CareerSuggestion';



function App() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  console.log('Current user:', user); // Debugging log
  console.log('Current path:', location.pathname); // Debugging log

  // Show navbar on all routes except login/register
  const showNavbar = !['/login', '/register'].includes(location.pathname);
  
  // Show header and footer only when user is logged in
  const showAuthComponents = user !== null;

  return (
    <>
      {showAuthComponents && <Header />}
      {showNavbar && <Navbar />}
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/session" element={<Session />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/jobboard" element={<JobBoard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/job-application/:jobId" element={<JobApplication />} />
          <Route path="/communityforum" element={<CommunityForum />} />
          <Route path="/careerassessment" element={<CareerAssessment />} />
           <Route path="/feedback" element={<Feedback />} />
           
             <Route path="/successstories" element={<SuccessStories />} />
             <Route path="/successstories/:id" element={<StoryDetail />} />
               <Route path="/careersuggestion" element={<CareerSuggestion />} />
                <Route path="/query" element={<Query />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
      {showAuthComponents && <Footer />}
    </>
  );
}

export default App;