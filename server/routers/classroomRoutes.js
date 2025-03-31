// classroomRoutes.js
const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController");

// Create Classroom
router.post("/classroom", classroomController.createClassRoom);

// Get All Classrooms
router.get("/classroom", classroomController.getAllClassRooms);

module.exports = router;