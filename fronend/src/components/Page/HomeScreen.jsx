import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow text-black">
        <h1 className="text-xl font-semibold">ระบบเช็คชื่อด้วยใบหน้า</h1>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-black">Service</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Card */}
          <div className="flex flex-col">
            <div className="bg-white border-2 border-blue-500 rounded-lg p-6 mb-2 flex items-center justify-center">
              <img 
                src="/images/student-icon.png" 
                alt="Student" 
                className="w-32 h-32"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24'%3E%3Cpath fill='%230d47a1' d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM12 14.67L6.5 11.5v-2l5.5 3.17 5.5-3.17v2l-5.5 3.17z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <Link 
              to="/attendance" 
              className="bg-blue-600 text-white py-3 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              Students
            </Link>
          </div>

          {/* Instructor Card */}
          <div className="flex flex-col">
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6 mb-2 flex items-center justify-center">
              <img 
                src="/images/instructor-icon.png" 
                alt="Instructor" 
                className="w-32 h-32"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff9800' d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <Link 
              to="/courses" 
              className="bg-orange-500 text-white py-3 px-4 rounded-lg text-center hover:bg-orange-600 transition-colors"
            >
              Instructor
            </Link>
          </div>

          {/* Admin Card */}
          <div className="flex flex-col">
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6 mb-2 flex items-center justify-center">
              <img 
                src="/images/admin-icon.png" 
                alt="Admin" 
                className="w-32 h-32"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff9800' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <Link 
              to="/admindashboard" 
              className="bg-orange-500 text-white py-3 px-4 rounded-lg text-center hover:bg-orange-600 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;