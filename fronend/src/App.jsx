import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Page/DashBoard/DashBoard';
import HomeScreen from "./components/Page/HomeScreen";
import LoginPage from "./components/Page/LoginPage";
import CourseDetails from "./components/Page/CourseDetails";
import ProtectedRoute from "./components/Page/ProtectedRoute"
import AttendanceList from './components/Page/AttendanceList';
import StudentsList from "./components/Page/StudentsList"
import AdminDashboard from './components/Page/AdminPage/AdminDashboard';

import config from '../config/config'; // หรือปรับ path ให้ตรงกับโครงสร้างโปรเจกต์ของคุณ

const App = () => {
  return (           
    <BrowserRouter>
      <Routes>
        {/* หน้าแรก */}
        <Route path="/" element={<HomeScreen />} />

        {/* หน้า Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Role-based protected routes */}
        <Route path="/courses" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/attendance" element={
          <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
            <AttendanceList />
          </ProtectedRoute>
        } />

        <Route path="/studentslist" element={
          <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
            <StudentsList />
          </ProtectedRoute>
        } />


        <Route path="/admindashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
