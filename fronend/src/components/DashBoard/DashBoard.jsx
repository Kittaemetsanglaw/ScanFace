import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const apiUrl = "http://localhost:5000/api/students"; // API สำหรับดึงข้อมูลนักศึกษา

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("❌ Error fetching students:", error);
        setIsConnected(false);
      }
    };

    fetchStudents();
  }, []);

  // นับจำนวนที่เช็คชื่อแล้ว
  const checkedInCount = students.filter(student =>
    student.attendances.some(attendance => attendance.status === "present")
  ).length;

  // นับจำนวนที่ยังไม่เช็คชื่อ
  const notCheckedInCount = students.filter(student =>
    student.attendances.every(attendance => attendance.status !== "present")
  ).length;

  return (
    <div className="flex-1 bg-white text-black p-4 grid grid-cols-4 gap-4 min-h-screen">
      {/* กล่องแสดงรายชื่อนักศึกษา */}
      <div className="bg-white text-black rounded-lg p-4 shadow-md col-span-3">
        <h2 className="font-bold text-lg mb-2">📋 รายชื่อนักศึกษา</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">📌 รหัสวิชา</th>
              <th className="border border-gray-300 px-4 py-2">📌 Student ID</th>
              <th className="border border-gray-300 px-4 py-2">👤 ชื่อ</th>
              <th className="border border-gray-300 px-4 py-2">📅 วันที่เรียน</th>
              <th className="border border-gray-300 px-4 py-2">⏰ เวลาเรียน</th>
              <th className="border border-gray-300 px-4 py-2">📌 สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{student.attendances[0]?.status}</td>
                <td className="border border-gray-300 px-4 py-2">{student.id}</td>
                <td className="border border-gray-300 px-4 py-2">{student.fullName}</td>
                <td className="border border-gray-300 px-4 py-2">{student.attendances[0]?.timestamp}</td>
                <td className="border border-gray-300 px-4 py-2">{student.attendances[0]?.timestamp}</td>
                <td className={`border border-gray-300 px-4 py-2 ${student.attendances[0]?.status === "present" ? "text-green-500" : "text-red-500"}`}>
                  {student.attendances[0]?.status === "present" ? "✅ YES" : "❌ NO"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* กล่องแสดงระบบ */}
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 col-span-1 flex flex-col gap-4">
        <h2 className="font-bold text-lg mb-2">🔹 ระบบ</h2>
        <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
          <p className="font-bold">{isConnected ? "✅ Connected" : "❌ Disconnected"}</p>
          <p>✅ เช็คชื่อแล้ว: <b>{checkedInCount}</b> คน</p>
          <p>❌ ยังไม่ได้เช็คชื่อ: <b>{notCheckedInCount}</b> คน</p>
        </div>

        {/* ฟังก์ชันเพิ่มเติม */}
        <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
          <h3 className="font-bold">🛠 ฟังก์ชันเพิ่มเติม</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition">
            รีเฟรชข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
