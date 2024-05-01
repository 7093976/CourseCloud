import React from "react";
import { render } from "@testing-library/react";
import HomePage from "../pages/HomePage";

describe("HomePage Component", () => {
  it("redirects to login page if user is not authenticated", () => {
    const { queryByText } = render(<HomePage isAuthenticated={false} />);
    expect(queryByText("Redirect to Login Page")).toBeInTheDocument();
  });

  it("displays admin-specific links for admin user", () => {
    const { queryByText } = render(<HomePage user={{ role: "admin" }} />);
    expect(queryByText("Upload Course")).toBeInTheDocument();
    expect(queryByText("Track Progress")).toBeInTheDocument();
    expect(queryByText("Discussion Forums")).toBeInTheDocument();
  });

  it("displays trainer-specific links for trainer user", () => {
    const { queryByText } = render(<HomePage user={{ role: "trainer" }} />);
    expect(queryByText("Upload Course")).toBeInTheDocument();
    expect(queryByText("Discussion Forums")).toBeInTheDocument();
    expect(queryByText("View Your Courses")).toBeInTheDocument();
    expect(queryByText("Track Your Students")).toBeInTheDocument();
  });

  it("displays student-specific links for student user", () => {
    const { queryByText } = render(<HomePage user={{ role: "student" }} />);
    expect(queryByText("View Courses And Enroll")).toBeInTheDocument();
    expect(queryByText("View Courses You Have Enrolled")).toBeInTheDocument();
    expect(queryByText("Track Your Progress")).toBeInTheDocument();
    expect(queryByText("Discussion Forums")).toBeInTheDocument();
  });

  it("displays welcome message and general content", () => {
    const user = { firstName: "John" };
    const { queryByText } = render(<HomePage isAuthenticated={true} user={user} />);
    expect(queryByText("Welcome, John!")).toBeInTheDocument();
    expect(queryByText("This is the homepage of our LMS. You can browse courses, track your progress, participate in discussions, and more!")).toBeInTheDocument();
  });

  it("handles unexpected user roles gracefully", () => {
    const user = { firstName: "John", role: "superuser" }; // assuming 'superuser' role doesn't exist
    const { queryByText } = render(<HomePage isAuthenticated={true} user={user} />);
    expect(queryByText("Upload Course")).not.toBeInTheDocument();
    expect(queryByText("Track Progress")).not.toBeInTheDocument();
    expect(queryByText("Discussion Forums")).not.toBeInTheDocument();
    expect(queryByText("View Your Courses")).not.toBeInTheDocument();
    expect(queryByText("Track Your Students")).not.toBeInTheDocument();
    expect(queryByText("View Courses And Enroll")).not.toBeInTheDocument();
    expect(queryByText("View Courses You Have Enrolled")).not.toBeInTheDocument();
    expect(queryByText("Track Your Progress")).not.toBeInTheDocument();
    expect(queryByText("Discussion Forums")).not.toBeInTheDocument();
  });
});
