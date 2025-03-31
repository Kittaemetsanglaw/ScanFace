const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// เพิ่มอาจารย์
async function addTeacher(req, res) {
    try {
        const { Teach_Name, Teach_User, Teach_Pass } = req.body;
        const teacher = await prisma.teacher.create({
            data: { Teach_Name, Teach_User, Teach_Pass }
        });
        res.json(teacher);
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// ลบอาจารย์
async function deleteTeacher(req, res) {
    try {
        const { Teach_ID } = req.params;
        await prisma.teacher.delete({ where: { Teach_ID: parseInt(Teach_ID) } });
        res.json({ message: "Teacher deleted successfully" });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// เพิ่มวิชา
async function addCourse(req, res) {
    try {
        const { Course_ID, Course_Name, Teach_ID } = req.body;
        const course = await prisma.course_Detail.create({
            data: { Course_ID, Course_Name, Teach_ID }
        });
        res.json(course);
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// ลบวิชา
async function deleteCourse(req, res) {
    try {
        const { Course_ID } = req.params;
        await prisma.course_Detail.delete({ where: { Course_ID } });
        res.json({ message: "Course deleted successfully" });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// เพิ่มนักศึกษา
async function addStudent(req, res) {
    try {
        const { Student_Name, Student_Email, Student_Username, Student_Password } = req.body;
        const student = await prisma.student.create({
            data: { Student_Name, Student_Email, Student_Username, Student_Password }
        });
        res.json(student);
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// ลบนักศึกษา
async function deleteStudent(req, res) {
    try {
        const { Student_ID } = req.params;
        await prisma.student.delete({ where: { Student_ID: parseInt(Student_ID) } });
        res.json({ message: "Student deleted successfully" });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { addTeacher, deleteTeacher, addCourse, deleteCourse, addStudent, deleteStudent };
