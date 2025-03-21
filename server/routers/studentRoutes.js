const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/studentControler');

// 📌 เส้นทางสำหรับดึงรายชื่อนักศึกษา
router.get('/students', getAllStudents);

module.exports = router;
