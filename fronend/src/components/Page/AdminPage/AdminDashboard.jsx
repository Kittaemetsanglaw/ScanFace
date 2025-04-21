// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';
import TeachersContent from './TeachersContent';
import StudentsContent from './StudentsContent';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [view, setView] = useState('list');
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({
        subject: '',
        subTitle: ''
    });
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState('dashboard');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://your-api-endpoint.com/articles');
                const data = await response.json();
                setArticles(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching articles:', error);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await fetch('https://your-api-endpoint.com/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });

            const data = await response.json();

            setNewArticle({ subject: '', subTitle: '' });
            setView('list');

            setArticles(prev => [...prev, data]);
            setLoading(false);
        } catch (error) {
            console.error('Error creating article:', error);
            setView('list');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/login');
        alert('Logged out successfully');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            <Sidebar
                sidebarOpen={sidebarOpen}
                activePage={activePage}
                setActivePage={setActivePage}
                handleLogout={handleLogout}
            />

            <div className={`flex-1 ${sidebarOpen ? 'ml-48' : 'ml-0'} transition-all duration-300 ease-in-out`}>
                <Header
                    toggleSidebar={toggleSidebar}
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                    activePage={activePage}
                    view={view}
                />

                <main className="p-6">
                    {activePage === 'dashboard' && <DashboardContent darkMode={darkMode} />}

                    {activePage === 'teachers' && (
                        <TeachersContent
                            view={view}
                            articles={articles}
                            setView={setView}
                            newArticle={newArticle}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            darkMode={darkMode}
                        />
                    )}

                    {activePage === 'students' && <StudentsContent />}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;