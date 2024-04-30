import React, { useState } from "react";
import Select from "react-select"; // Import Select component for dropdown
import { registerUser } from "../services/api"; // Import registerUser function
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import GoogleLoginComponent from "../auth/GoogleLoginComponent"; // Import GoogleLoginComponent
import "./RegistrationPage.css"; // Import CSS file for styling
import { countries } from "countries-list"; // Import countries list

// RegistrationPage component definition
function RegistrationPage({ userType }) {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [userData, setUserData] = useState({ // State for user data
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    region: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [selectedField, setSelectedField] = useState(""); // State for selected field in form

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // Function to handle field focus
  const handleFocus = (fieldName) => {
    setSelectedField(fieldName);
  };

  // Function to handle field blur
  const handleBlur = () => {
    setSelectedField("");
  };

  // Function to handle password change
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      password: password,
      strength: getPasswordStrength(password),
    }));
  };

  // Function to calculate password strength
  const getPasswordStrength = (password) => {
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await registerUser(userData); // Register user using API
        alert("Registration successful!"); // Show success message
        navigate(`/`); // Navigate back to the previous page
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorMessage("Registration failed. Please try again."); // Show error message
      }
    }
  };

  // Function to validate form data
  const validateForm = () => {
    const { firstName, lastName, email, password, role, region } = userData;
    if (!firstName || !lastName || !email || !password || !role || !region) {
      setErrorMessage("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address.");
      return false;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  // Callback function to handle successful Google Sign-In
  const handleGoogleSignInSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    setUserData((prevUserData) => ({
      ...prevUserData,
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail(),
    }));
  };

  // Callback function to handle failed Google Sign-In
  const handleGoogleSignInFailure = (error) => {
    console.error("Google Sign-In failed:", error);
  };

  // Create options for the select field
  const countryOptions = Object.keys(countries).map((code) => ({
    value: code,
    label: countries[code].name,
  }));
  

  return (
    <div className="registration-container">
      <h2 className="registration-title">Registration Page</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group unique-class-7">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter your first name"
            value={userData.firstName}
            onChange={handleChange}
            onFocus={() => handleFocus("firstName")}
            onBlur={handleBlur}
            required
          />
          {selectedField === "firstName" && (
            <span className="required-option">Required</span>
          )}
        </div>
        <div className="form-group unique-class-8">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter your last name"
            value={userData.lastName}
            onChange={handleChange}
            onFocus={() => handleFocus("lastName")}
            onBlur={handleBlur}
            required
          />
          {selectedField === "lastName" && (
            <span className="required-option">Required</span>
          )}
        </div>
        <div className="form-group unique-class-9">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            value={userData.email}
            onChange={handleChange}
            onFocus={() => handleFocus("email")}
            onBlur={handleBlur}
            required
          />
          {selectedField === "email" && (
            <span className="required-option">Required</span>
          )}
        </div>
        <div className="form-group unique-class-10 password-strength">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handlePasswordChange}
            onFocus={() => handleFocus("password")}
            onBlur={handleBlur}
            required
          />
          {selectedField === "password" && (
            <span className="required-option">Required</span>
          )}
          {userData.strength && (
            <span
              className={`password-strength-indicator ${userData.strength}`}
            >
              {userData.strength}
            </span>
          )}
        </div>
        <div className="form-group unique-class-11">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            value={userData.role}
            onChange={handleChange}
            onFocus={() => handleFocus("role")}
            onBlur={handleBlur}
            required
          >
            <option value="">Select Role</option>
            <option value="Trainer">Trainer</option>
            <option value="Student">Student</option>
          </select>
          {selectedField === "role" && (
            <span className="required-option">Required</span>
          )}
        </div>
        <div className="form-group unique-class-12">
          <label htmlFor="region">Region:</label>
          <Select
            options={countryOptions}
            onChange={(selectedOption) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                region: selectedOption.value,
              }))
            }
            onFocus={() => handleFocus("region")}
            onBlur={handleBlur}
            required
          />
          {selectedField === "region" && (
            <span className="required-option">Required</span>
          )}
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <div className="google-login-container">
        {/* GoogleLoginComponent with callbacks for success and failure */}
        <GoogleLoginComponent
          onSuccess={handleGoogleSignInSuccess}
          onFailure={handleGoogleSignInFailure}
        />
      </div>
    </div>
  );
}

export default RegistrationPage;
