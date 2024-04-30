import axios from "axios";

// Replace baseURL with your backend server URL
const baseURL = "http://localhost:8080";

// Create an instance of axios with the base URL and default headers
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Courses Endpoints

// Fetch course by ID
export const fetchCourseById = async (cid) => {
  try {
    const response = await api.get(`/api/courses/${cid}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching course by ID: ${error.message}`);
  }
};

// Fetch courses
export const fetchCourses = async () => {
  try {
    const response = await api.get("/api/courses");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching courses: " + error.message);
  }
};

// Fetch enrollments by user ID
export const fetchEnrollmentsByUserId = async (userId) => {
  try {
    const response = await api.get(`/enrollments/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching enrollments: " + error.message);
  }
};

// Enrollment Service

//Creates an enrollment
export const createEnrollment = async (enrollmentData) => {
  try {
    const response = await api.post("/enrollments", enrollmentData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating enrollment: " + error.message);
  }
};
// Get enrolled courses by user ID
export const EnrollmentService = {
  async getEnrolledCoursesByUserId(userId) {
    try {
      const response = await api.get(`/enrollments/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching enrolled courses: " + error.message);
    }
  },
};

// Discussions Endpoints

export const DiscussionService = {
  // Create a discussion post
  createDiscussionPost: async (postData, uid) => {
    try {
      const response = await api.post(`/discussionPosts/${uid}`, postData);
      return response.data;
    } catch (error) {
      throw new Error("Error creating discussion post: " + error.message);
    }
  },

  // Get all discussion posts
  getAllDiscussionPosts: async () => {
    try {
      const response = await api.get(`/discussionPosts`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching discussion posts: " + error.message);
    }
  },
};

// Progress Endpoints

// Get user progress
export const getUserProgress = async (userId) => {
  try {
    // Simulated data, replace with actual API call
    return {
      userId: userId,
      completedDuration: 20, // Sample completed duration in minutes
      totalDuration: 60, // Sample total duration in minutes
    };
  } catch (error) {
    throw new Error("Failed to fetch user progress: " + error.message);
  }
};

// Registration Endpoints

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/register", userData);
    return response.data;
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
};

// Trainer Courses Endpoints

// Fetch courses by trainer ID
export const fetchCoursesByTrainerId = async (trainerId) => {
  try {
    const response = await api.get(`/uploaded-courses/${trainerId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching courses by trainer ID: " + error.message);
  }
};

// Fetch enrolled students by course ID
export const fetchEnrolledStudentsByCourseId = async (courseId) => {
  try {
    const response = await api.get(`/enrollments/course/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching enrolled students by course ID: ${error.message}`
    );
  }
};

// Upload-course-endpoint

// Upload course data
export const uploadCourse = async (courseData) => {
  try {
    const response = await axios.post(`/uploaded-courses`, courseData);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("User not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};
