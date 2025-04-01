const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Create Student
router.post("/students", studentController.createStudent);

// Get All Students
router.get("/students", studentController.getAllStudents);

// Get Student Courses
router.get("/students/:id/courses", studentController.getStudentCourses); // เพิ่ม route นี้

module.exports = router;