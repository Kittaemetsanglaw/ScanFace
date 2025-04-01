import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const AttendancePage = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("640510001");

  useEffect(() => {
    fetch(`https://api.example.com/attendance?studentId=${selectedStudent}`)
      .then(res => res.json())
      .then(data => setAttendanceData(data))
      .catch(err => console.error("Error fetching:", err));
  }, [selectedStudent]);

  const countStatus = (status) =>
    attendanceData.filter((item) => item.status === status).length;

  const total = attendanceData.length;

  const statusColors = {
    present: "bg-green-500",
    late: "bg-orange-400",
    absent: "bg-red-600",
  };

  return (
    <div className="min-h-screen bg-gray-100 text-sm">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          รหัสวิชา CPE495 : หัวข้อพิเศษในด้านวิศวกรรมคอมพิวเตอร์ 1
        </h1>
        <button className="bg-white text-black px-3 py-1 rounded">Log out</button>
      </div>

      {/* Content */}
      <div className="max-w-4xl bg-white shadow-md mx-auto mt-6 p-6 rounded-lg">
        {/* Student selector */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
            <span className="text-lg">👤</span>
          </div>
          <label className="font-bold text-lg text-black">นายกฤตเมธ สังข์ลาว</label>
        </div>

        {/* Attendance Table */}
        <table className="w-full border text-center">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="border px-3 py-2">ครั้งที่</th>
              <th className="border px-3 py-2">วันที่</th>
              <th className="border px-3 py-2">เข้าเรียน</th>
              <th className="border px-3 py-2">มาสาย</th>
              <th className="border px-3 py-2">ขาดเรียน</th>
              <th className="border px-3 py-2">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2 font-bold">{item.date}</td>
                <td className="border px-3 py-2">
                  <div className={`w-4 h-4 rounded-full mx-auto border ${item.status === "present" ? statusColors.present : "border-gray-400"}`}></div>
                </td>
                <td className="border px-3 py-2">
                  <div className={`w-4 h-4 rounded-full mx-auto border ${item.status === "late" ? statusColors.late : "border-gray-400"}`}></div>
                </td>
                <td className="border px-3 py-2">
                  <div className={`w-4 h-4 rounded-full mx-auto border ${item.status === "absent" ? statusColors.absent : "border-gray-400"}`}></div>
                </td>
                <td className="border px-3 py-2"></td>
              </tr>
            ))}

            {/* Summary */}
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={2} className="border px-3 py-2">เข้าเรียน</td>
              <td className="border px-3 py-2">{countStatus("present")}</td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2">ครั้ง</td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={2} className="border px-3 py-2">มาสาย</td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2">{countStatus("late")}</td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2">ครั้ง</td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={2} className="border px-3 py-2">ขาดเรียน</td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2">{countStatus("absent")}</td>
              <td className="border px-3 py-2">ครั้ง</td>
            </tr>
            <tr className="bg-gray-200 font-bold">
              <td colSpan={2} className="border px-3 py-2">รวม</td>
              <td colSpan={3} className="border px-3 py-2">{total}</td>
              <td className="border px-3 py-2">ครั้ง</td>
            </tr>
          </tbody>
        </table>

        {/* Legend */}
        <div className="flex gap-6 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div> เข้าเรียน
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-orange-400 rounded-full"></div> มาสาย
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div> ขาดเรียน
          </div>
        </div>

        {/* Done Button */}
        <div className="text-right mt-4">
          <button className="bg-green-500 text-white px-4 py-1 rounded "
           onClick={() => navigate('/attendance')}
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
