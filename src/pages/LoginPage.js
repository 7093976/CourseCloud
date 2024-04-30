import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import necessary components from react-router-dom
import axios from "axios"; // Import axios for making HTTP requests
import "./LoginPage.css"; // Import CSS file for styling
import { useAuth } from "../context/AuthContext"; // Import useAuth hook from AuthContext
import GoogleLoginComponent from "../auth/GoogleLoginComponent"; // Import GoogleLoginComponent for Google login functionality

// Component definition
const LoginPage = () => {
  // State variables using useState hook
  const { state, dispatch } = useAuth(); // Destructure state and dispatch from useAuth hook
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation
  const [email, setEmail] = useState(""); // State for email input field
  const [password, setPassword] = useState(""); // State for password input field
  const [error, setError] = useState(""); // State for error message
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Reset authentication state when component mounts
  useEffect(() => {
    dispatch({ type: "RESET_AUTH_STATE" }); // Dispatch action to reset authentication state
  }, [dispatch]); // Dependency array to run effect only once

  // Event handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Send login request to the server
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      // Handle server response
      if (response.status === 200) {
        // If login successful, dispatch LOGIN_SUCCESS action and redirect to home page
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        navigate("/home");
      } else {
        // If login failed, dispatch LOGIN_FAILURE action and set error message
        dispatch({
          type: "LOGIN_FAILURE",
          payload: response.data.message || "Login failed",
        });
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 401) {
        // Unauthorized - Incorrect username or password
        setError("Incorrect email or password");
      } else {
        // Other errors
        console.error("Error:", error);
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "An unexpected error occurred",
        });
        setError("An unexpected error occurred");
      }
    }
  };

  // JSX return
  return (
    <div className="auth-form">
      <h2 className="auth-heading">Login</h2>
      <form className="auth-form-container" onSubmit={handleFormSubmit}>
        <div className="auth-input-group auth-input-group-email">
          <label htmlFor="email" className="auth-label">
            Email ID:
          </label>
          <input
            type="email"
            id="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-input-group auth-input-group-password">
          <label htmlFor="password" className="auth-label">
            Password:
          </label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <div className="auth-error">{error}</div>}
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
        <div className="google-login-container">
          <GoogleLoginComponent /> {/* Render Google login component */}
        </div>
      </form>
      <br />
      <center>
        {/* Link inviting users to sign up */}
        <p>
          Don't have an account? <Link to="/registration">Sign up</Link>
        </p>
      </center>
    </div>
  );
};

export default LoginPage; // Export LoginPage component
