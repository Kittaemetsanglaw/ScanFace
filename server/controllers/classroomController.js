const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// สร้างห้องเรียนใหม่
async function createClassRoom(req, res) {
    try {
        const classRoom = await prisma.classRoom.create({
            data: {
                Course_ID: req.body.Course_ID,
                Student_ID: req.body.Student_ID,
                Check_Status: req.body.Check_Status,
                Class_Date: req.body.Class_Date,
                Class_Time: req.body.Class_Time,
                Section: req.body.Section,
            },
        });
        res.json(classRoom);
    } catch (error) {
        console.error("Error creating classroom:", error);
        res.status(400).json({ error: error.message });
    }
}

// ดึงข้อมูลห้องเรียนทั้งหมด
async function getAllClassRooms(req, res) {
    try {
        const classRooms = await prisma.classRoom.findMany({
            include: {
                course: true,
                student: true,
            },
        });
        res.json(classRooms);
    } catch (error) {
        console.error("Error fetching classrooms:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createClassRoom, getAllClassRooms };