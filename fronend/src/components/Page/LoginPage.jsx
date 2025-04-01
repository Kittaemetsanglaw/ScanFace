import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // เลือกบทบาทผู้ใช้
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      // Store user info in localStorage
      localStorage.setItem('user', username);
      localStorage.setItem('role', role); // เก็บ role

      // Redirect ตาม role
      switch (role) {
        case 'student':
          navigate('/');
          break;
        case 'teacher':
          navigate('/');
          break;
        case 'admin':
          navigate('/');
          break;
        default:
          navigate('/');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-normal text-center text-gray-400 mb-8">User Log in</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 bg-gray-100 rounded border-none"
              placeholder="Username or ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="w-full p-3 bg-gray-100 rounded border-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Dropdown เลือกบทบาท */}
          <div className="mb-4">
            <select
              className="w-full p-3 bg-gray-100 rounded border-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="w-full p-3 bg-[#131B62] text-white rounded uppercase font-bold">
            LOGIN
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-400">Forgot </span>
          <a href="#" className="text-blue-600">Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
