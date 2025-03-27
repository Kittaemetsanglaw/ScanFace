// studentRoutes.js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Create Student
router.post("/students", studentController.createStudent);

// Get All Students
router.get("/students", studentController.getAllStudents);

module.exports = router;