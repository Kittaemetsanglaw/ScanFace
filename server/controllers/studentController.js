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

async function getStudentCourses(req, res) {
    const studentId = parseInt(req.params.id); // ดึง studentId จาก params

    try {
        const studentCourses = await prisma.student.findUnique({
            where: {
                Student_ID: studentId,
            },
            include: {
                classrooms: {
                    include: {
                        course: true, // ดึงข้อมูล course ที่เกี่ยวข้อง
                    },
                },
            },
        });

        if (!studentCourses) {
            return res.status(404).json({ error: "Student not found" });
        }

        const formattedCourses = studentCourses.classrooms.map((classroom) => ({
            Student_Name: studentCourses.Student_Name,
            Course_ID: classroom.course.Course_ID,
            Course_Name: classroom.course.Course_Name,
            Section: classroom.Class_no, // ใช้ Class_no เป็นตัวแทน section
        }));

        res.json(formattedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createStudent, getAllStudents, getStudentCourses };