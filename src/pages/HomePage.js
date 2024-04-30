import React, { useEffect } from "react";
import "./HomePage.css";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom"; // Import Navigate for navigation

// Component definition
const HomePage = () => {
  // Authentication context
  const { state } = useAuth();
  const { isAuthenticated, user } = state; // Destructure isAuthenticated and user from state

  // useEffect to log state when isAuthenticated changes
  useEffect(() => {
    if (isAuthenticated) {
      console.log(state);
    }
  }, [isAuthenticated, state]);

  // If user is not authenticated or user object is null, Navigate to login page
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }

  // Function to render links for admin user
  const renderAdminLinks = () => (
    <div className="card-container">
      <div className="homepage-card">
        <Link to="/upload" className="homepage-card-link">
          <h3 className="homepage-card-title">Upload Course</h3>
          <p className="homepage-card-description">
            Click here to upload a new course.
          </p>
        </Link>
      </div>
      <div className="homepage-card">
        <Link to="/progress" className="homepage-card-link">
          <h3 className="homepage-card-title">Track Progress</h3>
          <p className="homepage-card-description">
            Track your progress in enrolled courses.
          </p>
        </Link>
      </div>
      <div className="homepage-card">
        <Link to="/discussion" className="homepage-card-link">
          <h3 className="homepage-card-title">Discussion Forums</h3>
          <p className="homepage-card-description">
            Participate in discussion forums.
          </p>
        </Link>
      </div>
    </div>
  );

  // Function to render links for trainer user
  const renderTrainerLinks = () => (
    <div className="card-container">
      <div className="homepage-card">
        <Link to="/upload" className="homepage-card-link">
          <h3 className="homepage-card-title">Upload Course</h3>
          <img
            src={require("../images/upload_course.jpg")}
            alt="Upload Course"
            className="homepage-card-image"
          />

          <p className="homepage-card-description">
            Click here to upload a new course.
          </p>
        </Link>
      </div>
      <div className="homepage-card">
        <Link to="/discussion" className="homepage-card-link">
          <h3 className="homepage-card-title">Discussion Forums</h3>
          <img
            src={require("../images/discussion_forum.jpg")}
            alt="Upload Course"
            className="homepage-card-image"
          />

          <p className="homepage-card-description">
            Participate in discussion forums.
          </p>
        </Link>
      </div>
      <div className="homepage-card">
        <Link to="/trainercourses" className="homepage-card-link">
          <h3 className="homepage-card-title">View Your Courses</h3>
          <img
            src={require("../images/view_courses.png")}
            alt="Upload Course"
            className="homepage-card-image"
          />

          <p className="homepage-card-description">
            View courses you are teaching.
          </p>
        </Link>
      </div>
      <div className="homepage-card">
        <Link to="/trainer-progress-track" className="homepage-card-link">
          <h3 className="homepage-card-title">Track Your Students</h3>
          <img
            src={require("../images/progress.png")}
            alt="Upload Course"
            className="homepage-card-image"
          />

          <p className="homepage-card-description">
            Track the progress of your students.
          </p>
        </Link>
      </div>
      {/* Add more cards for other functionalities */}
    </div>
  );

  // Function to render links for student user
  const renderStudentLinks = () => (
    <div className="card-container">
      <div className="homepage-card view-courses-card">
        <Link to="/courses" className="homepage-card-link">
          <h3 className="homepage-card-title">View Courses And Enroll</h3>
          <img
            src={require("../images/new_course.jpg")}
            alt="Upload Course"
            className="homepage-card-image"
          />
          <p className="homepage-card-description">
            Browse available courses and enroll in them.
          </p>
        </Link>
      </div>
      <div className="homepage-card view-enrolled-courses-card">
        <Link to="/enrollment" className="homepage-card-link">
          <h3 className="homepage-card-title">
            View Courses You Have Enrolled
          </h3>
          <img
            src={require("../images/enrolled.png")}
            alt="Upload Course"
            className="homepage-card-image"
          />
          <p className="homepage-card-description">
            View courses you have already enrolled in.
          </p>
        </Link>
      </div>
      <div className="homepage-card track-progress-card">
        <Link to="/progress" className="homepage-card-link">
          <h3 className="homepage-card-title">Track Your Progress</h3>
          <img
            src={require("../images/track_your_progress.webp")}
            alt="Upload Course"
            className="homepage-card-image"
          />
          <p className="homepage-card-description">
            Track your progress in enrolled courses.
          </p>
        </Link>
      </div>
      <div className="homepage-card discussion-forums-card">
        <Link to="/discussion" className="homepage-card-link">
          <h3 className="homepage-card-title">Discussion Forums</h3>
          <img
            src={require("../images/discussion_forum.jpg")}
            alt="Upload Course"
            className="homepage-card-image"
          />
          <p className="homepage-card-description">
            Participate in discussion forums.
          </p>
        </Link>
      </div>
      {/* Add more cards for other functionalities */}
    </div>
  );

  // Function to render links based on user role
  const renderLinks = () => {
    switch (user.role) {
      case "admin":
        return renderAdminLinks();
      case "trainer":
      case "Trainer":
        return renderTrainerLinks();
      case "student":
      case "Student":
        return renderStudentLinks();
      default:
        return null; // Handle unexpected user roles gracefully
    }
  };

  // JSX return
  return (
    <div className="homepage-container">
      <h2 className="homepage-title">Welcome, {user.firstName}!</h2>
      <p className="homepage-content">
        This is the homepage of our LMS. You can browse courses, track your
        progress, participate in discussions, and more!
      </p>
      <div className="container">{renderLinks()}</div>
    </div>
  );
};

export default HomePage;
