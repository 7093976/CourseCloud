import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate for redirection
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { EnrollmentService } from "../services/api"; // Import EnrollmentService for fetching enrollments
import "./ProgressPage.css"; // Import CSS file for styling

// ProgressPage component definition
const ProgressPage = () => {
  // State variables
  const { state } = useAuth(); // Destructure state from useAuth hook
  const [enrollments, setEnrollments] = useState([]); // State for enrollments
  const { isAuthenticated, user } = state; // Destructure isAuthenticated and user from state

  // Function to fetch enrollments
  const fetchEnrollments = async () => {
    try {
      const data = await EnrollmentService.getEnrolledCoursesByUserId(user.uid); // Fetch enrollments data
      setEnrollments(data); // Set enrollments state
    } catch (error) {
      console.error(error); // Log error to console if fetching enrollments fails
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchEnrollments(); // Fetch enrollments when the component mounts
    }
  }, [isAuthenticated, user]);

  // Redirect to login page if not authenticated or user is not available
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }

  // JSX return
  return (
    <div className="progress-page">
      <h1 className="progress-page__title">Your Progress</h1>

      {/* Render progress for each enrolled course */}
      {enrollments.map((enrollment) => (
        <div key={enrollment.courseId} className="progress-page__course">
          <h3 className="progress-page__course-title">
            {enrollment.courseName}
          </h3>
          <div className="progress-page__details">
            <div className="progress-page__duration">
              Total Duration: {enrollment.durationHours} hours
            </div>
            <div className="progress-page__completed-duration">
              Completed Duration: {enrollment.completedDuration} hours
            </div>
            <div className="progress-page__progress">
              Progress:{" "}
              {(
                (enrollment.completedDuration / enrollment.durationHours) * 100
              ).toFixed(2)}
              %
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{
                    width: `${
                      (enrollment.completedDuration /
                        enrollment.durationHours) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressPage; // Export ProgressPage component
