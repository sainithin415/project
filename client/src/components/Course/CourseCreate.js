// client/src/components/Course/CourseCreate.js

import React, { useState } from "react";
import axios from "axios";

const CourseCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/courses", {
        title,
        description,
      });

      setSuccessMessage("Course created successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error creating course. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Create Course</h2>
      <form onSubmit={handleCreateCourse}>
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
        <button type="submit">Create Course</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CourseCreate;
