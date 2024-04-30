import React, { useState } from "react";
import "./UploadCoursePage.css"; // Import CSS file
import { useAuth } from "../context/AuthContext"; // Import useAuth from AuthContext
import axios from "axios";

const UploadCoursePage = () => {
  const { state } = useAuth(); // Get authentication state from AuthContext
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    difficulty: "",
    durationHours: "",
  });
  const [uploadSuccess, setUploadSuccess] = useState(false); // State to track upload success

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload (if needed)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Handle file upload logic here if required
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Generate course code based on course name
      const courseCode = formData.courseName
        .replace(/\s+/g, "")
        .toUpperCase()
        .substring(0, 4);

      // Prepare data to send to the server
      const formDataToSend = {
        uid: state.user.uid,
        courseName: formData.courseName,
        description: formData.description,
        durationHours: formData.durationHours,
        courseCode: courseCode,
        difficulty: formData.difficulty,
      };

      // Log form data before sending
      console.log("Form Data to Send:", formDataToSend);

      // Send data to the server
      await axios.post("http://localhost:8080/uploaded-courses", formDataToSend);
      
      // Update upload success state and provide feedback
      setUploadSuccess(true);
      window.alert("Course uploaded successfully!"); // Alert for successful upload
      console.log("Upload successful:", uploadSuccess); // Log upload success
    } catch (error) {
      console.error("Error uploading course:", error);
    }
  };

  // Handle submit button click
  const handleButtonClick = () => {
    console.log("Submit button clicked"); // Log button click
    handleSubmit(); // Call handleSubmit function
  };

  // JSX return
  return (
    <div className="upload-course-page-container">
      <div className="upload-course-form-container">
        <h2>Upload New Course</h2>
        <form className="upload-course-page-form">
          {/* Input fields for course information */}
          <div className="upload-course-page-form-group">
            <label htmlFor="courseName" className="upload-course-page-label">
              Course Name:
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="upload-course-page-input"
            />
          </div>
          {/* Description textarea */}
          <div className="upload-course-page-form-group">
            <label htmlFor="description" className="upload-course-page-label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="upload-course-page-textarea"
            ></textarea>
          </div>
          {/* Select dropdown for difficulty level */}
          <div className="upload-course-page-form-group">
            <label htmlFor="difficulty" className="upload-course-page-label">
              Difficulty:
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="upload-course-page-select"
            >
              <option value="">Select difficulty level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          {/* Input field for duration in hours */}
          <div className="upload-course-page-form-group">
            <label htmlFor="durationHours" className="upload-course-page-label">
              Duration Hours:
            </label>
            <input
              type="number"
              id="durationHours"
              name="durationHours"
              value={formData.durationHours}
              onChange={handleChange}
              className="upload-course-page-input"
            />
          </div>
          {/* Button to submit the form */}
          <button
            type="button"
            onClick={handleButtonClick}
            className="upload-course-page-button"
          >
            Submit
          </button>
        </form>
        {/* Show upload success message if upload is successful */}
        {uploadSuccess && (
          <p className="upload-success-message">
            Course uploaded successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadCoursePage;
