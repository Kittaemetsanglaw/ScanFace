import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InstructorList = () => {
  const [studentChecks, setStudentChecks] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const apiUrl = "http://localhost:5000/api/student-checks";
  const navigate = useNavigate();

  const fetchStudentChecks = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setStudentChecks(data);
      setIsConnected(true);
    } catch (error) {
      console.error("❌ Error fetching student checks:", error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    fetchStudentChecks();

    const socket = new WebSocket(apiUrl);

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📥 Received data:", data);

        if (JSON.stringify(data) !== JSON.stringify(studentChecks)) {
          setStudentChecks(data);
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.warn("🔴 WebSocket Disconnected");
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const currentDate = new Date().toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-indigo-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">รายละเอียดการเข้าเรียน : {currentDate}</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-1 rounded-md hover:bg-gray-100"
        >
          Log out
        </button>
      </header>

      {/* Instructor Info */}
      <div className="p-6 flex items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="ml-4 text-black">
          <h2 className="text-lg font-bold">อาจารย์สุรชัย ทองแก้ว</h2>
        </div>
      </div>

      {/* Student List Table */}
      <div className="px-6 pb-6 flex-grow text-black">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-center w-1/5">รหัสนักศึกษา</th>
                <th className="border border-gray-300 px-4 py-2 text-center w-2/5">ชื่อ - นามสกุล</th>
                <th className="border border-gray-300 px-4 py-2 text-center">เข้าเรียน</th>
                <th className="border border-gray-300 px-4 py-2 text-center">เข้าสาย</th>
                <th className="border border-gray-300 px-4 py-2 text-center">ขาดเรียน</th>
              </tr>
            </thead>
            <tbody>
              {studentChecks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center text-gray-500">ไม่พบข้อมูลนักศึกษา</td>
                </tr>
              ) : (
                studentChecks.map((student) => (
                  <tr key={student.Student_ID || student.Check_no}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{student.Student_ID}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {student.student?.Student_Name || student.Student_Name || "ไม่ระบุชื่อ"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${student.Check_Status === "Present" ? "bg-green-500" : "border-2 border-gray-300"}`}>
                          {student.Check_Status === "Present" && <div className="w-3 h-3 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${student.Check_Status === "Late" ? "bg-yellow-500" : "border-2 border-gray-300"}`}>
                          {student.Check_Status === "Late" && <div className="w-3 h-3 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${student.Check_Status === "Absent" ? "bg-red-500" : "border-2 border-gray-300"}`}>
                          {student.Check_Status === "Absent" && <div className="w-3 h-3 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Button */}
      <div className="flex justify-end px-6 pb-6">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
          onClick={() => navigate('/Instructor')}
        >
          เสร็จสิ้น
        </button>
      </div>
    </div>
  );
};

export default InstructorList;