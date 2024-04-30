// CourseCard.js

import React from "react";
import "./CourseCard.css";

const CourseCard = ({ course, onEnroll }) => {
  return (
    <div className="course-card-container">
      {" "}
      {/* Updated class name */}
      <div className="course-card-content">
        <h3 className="course-title">{course.courseName}</h3>
        <p className="course-description">{course.description}</p>
        <button className="enroll-button" onClick={onEnroll}>
          Enroll
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
