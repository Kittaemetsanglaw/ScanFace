// components/StudentsContent.jsx
import React, { useState } from 'react';

const StudentsContent = ({ darkMode }) => {
  // Changed initial view to 'subject-list' to start with List subject
  const [view, setView] = useState('subject-list');
  // Added selectedSubject state to track which subject was clicked
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([
    { id: '12345688', email: 'example@email.com' },
    { id: '12345668', email: 'student@email.com' },
    { id: '12345699', email: 'example@email.com' },
    { id: '12345658', email: 'example@email.com' }
  ]);
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    surname: '',
    email: 'example@email.com'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new student to the students array
    const newStudentWithId = {
      ...newStudent,
      id: newStudent.id || `ID${Math.floor(Math.random() * 100000)}`
    };

    setStudents(prevStudents => [...prevStudents, newStudentWithId]);

    // Reset form and return to contents list view
    setNewStudent({ id: '', name: '', surname: '', email: 'example@email.com' });
    setView('contents-list');
  };

  // Handle click on subject code link
  const handleSubjectClick = (subjectCode) => {
    setSelectedSubject(subjectCode);
    setView('contents-list');
  };

  // Handle back button click
  const handleBackClick = () => {
    setView('subject-list');
    setSelectedSubject(null);
  };

  // List Subject View (first view)
  const renderSubjectListView = () => (
    <div>
      <h2 className="mb-4">List subject</h2>

      <div className={`border rounded overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        <table className="w-full">
          <thead className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <tr>
              <th className="p-2 text-left">ลำดับ</th>
              <th className="p-2 text-left">รหัสวิชา</th>
              <th className="p-2 text-left">ชื่อวิชา</th>
              <th className="p-2 text-left">หมายเหตุ</th>
              <th className="p-2 text-left">ปฏิบัติ</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <td className="p-2">1</td>
              <td className="p-2">CPE405</td>
              <td className="p-2">ตัวประมวลผลภาษาโปรแกรมคอมพิวเตอร์ 1</td>
              <td className="p-2">001</td>
              <td className="p-2">
                <a
                  href="#"
                  className="text-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubjectClick('CPE405');
                  }}
                >
                  001
                </a>
              </td>
            </tr>
            <tr className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <td className="p-2">2</td>
              <td className="p-2">CPE407</td>
              <td className="p-2">เครือข่ายคอมพิวเตอร์</td>
              <td className="p-2">001</td>
              <td className="p-2">
                <a
                  href="#"
                  className="text-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubjectClick('CPE407');
                  }}
                >
                  001
                </a>
              </td>
            </tr>
            <tr className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <td className="p-2">3</td>
              <td className="p-2">CPE408</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
            </tr>
            <tr className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <td className="p-2">4</td>
              <td className="p-2">CPE451</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Contents List View (shows after clicking 001 in subject list)
  const renderContentsListView = () => (
    <div>
      <div className="flex justify-between mb-4">
        <h2>Contents List {selectedSubject && `- ${selectedSubject}`}</h2>
        <button
          onClick={() => setView('add')}
          className={`px-3 py-1 rounded text-white ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} hover:bg-blue-700`}
        >
          Add Student
        </button>
      </div>

      <div className="space-y-2">
        {students.map((student) => (
          <div key={student.id} className={`p-4 rounded flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div className="bg-gray-400 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div>{student.id}</div>
              <div className="text-sm text-gray-500">{student.email}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-4">
        <button
          onClick={handleBackClick}
          className={`px-3 py-1 rounded text-white ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} hover:bg-blue-700`}
        >
          Back
        </button>
      </div>
    </div>
  );

  // Student Add Form
  const renderAddStudentView = () => (
    <div>
      <h2 className="mb-2">Articles Management</h2>

      <div className={`p-3 mb-4 ${darkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white`}>
        <h3 className="font-medium">Create Data</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">ID student</label>
          <input
            type="text"
            name="id"
            value={newStudent.id}
            onChange={handleInputChange}
            className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">name</label>
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block mb-1">surname</label>
            <input
              type="text"
              name="surname"
              value={newStudent.surname}
              onChange={handleInputChange}
              className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
            />
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Students Management</h2>

      {/* Show the appropriate view based on state */}
      {view === 'subject-list' && renderSubjectListView()}
      {view === 'contents-list' && renderContentsListView()}
      {view === 'add' && renderAddStudentView()}
    </div>
  );
};

export default StudentsContent;