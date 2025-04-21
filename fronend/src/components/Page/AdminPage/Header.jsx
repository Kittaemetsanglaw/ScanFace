// components/Header.jsx
import React from 'react';

const Header = ({ toggleSidebar, toggleDarkMode, darkMode, activePage, view }) => {
  return (
    <header className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-blue-600'} text-white`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">
            {activePage === 'dashboard' && 'Dashboard'}
            {activePage === 'teachers' && (view === 'list' ? 'Teacher Content List' : 'Teacher Articles Management')}
            {activePage === 'students' && 'Students Management'}
          </h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="focus:outline-none"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;