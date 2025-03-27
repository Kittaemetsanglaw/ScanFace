// courseRoutes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Create Course
router.post("/course", courseController.createCourse);

// Get All Courses
router.get("/course", courseController.getAllCourses);

module.exports = router;