// studentController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createStudent(req, res) {
    try {
        const student = await prisma.student.create({ data: req.body });
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllStudents(req, res) {
    try {
        const students = await prisma.student.findMany();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createStudent, getAllStudents };