import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Page/DashBoard/DashBoard';
import HomeScreen from "./components/Page/HomeScreen";
import LoginPage from "./components/Page/LoginPage";
import CourseDetails from "./components/Page/CourseDetails";
import ProtectedRoute from "./components/Page/ProtectedRoute"
import AttendanceList from './components/Page/AttendanceList';
import StudentsList from "./components/Page/StudentsList"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* เปลี่ยนหน้าแรกเป็น Home */}
        <Route path="/" element={<HomeScreen />} />
        
        {/* เพิ่มเส้นทางสำหรับ Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* เส้นทางที่ต้องล็อกอินก่อนเข้า */}
        <Route path="/courses" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/attendance" element={
          <ProtectedRoute>
            <AttendanceList />
          </ProtectedRoute>
        } />
        
      <Route path="/studentslist" element={
        <ProtectedRoute>
          <StudentsList />
        </ProtectedRoute>
      }/>
        

      </Routes>
    </BrowserRouter>
  );
};


export default App;
