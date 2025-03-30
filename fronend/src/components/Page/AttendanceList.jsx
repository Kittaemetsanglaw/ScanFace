import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AttendanceList = () => {
  const navigate = useNavigate();
  const [students] = useState([
    { id: '65000001', name: 'นาย ณัฐวุฒิ สังขกุล', present: false, absent: false, late: false },

  ]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
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
        <h2 className="text-lg mb-4">รายละเอียดการเช็คชื่อเข้าเรียน : 25/02/2568</h2>
        
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-[#080E2D] rounded-full mr-4 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full relative">
              <div className="w-8 h-5 bg-white absolute top-6 rounded-t-full "></div>
            </div>
          </div>
          <h3 className="text-xl">นาย กฤตเมธ สังข์ลาว</h3> 
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
            {students.map((student, index) => (
                <tr key={student.id}>
                  <td className="border p-4 text-center">{index + 1}</td>
                  <td className="border p-4">{student.id}</td>
                  <td className="border p-4">{student.name}</td>
                  <td className="border p-4 text-center">
                    <button 
                      className="text-blue-500 underline"
                      onClick={() => navigate('/studentslist')}
                    >
                      001
                    </button>
                  </td>
                  <td className="border p-4 text-center">
                    <button 
                      className="text-blue-500 underline"
                      onClick={() => navigate('/studentslist')}
                    >
                      001
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

export default AttendanceList;
