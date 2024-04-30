import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccessTheCoursesPage.css'; 
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const AccessTheCoursesPage = ({ courseCode }) => {
  // Access authentication state and navigation
  const { state } = useAuth();
  const { isAuthenticated } = state;
  const navigate = useNavigate();
  
  // State for files and loading status
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to retrieve files for a specific course
  const handleRetrieveFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/files/${courseCode}`);
      setFiles(response.data);
    } catch (error) {
      console.error('Error retrieving files:', error);
      // Handle error, e.g., show error message to user
    } finally {
      setLoading(false);
    }
  };

  // Function to download a file
  const handleDownloadFile = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/download/${fileName}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
      // Handle error, e.g., show error message to user
    }
  };

  // Effect to handle authentication and file retrieval
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      handleRetrieveFiles();
    }
  }, [courseCode, isAuthenticated, navigate]);

  // Render the component
  return (
    <div className="access-courses-container">
      <h1>Retrieve Files by Course</h1>
      <div className="course-info">
        <p>Course Code: {courseCode}</p>
      </div>
      <button className="retrieve-files-btn" onClick={handleRetrieveFiles}>
        Retrieve Files
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {files.length > 0 ? (
            <div>
              <h2>Files for Course {courseCode}</h2>
              <ul className="file-list">
                {files.map((file, index) => (
                  <li key={index} className="file-item">
                    {file}
                    <button className="download-btn" onClick={() => handleDownloadFile(file)}>
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-files-msg">No files found for course {courseCode}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessTheCoursesPage;
