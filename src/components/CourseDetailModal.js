import React from 'react';
import './CourseDetailModal.css';
import { Link } from 'react-router-dom';

const CourseDetailModal = ({ course, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{course.courseName}</h2>
          <p>Description: {course.description}</p>
          <p>Duration: {course.durationHours} hours</p>
          <p>Course Code: {course.courseCode}</p>
          <p>Difficulty: {course.difficulty}</p>

          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;
