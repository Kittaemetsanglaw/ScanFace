// controllers/classRoomController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// สร้างห้องเรียนใหม่
async function createClassRoom(req, res) {
    try {
        const classRoom = await prisma.classRoom.create({
            data: req.body
        });
        res.json(classRoom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// ดึงข้อมูลห้องเรียนทั้งหมด
async function getAllClassRooms(req, res) {
    try {
        const classRooms = await prisma.classRoom.findMany({
            include: {
                course: true,
                student: true
            }
        });
        res.json(classRooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createClassRoom, getAllClassRooms };
