import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const navigate = useNavigate();
  
  const courseData = {
    date: '25/02/2568',
    teacher: 'อาจารย์สุรชัย ทองแก้ว',
    courses: [
      { id: '01', code: 'CPE451', students: 25 }
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  

  return (
    <div className="min-h-screen bg-white">
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
        <h2 className="text-lg mb-4">รายละเอียดการเช็คชื่อเข้าเรียน : {courseData.date}</h2>
        
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-[#080E2D] rounded-full mr-4 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full relative items-center">
              <div className="w-8 h-5 bg-white absolute top-6 rounded-t-full "></div>
            </div>
          </div>
          <h3 className="text-xl">{courseData.teacher}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left">No</th>
                <th className="border p-2 text-left">ชื่อวิชา</th>
                <th className="border p-2 text-left">จำนวนนักศึกษา</th>
                <th className="border p-2">เช็คชื่อ</th>
                <th className="border p-2">ดูประวัติ</th>
                <th className="border p-2">แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              {courseData.courses.map(course => (
                <tr key={course.id}>
                  <td className="border p-2">{course.id}</td>
                  <td className="border p-2">{course.code}</td>
                  <td className="border p-2">{course.students}</td>
                  <td className="border p-2">
                    <button 
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => navigate('/attendance')}
                    >
                      เช็คชื่อ
                    </button>
                  </td>
                  <td className="border p-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => navigate('/attendance')}
                    >
                      ดูประวัติ
                    </button>
                  </td>
                  <td className="border p-2">
                    <button className="bg-orange-500 text-white px-3 py-1 rounded"
                    onClick={() => navigate('/attendance')}
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;