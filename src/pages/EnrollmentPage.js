import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EnrollmentService } from "../services/api";
import "./EnrollmentPage.css";

// Component definition
const EnrollmentPage = ({ handleCourseCode }) => {
  // Authentication context
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  // State variable for enrollments
  const [enrollments, setEnrollments] = useState([]);

  // Fetch enrollments when the component mounts or when isAuthenticated or user changes
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        if (user) {
          const data = await EnrollmentService.getEnrolledCoursesByUserId(user.uid);
          setEnrollments(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Check authentication status and fetch enrollments
    if (!user) {
      return <Navigate to="/" />;
    }

    // Fetch enrollments when the component renders
    fetchEnrollments();
  }, [isAuthenticated, user]);

  // Function to handle accessing courses
  const handleAccessCourses = (courseCode) => {
    // Call the handleCourseCode function passed from App.js
    handleCourseCode(courseCode);
  };

  // JSX return
  return (
    <div className="enrollment-page">
      <h2 className="enrollment-page__title">Enrollments</h2>
      <div className="enrollment-page__cards">
        {enrollments.map((enrollment) => (
          <div key={enrollment.eid} className="enrollment-page__card">
            <h3 className="enrollment-page__card-title">
              {enrollment.courseName}
            </h3>
            <p>
              <strong>Course Code:</strong> {enrollment.courseCode}
            </p>
            <p>
              <strong>Duration:</strong> {enrollment.durationHours} hours
            </p>
            <p>
              <strong>Region:</strong> {enrollment.region}
            </p>
            <p>
              <strong>Enrollment Date:</strong>{" "}
              {new Date(enrollment.enrollmentDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Completed Duration:</strong>{" "}
              {enrollment.completedDuration}
            </p>
            {/* Link to AccessTheCoursesPage */}
            <Link
              to="/accessthecoursespage"
              onClick={() => handleAccessCourses(enrollment.courseCode)}
            >
              Access the Courses
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollmentPage;
