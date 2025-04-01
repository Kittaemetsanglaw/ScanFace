import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Page/DashBoard/DashBoard';
import HomeScreen from "./components/Page/HomeScreen";
import LoginPage from "./components/Page/LoginPage";
import CourseDetails from "./components/Page/InstructorPage/CourseDetails";
import ProtectedRoute from "./components/Page/ProtectedRoute"
import AttendanceList from './components/Page/StudentsPage/AttendanceList';
import StudentsList from "./components/Page/StudentsPage/StudentsList"
import AdminDashboard from './components/Page/AdminPage/AdminDashboard';
import AttendanceTracker from './components/Page/InstructorPage/AttendanceTracker';

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
        
        <Route path="/coursesdetail" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <CourseDetails />
          </ProtectedRoute>
        } />

        <Route path="/coursestracker" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <AttendanceTracker />
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
