import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AttendanceList = () => {
    const navigate = useNavigate();
    const [classRooms, setClassRooms] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = 'http://localhost:5000/api/classrooms'; // ใช้ absolute URL
                console.log('Fetching data from:', url);
                const classRoomsResponse = await axios.get(url);
                if (Array.isArray(classRoomsResponse.data)) {
                    setClassRooms(classRoomsResponse.data);
                    if (classRoomsResponse.data.length > 0 && classRoomsResponse.data[0].student) {
                        setStudentName(classRoomsResponse.data[0].student.Student_Name);
                    } else {
                        setStudentName('ไม่พบชื่อนักเรียน');
                    }
                } else {
                    console.error('API did not return an array:', classRoomsResponse.data);
                    setClassRooms([]);
                    setStudentName('ข้อมูลห้องเรียนไม่ถูกต้อง');
                    setError('API did not return an array: ' + JSON.stringify(classRoomsResponse.data)); // แสดงข้อมูลที่ได้รับ
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
                setClassRooms([]);
                setStudentName('เกิดข้อผิดพลาดในการดึงข้อมูล');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return <div>กำลังโหลดข้อมูล...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <header className="bg-[#131B62] p-4 flex justify-between items-center">
                <div></div>
                <button className="bg-white px-4 py-2 rounded-md font-medium" onClick={handleLogout}>
                    Log out
                </button>
            </header>

            <div className="p-6">
                <h2 className="text-lg mb-4">รายละเอียดการเช็คชื่อเข้าเรียน : 25/02/2568</h2>

                <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-[#080E2D] rounded-full mr-4 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full relative">
                            <div className="w-8 h-5 bg-white absolute top-6 rounded-t-full "></div>
                        </div>
                    </div>
                    <h3 className="text-xl">{studentName}</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-4 text-center">ลำดับ</th>
                                <th className="border p-4 text-left">รหัสวิชา</th>
                                <th className="border p-4 text-left">ชื่อวิชา</th>
                                <th className="border p-4 text-center">ทฤษฎี</th>
                                <th className="border p-4 text-center">ปฏิบัติ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(classRooms) ? (
                                classRooms.map((classRoom, index) => (
                                    <tr key={classRoom.Class_no}>
                                        <td className="border p-4 text-center">{index + 1}</td>
                                        <td className="border p-4">{classRoom.course.Course_ID}</td>
                                        <td className="border p-4">{classRoom.course.Course_Name}</td>
                                        <td className="border p-4 text-center">
                                            <button className="text-blue-500 underline" onClick={() => navigate('/studentslist')}>
                                                {classRoom.Section === 'ทฤษฎี 001' ? '001' : '-'}
                                            </button>
                                        </td>
                                        <td className="border p-4 text-center">
                                            <button className="text-blue-500 underline" onClick={() => navigate('/studentslist')}>
                                                {classRoom.Section === 'ปฏิบัติ' ? '001' : '-'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">ไม่พบข้อมูลห้องเรียน</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceList;