// routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Route to get the list of all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
});

// Route to create a new course
router.post("/courses", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newCourse = new Course({ title, description });
    const savedCourse = await newCourse.save();
    res.json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: "Error creating course" });
  }
});

// Route to get details of a specific course
router.get("/courses/:id", async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Error fetching course details" });
  }
});

// Route to update a specific course
router.put("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: "Error updating course" });
  }
});

// Route to delete a specific course
router.delete("/courses/:id", async (req, res) => {
  const courseId = req.params.id;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(deletedCourse);
  } catch (error) {
    res.status(500).json({ error: "Error deleting course" });
  }
});

module.exports = router;
