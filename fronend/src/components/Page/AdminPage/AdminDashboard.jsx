import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    
    // Redirect to login
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'w-48' : 'w-0 -ml-64'
        } bg-black text-white transition-all duration-300 ease-in-out fixed h-full z-10`}
      >
        <div className="p-4 bg-gray-800">
          <h2 className="text-xl font-semibold">Admin Management</h2>
        </div>
        <nav className="mt-6">
          <Link 
            to="/admin"
            className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Dashboard
          </Link>
          <Link 
            to="/admin/teachers"
            className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Teacher
          </Link>
          <Link 
            to="/admin/students"
            className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Student
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 8a1 1 0 11-2 0v-1H7.5a2.5 2.5 0 100 5H12v1a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-48' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="text-white focus:outline-none mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teacher Stats Card */}
            <div className="bg-blue-500 text-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold text-center">Student</h3>
              <p className="text-4xl font-bold text-center mt-2">12</p>
            </div>
            
            {/* More Stats Cards */}
            <div className="bg-blue-500 text-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold text-center">Teacher</h3>
              <p className="text-4xl font-bold text-center mt-2">12</p>
            </div>
            
            <div className="bg-blue-500 text-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold text-center">Course</h3>
              <p className="text-4xl font-bold text-center mt-2">12</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;