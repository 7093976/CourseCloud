import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, logout } = useAuth();
  const { isAuthenticated, user } = state;

  const handleLogout = (destination = "/") => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
      return;
    }

    logout();
    if (location.pathname !== "/") {
      navigate(destination);
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/" &&
      isAuthenticated &&
      location.state &&
      !location.state.fromLogin
    ) {
      handleLogout("/");
    }
  }, [location.pathname, isAuthenticated]);

  const showBackButton =
    location.pathname !== "/" || (location.pathname === "/" && isAuthenticated);

  let navLinks = (
    <>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Login
        </Link>
      </li>
    </>
  );

  if (isAuthenticated) {
    const commonLinks = (
      <>
        <li className="nav-item">
          <Link to="/discussion" className="nav-link">
            Discussion
          </Link>
        </li>
        <li className="nav-item">
          <Link onClick={() => handleLogout("/")} className="nav-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z"
                fill="currentColor"
              />
              <path
                d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </li>
      </>
    );

    if (user.role === "admin") {
      navLinks = (
        <>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">
              Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/enrollment" className="nav-link">
              Enrollment
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/progress" className="nav-link">
              Progress
            </Link>
          </li>
          {commonLinks}
        </>
      );
    } else if (user.role === "trainer" || user.role === "Trainer") {
      navLinks = (
        <>
          <li className="nav-item">
            <Link to="/upload" className="nav-link">
              Upload Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/trainercourses" className="nav-link">
              Your Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/trainer-progress-track" className="nav-link">
              Track Students Progress
            </Link>
          </li>
          {commonLinks}
        </>
      );
    } else if (user.role === "student" || user.role === "Student") {
      navLinks = (
        <>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">
              New Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/enrollment" className="nav-link">
              Your Enrollments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/progress" className="nav-link">
              Track your Progress
            </Link>
          </li>
          {commonLinks}
        </>
      );
    }
  } else {
    navLinks = (
      <>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/registration" className="nav-link">
            Registration
          </Link>
        </li>
      </>
    );
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/home" className="logo">
          CourseCloud 🌩️
        </Link>

        <nav className="nav-menu">
          <ul className="nav-list">
            <div className="header-left">
              <button className="back-button" onClick={() => navigate(-1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            </div>
            {navLinks}
            <div className="header-right">
              <button className="forward-button" onClick={() => navigate(1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
