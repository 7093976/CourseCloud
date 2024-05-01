import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProgressPage from "../pages/ProgressPage";

describe("ProgressPage Component", () => {
  it("renders 'Your Progress' title", () => {
    const { queryByText } = render(<ProgressPage />, { wrapper: MemoryRouter });
    expect(queryByText("Your Progress")).toBeInTheDocument();
  });

  it("renders course progress details", () => {
    const enrollmentsData = [
      {
        courseId: 1,
        courseName: "Course 1",
        durationHours: 10,
        completedDuration: 5,
      },
      {
        courseId: 2,
        courseName: "Course 2",
        durationHours: 8,
        completedDuration: 3,
      },
    ];

    const { queryByText } = render(<ProgressPage />, {
      wrapper: MemoryRouter,
    });

    enrollmentsData.forEach((enrollment) => {
      expect(queryByText(enrollment.courseName)).toBeInTheDocument();
      expect(queryByText(`Total Duration: ${enrollment.durationHours} hours`)).toBeInTheDocument();
      expect(queryByText(`Completed Duration: ${enrollment.completedDuration} hours`)).toBeInTheDocument();
      expect(queryByText(`Progress: ${((enrollment.completedDuration / enrollment.durationHours) * 100).toFixed(2)}%`)).toBeInTheDocument();
    });
  });
});
