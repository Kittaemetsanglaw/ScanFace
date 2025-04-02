import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-center">Student</h3>
          <p className="text-4xl font-bold text-center mt-2">12</p>
        </div>
        
        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-center">Teacher</h3>
          <p className="text-4xl font-bold text-center mt-2">12</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;