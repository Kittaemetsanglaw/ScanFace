import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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

  const handleDeleteRecords = async () => {
    try {
      const response = await fetch(`${apiUrl}/delete-all`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setStudentChecks([]);
        alert("ลบข้อมูลทั้งหมดเรียบร้อยแล้ว");
      } else {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    } catch (error) {
      console.error("❌ Error deleting records:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  useEffect(() => {
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
  }, [studentChecks]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const checkedInCount = studentChecks.filter(check => check.Check_Status === "Present").length;
  const notCheckedInCount = studentChecks.filter(check => check.Check_Status !== "Present").length;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Fixed */}
      <div className="bg-white h-screen p-4 text-zinc-800 w-60 shadow-md fixed left-0 top-0 z-10">
        <div className="flex items-center space-x-2 mb-10">
          <span className="icon">💻</span>
          <span className="text-xl font-bold">CPE-495</span>
        </div>
        <ul className="space-y-6">
          <li><a href="#dashboard" className="hover:text-gray-400 flex items-center gap-2">📊 Dashboard</a></li>
          <li><a href="#notification" className="hover:text-gray-400 flex items-center gap-2">🔔 Notification</a></li>
          <li><a href="#log" className="hover:text-gray-400 flex items-center gap-2">📄 Log</a></li>
          <li><a href="#profile" className="hover:text-gray-400 flex items-center gap-2">👤 Profile</a></li>
          <li><a href="#settings" className="hover:text-gray-400 flex items-center gap-2">⚙️ Settings</a></li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-60">
        {/* Header - Fixed */}
        <div className="bg-white text-black p-4 flex justify-between items-center shadow-md fixed top-0 right-0 left-60 z-10">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition" onClick={handleLogout}>Log out</button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 bg-gray-50 p-4 mt-16 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Student Check-ins Table */}
            <div className="bg-white text-black rounded-lg p-4 shadow-md lg:col-span-3">
              <h2 className="font-bold text-lg mb-2">📋 รายการเช็คชื่อ</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">📌 รหัสวิชา</th>
                      <th className="border border-gray-300 px-4 py-2">📌 Student ID</th>
                      <th className="border border-gray-300 px-4 py-2">👤 ชื่อนักศึกษา</th>
                      <th className="border border-gray-300 px-4 py-2">📅 วันที่เช็คชื่อ</th>
                      <th className="border border-gray-300 px-4 py-2">⏰ เวลาเช็คชื่อ</th>
                      <th className="border border-gray-300 px-4 py-2">📌 สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentChecks.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center text-gray-500 py-4">ไม่พบข้อมูลเช็คชื่อ</td>
                      </tr>
                    ) : (
                      studentChecks.map((check) => (
                        <tr key={check.Check_no} className="text-center hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">{check.Course_ID}</td>
                          <td className="border border-gray-300 px-4 py-2">{check.Student_ID}</td>
                          <td className="border border-gray-300 px-4 py-2">{check.student?.Student_Name || "ไม่ระบุชื่อ"}</td>
                          <td className="border border-gray-300 px-4 py-2">{new Date(check.Check_Date).toLocaleDateString()}</td>
                          <td className="border border-gray-300 px-4 py-2">{check.Check_Time}</td>
                          <td className={`border border-gray-300 px-4 py-2 ${
                            check.Check_Status === "Present" ? "text-green-500" :
                            check.Check_Status === "Late" ? "text-yellow-500" :
                            "text-red-500"
                          }`}>
                            {check.Check_Status === "Present" ? "✅ YES" :
                             check.Check_Status === "Late" ? "⚠️ Late" :
                             "❌ Absent"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Status */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg text-black">🔹 ระบบ</h2>
                </div>
                <div className="p-4 flex flex-col gap-2 text-black">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="font-medium">{isConnected ? "Connected" : "Disconnected"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>✅ เช็คชื่อแล้ว:</span>
                    <span className="font-bold">{checkedInCount} คน</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>❌ ยังไม่ได้เช็คชื่อ:</span>
                    <span className="font-bold">{notCheckedInCount} คน</span>
                  </div>
                </div>
              </div>

              {/* Additional Functions Card */}
              <div className="bg-white rounded-lg shadow-md mt-4">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold text-lg text-black">🛠 ฟังก์ชันเพิ่มเติม</h3>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <button
                    onClick={fetchStudentChecks}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    รีเฟรชข้อมูล
                  </button>
                  <button
                    onClick={handleDeleteRecords}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg
                    hover:bg-red-600 transition flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-7 7-7-7" />
                    </svg>
                    ลบข้อมูลทั้งหมด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
