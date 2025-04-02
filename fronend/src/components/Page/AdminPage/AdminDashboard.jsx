import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './DashBoard';
import Student from './Student';
import Teacher from './Teacher';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://your-api-endpoint.com/articles');
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        // For demo purposes, load dummy data
        setArticles([
          { id: '12345686', createdBy: 'admin@example.com' },
          { id: '13345958', createdBy: 'demo@example.com' },
          { id: '12345680', createdBy: 'editor@example.com' },
          { id: '12345688', createdBy: 'content@example.com' }
        ]);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');

    // In a real app, you'd redirect to login
    // Without router, we can only simulate this
    alert('Logged out successfully');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

      <div className={`flex-1 ${sidebarOpen ? 'ml-48' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        <Header 
          activePage={activePage} 
          toggleSidebar={toggleSidebar} 
        />

        <main className="p-6">
          {activePage === 'dashboard' && <Dashboard />}
          
          {activePage === 'teachers' && (
            <Teacher articles={articles} loading={loading} setArticles={setArticles} />
          )}

          {activePage === 'students' && <Student />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;