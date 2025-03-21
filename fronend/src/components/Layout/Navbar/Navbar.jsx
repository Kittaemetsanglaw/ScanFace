import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-white h-100 p-4 text-zinc-800 w-59 ">
      <div className="flex items-center space-x-2 mb-10">
        <span className="icon">💻</span>
        <span className="text-xl font-bold">CPE-495</span>
      </div>
      <ul className="space-y-4">
        <li><a href="#dashboard" className="flex items-center space-x-2 hover:text-gray-400"><span className="icon">📊</span><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li>
        <li><a href="#notification" className="flex items-center space-x-2 hover:text-gray-400"><span className="icon">🔔 </span><i className="fas fa-notification-alt"></i><span>Notification</span></a></li>
        <li><a href="#log" className="flex items-center space-x-2 hover:text-gray-400"><span className="icon">📄</span><i className="fas fa-calendar-alt"></i><span>Log</span></a></li>
        <li><a href="#profile" className="flex items-center space-x-2 hover:text-gray-400"><span className="icon">👤</span><i className="fas fa-user"></i><span>Profile</span></a></li>
        <li><a href="#settings" className="flex items-center space-x-2 hover:text-gray-400"><span className="icon">⚙️</span><i className="fas fa-cog"></i><span>Settings</span></a></li>
       
      </ul>
    </div>
  );
};

export default Navbar;
