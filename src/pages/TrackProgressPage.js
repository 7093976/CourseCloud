import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams for accessing URL parameters
import {
  fetchEnrolledStudentsByCourseId,
  fetchCourseById,
} from "../services/api"; // Import API functions for fetching data
import "./TrackProgressPage.css"; // Import CSS file for styling

const TrackProgressPage = () => {
  const { cid } = useParams(); // Get the cid parameter from the URL
  const [courseName, setCourseName] = useState(""); // State for storing course name
  const [enrolledStudents, setEnrolledStudents] = useState([]); // State for storing enrolled students data
  const [sortedStudents, setSortedStudents] = useState([]); // State for storing sorted students data
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortBy, setSortBy] = useState("enrollmentDate"); // State for sorting criteria (default: enrollmentDate)

  // Fetch course name and enrolled students data when cid changes
  useEffect(() => {
    fetchCourseName(cid);
    fetchEnrolledStudentsData(cid);
  }, [cid]);

  // Sort students whenever enrolledStudents or sortBy changes
  useEffect(() => {
    sortStudents();
  }, [enrolledStudents, sortBy]);

  // Function to fetch course name by courseId
  const fetchCourseName = async (courseId) => {
    try {
      const course = await fetchCourseById(courseId);
      setCourseName(course.courseName);
    } catch (error) {
      console.error("Error fetching course details:", error.message);
    }
  };

  // Function to fetch enrolled students data by courseId
  const fetchEnrolledStudentsData = async (courseId) => {
    try {
      const students = await fetchEnrolledStudentsByCourseId(courseId);
      setEnrolledStudents(students);
    } catch (error) {
      console.error("Error fetching enrolled students:", error.message);
    }
  };

  // Function to sort students based on sortBy criteria
  const sortStudents = () => {
    const sorted = [...enrolledStudents].sort((a, b) => {
      if (sortBy === "region") {
        return a.user.region.localeCompare(b.user.region);
      } else if (sortBy === "enrollmentDate") {
        return new Date(a.enrollmentDate) - new Date(b.enrollmentDate);
      } else {
        // Handle sorting by other criteria if needed
        return 0;
      }
    });
    setSortedStudents(sorted);
  };

  // Function to handle search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter students based on search term
  const filteredStudents = sortedStudents.filter((student) => {
    return (
      student.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // JSX return
  return (
    <div className="track-progress">
      <h1>Enrolled Students for "{courseName}"</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="enrollmentDate">Sort by Enrollment Date</option>
          <option value="region">Sort by Region</option>
          {/* Add more options for sorting if needed */}
        </select>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th className="id-column">ID</th>
            <th className="name-column">Name</th>
            <th className="email-column">Email</th>
            <th className="region-column">Region</th>
            <th className="enrollment-column">Enrollment Date</th>
            <th className="id-column">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.eid} className="student-row">
              <td className="id-cell">{student.user.uid}</td>
              <td className="name-cell">{`${student.user.firstName} ${student.user.lastName}`}</td>
              <td className="email-cell">{student.user.email}</td>
              <td className="region-cell">{student.user.region}</td>
              <td className="enrollment-cell">
                {new Date(student.enrollmentDate).toLocaleDateString()}
              </td>
              <td className="id-column">Enrolled ✔️</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackProgressPage; // Export TrackProgressPage component
