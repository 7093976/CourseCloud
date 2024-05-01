import React from "react";
import { render } from "@testing-library/react";
import TrainerCoursePage from "../pages/TrainerCoursePage";

describe("TrainerCoursePage Component", () => {
  it("renders title", () => {
    const { getByText } = render(<TrainerCoursePage />);
    expect(getByText("Trainer Courses")).toBeInTheDocument();
  });

  it("renders course cards", () => {
    const { getAllByTestId } = render(<TrainerCoursePage />);
    const courseCards = getAllByTestId("course-card");
    expect(courseCards.length).toBeGreaterThan(0);
  });

  it("renders course name and description", () => {
    const { getByText } = render(<TrainerCoursePage />);
    expect(getByText("Course Name")).toBeInTheDocument();
    expect(getByText("Description")).toBeInTheDocument();
  });

  it("renders 'Add Learning Paths' link", () => {
    const { getByText } = render(<TrainerCoursePage />);
    expect(getByText("Add Learning Paths")).toBeInTheDocument();
  });

  // You can write additional test cases to verify the functionality of adding learning paths and handling course details
});
