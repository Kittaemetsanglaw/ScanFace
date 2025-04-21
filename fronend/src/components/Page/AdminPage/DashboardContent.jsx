// components/DashboardContent.jsx
import React from 'react';

const DashboardContent = ({ darkMode }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded shadow ${darkMode ? 'bg-blue-800' : 'bg-blue-500'} text-white`}>
          <h3 className="text-xl font-semibold text-center">Student</h3>
          <p className="text-4xl font-bold text-center mt-2">12</p>
        </div>

        <div className={`p-6 rounded shadow ${darkMode ? 'bg-blue-800' : 'bg-blue-500'} text-white`}>
          <h3 className="text-xl font-semibold text-center">Teacher</h3>
          <p className="text-4xl font-bold text-center mt-2">12</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;