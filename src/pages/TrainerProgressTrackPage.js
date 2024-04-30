import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { fetchCoursesByTrainerId } from "../services/api"; // Import API function to fetch courses
import { Link, useParams, Navigate } from "react-router-dom"; // Import Link, useParams, and Navigate
import "./TrainerProgressTrackPage.css"; // Import CSS file for styling

const TrainerProgressTrackPage = () => {
  const { state } = useAuth(); // Get authentication state from useAuth hook
  const { courseId } = useParams(); // Get courseId parameter from URL
  const [trainerCourses, setTrainerCourses] = useState([]); // State for storing trainer courses
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error message

  useEffect(() => {
    const fetchTrainerCoursesData = async (trainerId) => {
      try {
        const courses = await fetchCoursesByTrainerId(trainerId); // Fetch courses using API function
        setTrainerCourses(courses); // Set fetched courses in state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching trainer courses:", error.message); // Log error message
        setError("Error fetching trainer courses. Please try again."); // Set error message in state
        setLoading(false); // Set loading to false when error occurs
      }
    };

    // Fetch trainer courses when user is authenticated and user id is available
    if (state.user && state.user.uid) {
      fetchTrainerCoursesData(state.user.uid); // Call function to fetch trainer courses
    }
  }, [state]); // Dependency array ensures useEffect runs only when state changes

  // Redirect to login page if user is not authenticated
  if (!state.isAuthenticated || !state.user || !state.user.uid) {
    return <Navigate to="/" />; // Redirect to login page
  }

  // JSX return
  return (
    <div className="trainer-progress-track-container">
      <h1 className="page-title">Trainer Progress Track</h1>
      {loading && <p>Loading...</p>} {/* Show loading message if data is being fetched */}
      {error && <p className="error-message">{error}</p>} {/* Show error message if error occurs */}
      <div className="course-list">
        {trainerCourses.map((course) => (
          <div className="progress-card" key={course.id}>
            <h3>{course.courseName}</h3>
            <p>Description: {course.description}</p>
            {/* Link to track progress page for each course */}
            <Link to={`/track-progress-page/${course.course.cid}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
      {/* Show message if no courses are found */}
      {trainerCourses.length === 0 && !loading && !error && (
        <p>No courses found for this trainer.</p>
      )}
    </div>
  );
};

export default TrainerProgressTrackPage; // Export TrainerProgressTrackPage component
