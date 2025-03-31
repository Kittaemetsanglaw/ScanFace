// studentCheckRoutes.js
const express = require("express");
const router = express.Router();
const studentCheckController = require("../controllers/studentCheckController");

// Create Student Check-in
router.post("/student-checks", studentCheckController.createStudentCheck);

// Get All Student Check-ins
router.get("/student-checks", studentCheckController.getAllStudentChecks);

module.exports = router;