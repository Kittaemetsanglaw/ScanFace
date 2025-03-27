// teacherController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createTeacher(req, res) {
    try {
        const teacher = await prisma.teacher.create({ data: req.body });
        res.json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllTeachers(req, res) {
    try {
        const teachers = await prisma.teacher.findMany();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createTeacher, getAllTeachers };