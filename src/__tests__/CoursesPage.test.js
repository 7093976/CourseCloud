import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CoursesPage from "../pages/CoursesPage";
import { AuthContext } from "../context/AuthContext";
import { fetchCourses, fetchEnrollmentsByUserId, createEnrollment } from "../services/api";


describe("CoursesPage Component", () => {
  it("renders course cards for non-enrolled courses", async () => {
    // Mock user and authentication state
    const user = { uid: "123" };
    const isAuthenticated = true;

    // Mock fetchCourses API function
    fetchCourses.mockResolvedValue([
      { cid: "1", courseName: "Course 1", description: "Description 1" },
      { cid: "2", courseName: "Course 2", description: "Description 2" },
    ]);

    // Mock fetchEnrollmentsByUserId API function
    fetchEnrollmentsByUserId.mockResolvedValue([
      { uid: "123", course: { cid: "3" } },
    ]);

    const { getByText, queryByText } = render(
      <AuthContext.Provider value={{ state: { user, isAuthenticated } }}>
        <CoursesPage />
      </AuthContext.Provider>
    );

    // Wait for courses to be fetched
    await waitFor(() => {
      expect(fetchCourses).toHaveBeenCalledTimes(1);
    });

    // Check if Course 1 and Course 2 are rendered
    expect(getByText("Course 1")).toBeInTheDocument();
    expect(getByText("Course 2")).toBeInTheDocument();

    // Check if Course 3 (enrolled course) is not rendered
    expect(queryByText("Course 3")).toBeNull();
  });

  it("handles course enrollment", async () => {
    // Mock user and authentication state
    const user = { uid: "123" };
    const isAuthenticated = true;

    // Mock fetchCourses API function
    fetchCourses.mockResolvedValue([
      { cid: "1", courseName: "Course 1", description: "Description 1" },
      { cid: "2", courseName: "Course 2", description: "Description 2" },
    ]);

    // Mock fetchEnrollmentsByUserId API function
    fetchEnrollmentsByUserId.mockResolvedValue([]);

    // Mock createEnrollment API function
    createEnrollment.mockResolvedValue({});

    const { getByText } = render(
      <AuthContext.Provider value={{ state: { user, isAuthenticated } }}>
        <CoursesPage />
      </AuthContext.Provider>
    );

    // Wait for courses to be fetched
    await waitFor(() => {
      expect(fetchCourses).toHaveBeenCalledTimes(1);
    });

    // Click the enroll button for Course 1
    fireEvent.click(getByText("Enroll", { selector: "button" }));

    // Wait for enrollment to be processed
    await waitFor(() => {
      expect(createEnrollment).toHaveBeenCalledTimes(1);
    });

    // Check if success message is displayed
    expect(getByText("Course enrolled successfully!")).toBeInTheDocument();
  });
});
