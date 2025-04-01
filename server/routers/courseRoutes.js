// courseRoutes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Create Course
router.post("/courses", courseController.createCourse);

// Get All Courses
router.get("/courses", courseController.getAllCourses);

module.exports = router;