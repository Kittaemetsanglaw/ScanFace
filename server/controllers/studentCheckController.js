const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createStudentCheck(req, res) {
    try {
        const { Student_ID, Course_ID, Check_Date, Check_Time } = req.body;

        // 🔹 ดึงข้อมูลวิชาจากฐานข้อมูล
        const course = await prisma.course_Detail.findUnique({
            where: { Course_ID },
            select: {
                Start_Time: true,
                End_Time: true
            }
        });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const { Start_Time, End_Time } = course;

        // 🔹 แปลงเวลาจาก String → Date Object
        const checkTime = new Date(`${Check_Date}T${Check_Time}`);
        const startTimeObj = new Date(`${Check_Date}T${Start_Time}`);
        const endTimeObj = new Date(`${Check_Date}T${End_Time}`);

        // 🔹 คำนวณเวลา "สายเกิน 15 นาที"
        const lateTimeObj = new Date(startTimeObj.getTime() + 15 * 60000);

        // 🔹 กำหนดสถานะการมาของนักเรียน
        let status = "Absent"; // ขาดเรียน
        if (checkTime <= startTimeObj) {
            status = "Present"; // มาตรงเวลา
        } else if (checkTime > startTimeObj && checkTime <= lateTimeObj) {
            status = "Late"; // มาสาย (แต่ยังไม่เกิน 15 นาที)
        } else if (checkTime > lateTimeObj && checkTime <= endTimeObj) {
            status = "Very Late"; // มาสายเกิน 15 นาที
        }

        // 🔹 บันทึกการเช็คชื่อของนักเรียนลงใน `Student_Check`
        const check = await prisma.student_Check.create({
            data: {
                Student_ID,
                Course_ID,
                Check_Date: new Date(Check_Date),
                Check_Time,
                Check_Status: status
            }
        });

        res.json({
            Student_ID,
            Course_ID,
            Check_Date: Check_Date,
            Check_Time,
            Check_Status: status
        });
        console.log(check); 

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllStudentChecks(req, res) {
    try {
        const checks = await prisma.student_Check.findMany({
            include: { course: true, student: true }
        });
        res.json(checks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createStudentCheck, getAllStudentChecks };
