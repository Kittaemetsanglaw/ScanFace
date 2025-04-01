import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AttendanceTracker = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const apiUrl = "https://your-api-endpoint.com/attendance";

    // Fetch students data from API
    const fetchStudents = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error("❌ Error fetching students:", error);
            // For demo purposes, use mock data when API fails
            setStudents([
                { id: '65000001', fullName: 'นาย ณัฐวุฒิ สังขฤกษ์', status: null },
                { id: '65000002', fullName: 'นาย ธนกิจ ศรีเทพ', status: null },
                { id: '65000003', fullName: 'นาย สราวุฒิ เพียรหาผลงาน', status: null },
                { id: '65000004', fullName: 'นาย พิชญนนท์ ตันเสนีย์', status: null },
                { id: '65000005', fullName: 'นาย พฤกษเลิศ สิงห์ลาวา', status: null },
            ]);
        }
    };

    useEffect(() => {
        // Format the current date as DD/MM/YYYY in Thai Buddhist year (BE)
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear() + 543; // Convert to Buddhist Era
        setCurrentDate(`${day}/${month}/${year}`);

        // Fetch students data when component mounts
        fetchStudents();
    }, []);

    // Start tracking attendance
    const handleStart = () => {
        setIsTracking(true);
    };

    // Stop tracking attendance
    const handleStop = () => {
        setIsTracking(false);
    };

    // Update student attendance status
    const updateStatus = (studentId, statusType) => {
        if (!isTracking) return;

        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === studentId ? { ...student, status: statusType } : student
            )
        );
    };

    // Complete the attendance tracking session
    const handleComplete = async () => {
        try {
            // In a real application, you would send the data to your backend here
            // const response = await fetch(apiUrl, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(students),
            // });

            console.log("Attendance data to be sent to backend:", students);
            alert("บันทึกข้อมูลเรียบร้อย");
        } catch (error) {
            console.error("Error saving attendance data:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-[#131B62] p-4 flex justify-between items-center">
                <div></div>
                <button
                    className="bg-white px-4 py-2 rounded-md font-medium"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </header>

            <div className="p-6">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-4">รายละเอียดการเช็คชื่อเข้าเรียน : {currentDate}</h1>

                    <div className="flex items-center">
                        <h2 className="text-xl font-medium">
                            <div className="flex items-center gap-2">
                                <img src="/api/placeholder/40/40" alt="อาจารย์" className="rounded-full" />
                                <span>อาจารย์ผู้สอน ทดลองเเว่</span>
                            </div>
                        </h2>

                        {/* Start/Stop button moved closer to h2 with a small gap */}
                        <div className="ml-6">
                            {isTracking ? (
                                <button
                                    onClick={handleStop}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Stop
                                </button>
                            ) : (
                                <button
                                    onClick={handleStart}
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Start
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Attendance Table */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border px-4 py-2 text-left">รหัสนักศึกษา</th>
                                    <th className="border px-4 py-2 text-left">ชื่อ - นามสกุล</th>
                                    <th className="border px-4 py-2 text-center">เข้าเรียน</th>
                                    <th className="border px-4 py-2 text-center">เข้าสาย</th>
                                    <th className="border px-4 py-2 text-center">ขาดเรียน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-500 py-4">ไม่พบข้อมูลนักศึกษา</td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr key={student.id}>
                                            <td className="border px-4 py-2">{student.id}</td>
                                            <td className="border px-4 py-2">{student.fullName}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    onClick={() => updateStatus(student.id, 'onTime')}
                                                    className={`w-6 h-6 rounded-full ${student.status === 'onTime'
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-200'
                                                        } mx-auto`}
                                                    disabled={!isTracking}
                                                />
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    onClick={() => updateStatus(student.id, 'late')}
                                                    className={`w-6 h-6 rounded-full ${student.status === 'late'
                                                        ? 'bg-amber-500'
                                                        : 'bg-gray-200'
                                                        } mx-auto`}
                                                    disabled={!isTracking}
                                                />
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    onClick={() => updateStatus(student.id, 'absent')}
                                                    className={`w-6 h-6 rounded-full ${student.status === 'absent'
                                                        ? 'bg-gray-500'
                                                        : 'bg-gray-200'
                                                        } mx-auto`}
                                                    disabled={!isTracking}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Complete Button */}
                <div className="text-right">
                    <button
                        onClick={handleComplete}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        เสร็จสิ้น
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttendanceTracker;