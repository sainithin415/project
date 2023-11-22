// client/src/components/Course/CourseList.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses from the server
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <strong>{course.title}</strong> - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
