import React from 'react';
import Navbar from './components/Layout/Navbar/Navbar';
import Topbar from './components/Layout/TopBar/Topbar';
import Dashboard from './components/DashBoard/DashBoard';


function App() {
  return (

    <div className="flex">
      {/* Navbar ด้านซ้าย */}
      <Navbar />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar ด้านบน */}
        <Topbar />
        
        {/* Dashboard Content */}
        <Dashboard />
      </div>
    </div>
   
  );
}

export default App;