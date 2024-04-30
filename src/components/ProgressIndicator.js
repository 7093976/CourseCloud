import React from "react";

const ProgressIndicator = ({ course }) => {
  const calculateProgress = () => {
    const completed = parseFloat(course.completedDuration);
    const total = parseFloat(course.totalDuration);

    if (isNaN(completed) || isNaN(total) || total === 0) {
      return 0; // Return 0 if either value is not a valid number or total duration is 0
    }

    const progress = (completed / total) * 100;
    return Math.round(progress * 100) / 100; // Round progress percentage to two decimal places
  };

  return (
    <div>
      <h3>{course.title}</h3>
      <div>
        Completed: {course.completedDuration} / {course.totalDuration}
      </div>
      <progress value={course.completedDuration} max={course.totalDuration} />
      <div>Progress: {calculateProgress()}%</div>
    </div>
  );
};

export default ProgressIndicator;
