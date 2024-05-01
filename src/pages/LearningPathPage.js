import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LearningPaths.css";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// Component definition
const LearningPathsPage = ({ courseCode }) => {
  // State variables
  const [numFiles, setNumFiles] = useState(1); // State for number of files
  const [files, setFiles] = useState([]); // State for files
  const [filePreviews, setFilePreviews] = useState([]); // State for file previews
  const [videos, setVideos] = useState([]); // State for videos
  const [videoPreviews, setVideoPreviews] = useState([]); // State for video previews
  const [loading, setLoading] = useState(false); // State for loading status
  const [existingCourses, setExistingCourses] = useState([]); // State for existing courses
  const [uploadSuccess, setUploadSuccess] = useState(false); // State for upload success
  const navigate= useNavigate();
  const auth = useAuth();


  // Fetch existing courses when the component mounts or when courseCode changes
  useEffect(() => {
    const fetchExistingCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/files/${courseCode}`
        );
        setExistingCourses(response.data);
      } catch (error) {
        console.error("Error fetching existing courses:", error);
      }
    };

    fetchExistingCourses();
  }, [courseCode]);

  // Event handler for changing the number of files
  const handleNumFilesChange = (e) => {
    setNumFiles(parseInt(e.target.value));
    setFiles([]);
    setVideos([]);
    setFilePreviews([]);
    setVideoPreviews([]); // Clear video previews when changing the number of files
  };

  console.log("Auth state:", auth);

  if (!auth.state.isAuthenticated) {
    navigate("/"); // Redirect to home page
    return null; // or redirect to login page
  }
  // Event handler for file input change
  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);

    if (e.target.files[0].type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const filePreview = {
          file: e.target.files[0],
          preview: event.target.result,
        };
        const newFilePreviews = [...filePreviews];
        newFilePreviews[index] = filePreview;
        setFilePreviews(newFilePreviews);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Event handler for video input change
  const handleVideoChange = (e, index) => {
    const newVideos = [...videos];
    newVideos[index] = e.target.files[0];
    setVideos(newVideos);

    const reader = new FileReader();
    reader.onload = (event) => {
      const videoPreview = {
        file: e.target.files[0],
        preview: event.target.result,
      };
      const newVideoPreviews = [...videoPreviews];
      newVideoPreviews[index] = videoPreview;
      setVideoPreviews(newVideoPreviews);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Event handler for file upload
  const handleUpload = async () => {
    setLoading(true);

    // Check if all files and videos are available
    if (files.length !== numFiles || videos.length !== numFiles) {
      console.log("Not all files or videos are selected.");
      setLoading(false);
      return;
    }

    // Prepare form data
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    videos.forEach((video) => {
      formData.append("videos", video);
    });
    formData.append("courseCode", courseCode);

    try {
      // Upload files
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate file input elements based on the number of files
  const fileInputs = [];
  const videoInputs = [];
  for (let i = 0; i < numFiles; i++) {
    fileInputs.push(
      <div key={i} className={`file-input file-input-${i}`}>
        <label htmlFor={`fileInput${i}`}>File {i + 1}:</label>
        <input
          type="file"
          id={`fileInput${i}`}
          name={`fileInput${i}`}
          onChange={(e) => handleFileChange(e, i)}
        />
        {filePreviews[i] && (
          <img
            src={filePreviews[i].preview}
            alt={`File ${i + 1}`}
            style={{ maxWidth: "300px" }}
          />
        )}
      </div>
    );
    videoInputs.push(
      <div key={i} className={`file-input file-input-${i}`}>
        <label htmlFor={`videoInput${i}`}>Video {i + 1}:</label>
        <input
          type="file"
          id={`videoInput${i}`}
          name={`videoInput${i}`}
          onChange={(e) => handleVideoChange(e, i)}
        />
        {videoPreviews[i] && (
          <video controls width="300">
            <source src={videoPreviews[i].preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    );
  }

  // JSX return
  return (
    <div className="learning-paths-container">
      <h1>Learning Paths </h1>
      <h2>Course Code: {courseCode}</h2>
      <div className="num-files-container">
        <label htmlFor="numFilesInput">Number of Files:</label>
        <input
          type="number"
          id="numFilesInput"
          value={numFiles}
          min={1}
          onChange={handleNumFilesChange}
        />
      </div>
      <div className="file-inputs-container">
        {fileInputs}
        {videoInputs}
      </div>
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={files.length !== numFiles || numFiles === 0 || loading}
      >
        {loading ? "Uploading..." : "Upload Files"}
      </button>
      {uploadSuccess && (
        <div className="success-message">Learning path added successfully!</div>
      )}
      <h2>Already Present Courses</h2>
      <ul className="existing-courses-list">
        {existingCourses.map((course, index) => (
          <li
            key={index}
            className={`existing-course existing-course-${index}`}
          >
            {course}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningPathsPage;
