import React, { useState } from 'react';

const Student = () => {
  // ข้อมูลรายวิชา (จำลอง)
  const [subjects, setSubjects] = useState([
    { 
      id: 1, 
      code: "CPE495", 
      name: "หัวข้อพิเศษในด้านวิศวกรรมคอมพิวเตอร์ 1", 
      theory: "001", 
      practice: "" 
    },
    { 
      id: 2, 
      code: "CPE407", 
      name: "เครือข่ายสื่อสารคอมพิวเตอร์", 
      theory: "001", 
      practice: "001" 
    },
    { 
      id: 3, 
      code: "CPE408", 
      name: "", 
      theory: "", 
      practice: "" 
    },
    { 
      id: 4, 
      code: "CPE451", 
      name: "", 
      theory: "", 
      practice: "" 
    }
  ]);
  
  // สร้าง state สำหรับเก็บมุมมองและรหัสวิชาที่ต้องการดูรายละเอียด
  const [view, setView] = useState('list'); // 'list' หรือ 'students'
  const [selectedCode, setSelectedCode] = useState(null);
  
  // ข้อมูลรายชื่อนักศึกษา (จำลอง) - ในแอพจริงอาจจะต้องดึงจาก API
  const studentsList = {
    "001": [
      { id: "12345698", email: "example@mail.com" },
      { id: "12345698", email: "example@mail.com" },
      { id: "12345698", email: "example@mail.com" },
      { id: "12345698", email: "example@mail.com" }
    ]
  };
  
  // ฟังก์ชันสำหรับจัดการเมื่อคลิกที่รหัส
  const handleCodeClick = (code) => {
    setSelectedCode(code);
    setView('students');
  };
  
  // ฟังก์ชันกลับไปหน้ารายการ
  const handleBackToList = () => {
    setView('list');
    setSelectedCode(null);
  };

  return (
    <div className="p-4">
      {view === 'list' ? (
        <>
          <h2 className="text-xl font-bold mb-6">List subject</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-center">ลำดับที่</th>
                  <th className="border px-4 py-2 text-center">รหัสวิชา</th>
                  <th className="border px-4 py-2 text-center">ชื่อวิชา</th>
                  <th className="border px-4 py-2 text-center">ทฤษฎี</th>
                  <th className="border px-4 py-2 text-center">ปฏิบัติ</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td className="border px-4 py-2 text-center">{subject.id}</td>
                    <td className="border px-4 py-2 text-center">{subject.code}</td>
                    <td className="border px-4 py-2">{subject.name}</td>
                    <td className="border px-4 py-2 text-center">
                      {subject.theory ? (
                        <button 
                          onClick={() => handleCodeClick(subject.theory)} 
                          className="text-blue-500 hover:text-blue-700 underline"
                        >
                          {subject.theory}
                        </button>
                      ) : ""}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {subject.practice ? (
                        <button 
                          onClick={() => handleCodeClick(subject.practice)} 
                          className="text-blue-500 hover:text-blue-700 underline"
                        >
                          {subject.practice}
                        </button>
                      ) : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // แสดงรายชื่อนักศึกษา
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">Contents List</h2>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
              Add Articles
            </button>
          </div>
          
          {studentsList[selectedCode] ? (
            <div className="space-y-2">
              {studentsList[selectedCode].map((student, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded flex items-center">
                  <div className="bg-gray-300 rounded-full p-3 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div>{student.id}</div>
                    <div className="text-sm text-gray-600">{student.email}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-100 p-4 rounded">
              ไม่พบข้อมูลรายชื่อนักศึกษาสำหรับรหัส {selectedCode}
            </div>
          )}
          
          <div className="text-right mt-4">
            <button 
              onClick={handleBackToList}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;