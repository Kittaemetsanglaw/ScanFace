const express = require("express");
const router = express.Router();
const adminController = require("../controllers/addminController");

// อาจารย์
router.post("/teachers", adminController.addTeacher);
router.delete("/teachers/:Teach_ID", adminController.deleteTeacher);

// วิชา
router.post("/courses", adminController.addCourse);
router.delete("/courses/:Course_ID", adminController.deleteCourse);

// นักศึกษา
router.post("/students", adminController.addStudent);
router.delete("/students/:Student_ID", adminController.deleteStudent);

module.exports = router;