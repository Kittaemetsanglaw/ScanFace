import React, { useState } from 'react';

const Teacher = ({ articles, loading, setArticles }) => {
  const [view, setView] = useState('list'); // 'list' or 'create'
  const [newArticle, setNewArticle] = useState({
    subject: '',
    subTitle: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api-endpoint.com/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });
      
      const data = await response.json();
      
      // Reset form and show list view after successful submission
      setNewArticle({ subject: '', subTitle: '' });
      setView('list');
      
      // Update articles list with new data
      setArticles(prev => [...prev, data]);
    } catch (error) {
      console.error('Error creating article:', error);
      // For demo purposes, just switch back to list view
      setView('list');
    }
  };

  return (
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
          
          {/* Articles List */}
          <div className="space-y-2">
            {articles.map((article) => (
              <div key={article.id} className="bg-gray-200 p-4 rounded flex items-center">
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
          
          {/* Create Form */}
          <div className="bg-blue-600 text-white p-3 mb-4">
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
                className="w-full border p-2 rounded"
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
                className="w-full border p-2 rounded"
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
  );
};

export default Teacher;