import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import {
  fetchEnrolledStudentsByCourseId,
  fetchCourseById,
} from "../services/api"; 
import "./TrackProgressPage.css"; 

const TrackProgressPage = () => {
  const { cid } = useParams(); 
  const [courseName, setCourseName] = useState(""); 
  const [enrolledStudents, setEnrolledStudents] = useState([]); 
  const [sortedStudents, setSortedStudents] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortBy, setSortBy] = useState("enrollmentDate"); 
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

  useEffect(() => {
    fetchCourseName(cid);
    fetchEnrolledStudentsData(cid);
  }, [cid]);

  useEffect(() => {
    sortStudents();
  }, [enrolledStudents, sortBy, sortOrder]); // Include sortOrder in useEffect dependencies

  const fetchCourseName = async (courseId) => {
    try {
      const course = await fetchCourseById(courseId);
      setCourseName(course.courseName);
    } catch (error) {
      console.error("Error fetching course details:", error.message);
    }
  };

  const fetchEnrolledStudentsData = async (courseId) => {
    try {
      const students = await fetchEnrolledStudentsByCourseId(courseId);
      setEnrolledStudents(students);
    } catch (error) {
      console.error("Error fetching enrolled students:", error.message);
    }
  };

  const sortStudents = () => {
    const sorted = [...enrolledStudents].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "region" || sortBy === "name") {
        const nameA = sortBy === "name" ? `${a.user.firstName} ${a.user.lastName}` : a.user.region;
        const nameB = sortBy === "name" ? `${b.user.firstName} ${b.user.lastName}` : b.user.region;
        comparison = nameA.localeCompare(nameB);
      } else if (sortBy === "enrollmentDate" || sortBy === "enrollmentTime") {
        const dateA = new Date(a.enrollmentDate);
        const dateB = new Date(b.enrollmentDate);
        comparison = dateA - dateB;
        if (sortBy === "enrollmentTime") {
          comparison = dateA.getTime() - dateB.getTime();
        }
      }
      return sortOrder === "asc" ? comparison : -comparison; // Apply sortOrder
    });
    setSortedStudents(sorted);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = sortedStudents.filter((student) => {
    return (
      student.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
          <option value="enrollmentTime">Sort by Enrollment Time</option>
          <option value="name">Sort by Name</option>
          <option value="region">Sort by Region</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "▲" : "▼"} {/* Symbol for sorting order */}
        </button>
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

export default TrackProgressPage;
