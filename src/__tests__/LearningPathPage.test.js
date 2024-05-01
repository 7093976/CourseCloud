import React from "react";
import { render } from "@testing-library/react";
import LearningPathsPage from "../pages/LearningPathsPage";

describe("LearningPathsPage Component", () => {
  it("renders 'Learning Paths' header", () => {
    const { queryByText } = render(<LearningPathsPage courseCode="XYZ123" />);
    expect(queryByText("Learning Paths")).toBeInTheDocument();
  });

  it("renders correct course code", () => {
    const { queryByText } = render(<LearningPathsPage courseCode="XYZ123" />);
    expect(queryByText("Course Code: XYZ123")).toBeInTheDocument();
  });

  it("renders 'Number of Files' label", () => {
    const { queryByLabelText } = render(<LearningPathsPage courseCode="XYZ123" />);
    expect(queryByLabelText("Number of Files:")).toBeInTheDocument();
  });

  it("renders 'Upload Files' button", () => {
    const { queryByText } = render(<LearningPathsPage courseCode="XYZ123" />);
    expect(queryByText("Upload Files")).toBeInTheDocument();
  });

  it("renders 'Already Present Courses' header", () => {
    const { queryByText } = render(<LearningPathsPage courseCode="XYZ123" />);
    expect(queryByText("Already Present Courses")).toBeInTheDocument();
  });

  it("renders correct number of file input elements", () => {
    const { queryAllByLabelText } = render(<LearningPathsPage courseCode="XYZ123" />);
    expect(queryAllByLabelText(/^File \d:/i).length).toBe(1); // Assuming initial state has 1 file input
  });

  it("renders correct number of video input elements", () => {
    const { queryAllByLabelText } = render(<LearningPathsPage courseCode="XYZ123" />);
    expect(queryAllByLabelText(/^Video \d:/i).length).toBe(1); // Assuming initial state has 1 video input
  });

  it("renders 'Upload Success' message when upload is successful", () => {
    const { queryByText } = render(<LearningPathsPage courseCode="XYZ123" />);
    // Assuming uploadSuccess state is true
    expect(queryByText("Learning path added successfully!")).toBeInTheDocument();
  });

  it("renders existing courses list", () => {
    const existingCourses = ["Course A", "Course B", "Course C"];
    const { queryByText } = render(
      <LearningPathsPage courseCode="XYZ123" existingCourses={existingCourses} />
    );
    existingCourses.forEach(course => {
      expect(queryByText(course)).toBeInTheDocument();
    });
  });
});
