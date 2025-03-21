const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addAttendance = async (req, res) => {
  try {
    // 1️⃣ รับข้อมูลจาก AI
    const { userId, status, timestamp, faceData, confidence, location, deviceId } = req.body;

    // 2️⃣ ตรวจสอบว่า userId มีอยู่ในระบบหรือไม่
    let user = await prisma.user.findUnique({
      where: { id: userId }
    });

    // 3️⃣ ถ้าไม่มี User ให้สร้างใหม่
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          fullName: "Unknown User", // หรือให้ AI ส่งชื่อมาด้วย
          email: `${userId}@example.com`, // อาจใช้ email ชั่วคราว
          role: "USER" // กำหนดค่า default เป็น USER
        }
      });
    }

    // 4️⃣ บันทึกข้อมูลลงใน Attendance Table
    const attendance = await prisma.attendance.create({
      data: {
        userId,
        status,
        timestamp: new Date(timestamp),
        faceData,
        confidence,
        location,
        deviceId
      }
    });
    console.log(attendance)

    // 5️⃣ ส่งข้อมูลกลับไปยัง Frontend
    return res.status(201).json({
      message: "Attendance recorded successfully",
      attendance
    });

  } catch (error) {
    console.error("Error adding attendance:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addAttendance };
