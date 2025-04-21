const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createStudentCheck(req, res) {
    try {
        const { Course_ID, Student_ID, Check_Date, Check_Time } = req.body;

        // ดึงข้อมูลหลักสูตรเพื่อนำ Start_Time และ End_Time มาคำนวณ
        const course = await prisma.course_Detail.findUnique({
            where: {
                Course_ID: Course_ID,
            },
        });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const startTime = course.Start_Time; // "09:00:00"
        const endTime = course.End_Time; // "12:00:00"

        // แปลง Check_Time เป็น Date object เพื่อเปรียบเทียบ
        const checkTimeDate = new Date(`1970-01-01T${Check_Time}Z`); // ใช้ 1970-01-01 เป็นวันที่จำลอง

        // แปลง startTime และ endTime เป็น Date object
        const startTimeDate = new Date(`1970-01-01T${startTime}Z`);
        const endTimeDate = new Date(`1970-01-01T${endTime}Z`);

        // คำนวณความแตกต่างของเวลา
        const timeDiff = checkTimeDate - startTimeDate; // หน่วยเป็น milliseconds
        const minutesDiff = timeDiff / (1000 * 60); // แปลงเป็นนาที

        let checkStatus = "Present"; // ค่าเริ่มต้น

        if (minutesDiff > 15 && minutesDiff <= 30) {
            checkStatus = "Late";
        } else if (minutesDiff > 30) {
            checkStatus = "Very Late";
        }

        // บันทึกข้อมูล Student_Check พร้อม Check_Status ที่คำนวณแล้ว
        const studentCheck = await prisma.student_Check.create({
            data: {
                Course_ID,
                Student_ID,
                Check_Date,
                Check_Time,
                Check_Status: checkStatus, // ใช้ Check_Status ที่คำนวณ
            },
        });
        console.log(studentCheck);

        res.json(studentCheck);
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
