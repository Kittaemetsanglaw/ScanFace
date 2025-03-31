import React from 'react';
import { Link } from 'react-router-dom';

const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  navigate('/login');
};

const Topbar = () => {
  return (
    <div className="bg-white text-black p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
      <button 
          className="bg-white px-4 py-2 rounded-md font-medium"
          onClick={handleLogout}
        >
          Log out
        </button>
        
      </div>
    </div>
  );
};

export default Topbar;
