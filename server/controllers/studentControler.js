const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 📌 API ดึงรายชื่อนักศึกษาทั้งหมด
const getAllStudents = async (req, res) => {
  try {
    // ดึงข้อมูลจากตาราง Attendance (หรือถ้าต้องการดึงจากตาราง User สามารถปรับให้เหมาะสม)
    const students = await prisma.user.findMany({
      include: {
        attendances: true, // ดึงข้อมูลการเช็คชื่อจากตาราง attendances ด้วย
      },
    });

    res.json(students);
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllStudents,
};
