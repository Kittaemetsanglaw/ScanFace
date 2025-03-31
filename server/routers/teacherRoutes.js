const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.post("/teachers", teacherController.createTeacher);
router.get("/teachers", teacherController.getAllTeachers);

module.exports = router;