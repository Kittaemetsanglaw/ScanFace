const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCourse(req, res) {
    try {
        const course = await prisma.course_Detail.create({
            data: {
                Course_ID: req.body.Course_ID,
                Course_Name: req.body.Course_Name,
                Teach_ID: req.body.Teach_ID,
                Start_Time: req.body.Start_Time,
                End_Time: req.body.End_Time,
            },
        });
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllCourses(req, res) {
    try {
        const courses = await prisma.course_Detail.findMany({ include: { teacher: true } });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createCourse, getAllCourses };