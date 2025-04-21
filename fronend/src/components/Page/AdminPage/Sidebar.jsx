// components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ sidebarOpen, activePage, setActivePage, handleLogout }) => {
  return (
    <div
      className={`${
        sidebarOpen ? 'w-48' : 'w-0 -ml-64'
      } bg-black text-white transition-all duration-300 ease-in-out fixed h-full z-10`}
    >
      <div className="p-4 bg-gray-800">
        <h2 className="text-xl font-semibold">Admin Management</h2>
      </div>
      <nav className="mt-6">
        <button
          onClick={() => setActivePage('dashboard')}
          className={`flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${
            activePage === 'dashboard' ? 'bg-gray-700 text-white' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Dashboard
        </button>
        <button
          onClick={() => setActivePage('teachers')}
          className={`flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${
            activePage === 'teachers' ? 'bg-gray-700 text-white' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Teacher
        </button>
        <button
          onClick={() => setActivePage('students')}
          className={`flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${
            activePage === 'students' ? 'bg-gray-700 text-white' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          Student
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 8a1 1 0 11-2 0v-1H7.5a2.5 2.5 0 100 5H12v1a1 1 0 011-2 0V8z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;