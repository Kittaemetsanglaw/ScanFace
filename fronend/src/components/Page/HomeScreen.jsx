import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-black">ระบบเช็คชื่อด้วยใบหน้า</h1>

      <div className="flex gap-6">
        {/* ปุ่ม Student */}
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate('/attendance')}
        >
          Student
        </button>

        {/* ปุ่ม Instructor */}
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          onClick={() => navigate('/login')}
        >
          Instructor
        </button>
      </div>
    </div>
  );
};

export default Home;
