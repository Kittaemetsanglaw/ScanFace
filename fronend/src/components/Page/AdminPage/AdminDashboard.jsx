import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const [darkMode, setDarkMode] = useState(false); // Added dark mode state

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
            <div
                className={`${
                    sidebarOpen ? 'w-48' : 'w-0 -ml-64'
                } ${darkMode ? 'bg-black' : 'bg-black'} text-white transition-all duration-300 ease-in-out fixed h-full z-10`}
            >
                <div className="p-4 bg-gray-800">
                    <h2 className="text-xl font-semibold">Admin Management</h2>
                </div>
                <nav className="mt-6">
                    <button
                        onClick={() => setActivePage('dashboard')}
                        className={`flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activePage === 'dashboard' ? 'bg-gray-700 text-white' : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActivePage('teachers')}
                        className={`flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activePage === 'teachers' ? 'bg-gray-700 text-white' : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        Teacher
                    </button>
                    <button
                        onClick={() => setActivePage('students')}
                        className={`flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activePage === 'students' ? 'bg-gray-700 text-white' : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        Student
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 8a1 1 0 11-2 0v-1H7.5a2.5 2.5 0 100 5H12v1a1 1 0 011-2 0V8z" clipRule="evenodd" />
                        </svg>
                        Logout
                    </button>
                </nav>
            </div>

            <div className={`flex-1 ${sidebarOpen ? 'ml-48' : 'ml-0'} transition-all duration-300 ease-in-out`}>
                <header className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-blue-600'} text-white`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={toggleSidebar}
                                className="text-white focus:outline-none mr-4"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold">
                                {activePage === 'dashboard' && 'Dashboard'}
                                {activePage === 'teachers' && (view === 'list' ? 'Teacher Content List' : 'Teacher Articles Management')}
                                {activePage === 'students' && 'Students Management'}
                            </h1>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className="focus:outline-none"
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </header>

                <main className="p-6">
                    {activePage === 'dashboard' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className={`p-6 rounded shadow ${darkMode ? 'bg-blue-800' : 'bg-blue-500'} text-white`}>
                                    <h3 className="text-xl font-semibold text-center">Student</h3>
                                    <p className="text-4xl font-bold text-center mt-2">12</p>
                                </div>

                                <div className={`p-6 rounded shadow ${darkMode ? 'bg-blue-800' : 'bg-blue-500'} text-white`}>
                                    <h3 className="text-xl font-semibold text-center">Teacher</h3>
                                    <p className="text-4xl font-bold text-center mt-2">12</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activePage === 'teachers' && (
                        <>
                            {view === 'list' ? (
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <h2 className="text-xl font-semibold">Teacher Content List</h2>
                                        <button
                                            onClick={() => setView('create')}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Add Teacher Article
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {articles.map((article) => (
                                            <div key={article.id} className={`p-4 rounded flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                <div className="bg-gray-400 rounded-full p-2 mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div>{article.id}</div>
                                                    <div className="text-sm text-gray-600">{article.createdBy}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Teacher Articles Management</h2>

                                    <div className={`p-3 mb-4 ${darkMode ? 'bg-gray-900' : 'bg-blue-600'} text-white`}>
                                        <h3 className="font-medium">Create Teacher Article</h3>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block mb-1">Subject</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={newArticle.subject}
                                                onChange={handleInputChange}
                                                className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-1">Sub Title</label>
                                            <input
                                                type="text"
                                                name="subTitle"
                                                value={newArticle.subTitle}
                                                onChange={handleInputChange}
                                                className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                                                required
                                            />
                                        </div>

                                        <div className="text-right">
                                            <button
                                                type="submit"
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                                disabled={loading}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}

                    {activePage === 'students' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Students Management</h2>
                            <p>Students management content will go here</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;