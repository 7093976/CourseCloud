import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ProgressPage from './pages/ProgressPage';
import DiscussionPage from './pages/DiscussionPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import UploadCoursePage from './pages/UploadCoursePage';
import EnrollmentPage from './pages/EnrollmentPage';
import { AuthProvider } from './context/AuthContext';
import TrainerCoursesPage from './pages/TrainerCoursesPage';
import TrainerProgressTrackPage from './pages/TrainerProgressTrackPage';
import TrackProgressPage from './pages/TrackProgressPage';
import LearningPathsPage from './pages/LearningPathPage';
import AccessTheCoursesPage from './pages/AccessTheCoursesPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [courseCode, setCourseCode] = useState(null);
  const [courseCodeForAccess, setCourseCodeForAccess] = useState(null);
  const clientId = "696683235688-kejvkrvs55ukqhra8576fl9k5gc4be7i.apps.googleusercontent.com";


  // Function to handle courseCode from EnrollmentPage
  const handleCourseCode = (newCourseCode) => {
    console.log('Course Code received in App.js:', newCourseCode);
    setCourseCodeForAccess(newCourseCode);
  };


  return (
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/enrollment" element={<EnrollmentPage handleCourseCode={handleCourseCode} />} />
            <Route path="/trainercourses" element={<TrainerCoursesPage setCourseCode={setCourseCode} />} />
            <Route path="/trainer-progress-track"
              element={<TrainerProgressTrackPage />} // Pass setProp function to TrackProgressPage
            />            
            <Route path="/track-progress-page/:cid" element={<TrackProgressPage />} />


            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/discussion" element={<DiscussionPage />} />
            <Route path="/upload" element={<UploadCoursePage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/learningpaths" element={<LearningPathsPage courseCode={courseCode} />} />
            <Route path="/accessthecoursespage" element={<AccessTheCoursesPage courseCode={courseCodeForAccess} />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
