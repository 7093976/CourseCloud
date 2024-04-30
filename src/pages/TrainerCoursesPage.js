import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { fetchCoursesByTrainerId } from "../services/api"; // Import API function
import { Link } from "react-router-dom"; // Import Link for navigation
import "./TrainerCoursePage.css"; // Import CSS file for styling
import { Navigate } from "react-router-dom"; // Import Navigate for redirection

const TrainerCoursePage = ({ setCourseCode }) => {
  // Receive setCourseCode as a prop
  const { state } = useAuth(); // Destructure state object from useAuth hook
  const [trainerCourses, setTrainerCourses] = useState([]); // State for storing trainer courses
  const [selectedCourse, setSelectedCourse] = useState(null); // State for storing selected course
  const { user, isAuthenticated } = state; // Destructure user and isAuthenticated from state

  // Fetch trainer courses when user is authenticated and user id is available
  useEffect(() => {
    if (isAuthenticated && user && user.uid) {
      console.log("Fetching trainer courses...");
      fetchTrainerCourses(user.uid); // Call function to fetch trainer courses
    }
  }, [isAuthenticated, user]);

  // Function to fetch trainer courses by trainer id
  const fetchTrainerCourses = async (trainerId) => {
    try {
      const courses = await fetchCoursesByTrainerId(trainerId); // Fetch courses using API function
      console.log("Fetched trainer courses:", courses);
      setTrainerCourses(courses); // Set trainer courses in state
    } catch (error) {
      console.error("Error fetching trainer courses:", error.message);
    }
  };

  // Function to handle selecting a course and updating the course code
  const handleCourseDetails = (courseCode) => {
    setCourseCode(courseCode); // Update the courseCode state in App.js
  };

  // Function to close the modal for course details
  const handleCloseModal = () => {
    setSelectedCourse(null); // Clear selected course
  };

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />; // Redirect to login page
  }

  // JSX return
  return (
    <div className="trainer-course-container">
      <h1>Trainer Courses</h1>
      <div className="course-list">
        {trainerCourses.map((course, index) => (
          <div key={course.id} className={`course-card course-card-${index}`}>
            <h2>{course.courseName}</h2>
            <p>{course.description}</p>
            {/* Use Link component to navigate to /learningpaths with courseCode */}
            <Link
              to="/learningpaths"
              onClick={() => handleCourseDetails(course.courseCode)}
            >
              Add Learning Paths
            </Link>
          </div>
        ))}
      </div>
      {/* Create Learning Path button */}
    </div>
  );
};

export default TrainerCoursePage; // Export TrainerCoursePage component
