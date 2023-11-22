// client/src/components/Course/CourseUpdate.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseUpdate = ({ match }) => {
  const courseId = match.params.id; // Assuming you're using React Router for navigation
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the details of the course to be updated
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/courses/${courseId}`
        );
        const course = response.data;
        setTitle(course.title);
        setDescription(course.description);
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    fetchCourseDetails();
  }, [courseId]); // Dependency on courseId to refetch details when it changes

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/api/courses/${courseId}`,
        {
          title,
          description,
        }
      );

      setSuccessMessage("Course updated successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error updating course. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Update Course</h2>
      <form onSubmit={handleUpdateCourse}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Course</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CourseUpdate;
