const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController");

// Create Classroom
router.post("/classrooms", classroomController.createClassRoom);

// Get All Classrooms
router.get("/classrooms", classroomController.getAllClassRooms);

module.exports = router;