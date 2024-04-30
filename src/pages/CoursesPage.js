import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchCourses,
  fetchEnrollmentsByUserId,
  createEnrollment,
} from "../services/api";
import CourseCard from "../components/CourseCard";
import { Navigate } from "react-router-dom"; // Correct import statement
import "./CoursesPage.css";

// Component definition
const CoursesPage = () => {
  // Authentication context
  const { state } = useAuth();
  const { user, isAuthenticated } = state;

  // State variables
  const [courses, setCourses] = useState([]);
  const [enrollmentCourseIds, setEnrollmentCourseIds] = useState([]);
  const [notification, setNotification] = useState(null); // State for notification

  // Fetch courses data from API
  const fetchCoursesData = async () => {
    try {
      const coursesData = await fetchCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch enrollments data for the current user
  const fetchEnrollmentsData = async () => {
    try {
      if (user && user.uid) {
        const enrollmentsData = await fetchEnrollmentsByUserId(user.uid);
        const enrollmentCourseIdsArray = enrollmentsData.map(
          (enrollment) => enrollment.course.cid
        );
        setEnrollmentCourseIds(enrollmentCourseIdsArray);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch courses and enrollments when authenticated
  if (isAuthenticated && user) {
    fetchCoursesData();
    fetchEnrollmentsData();
  } else {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    try {
      const enrollmentData = {
        uid: user.uid,
        cid: courseId,
      };
      await createEnrollment(enrollmentData);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.cid !== courseId)
      );
      fetchEnrollmentsData();
      setNotification("Course enrolled successfully!"); // Set notification
      setTimeout(() => {
        setNotification(null); // Clear notification after a delay
      }, 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
    }
  };

  // Filter non-enrolled courses
  const nonEnrolledCourses = courses.filter(
    (course) => !enrollmentCourseIds.includes(course.cid)
  );

  // JSX return
  return (
    <div>
      <h1>New Courses</h1>
      {/* Display Non-Enrolled Courses */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {nonEnrolledCourses.map((course) => (
          <CourseCard
            key={course.cid}
            course={course}
            onEnroll={() => handleEnroll(course.cid)}
          />
        ))}
      </div>
      {notification && <div className="notification">{notification}</div>}{" "}
      {/* Display notification */}
    </div>
  );
};

export default CoursesPage;
