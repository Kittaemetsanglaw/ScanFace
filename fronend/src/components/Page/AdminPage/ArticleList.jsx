// components/ArticleList.jsx
import React from 'react';

const ArticleList = ({ articles, setView, darkMode }) => {
  return (
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
  );
};

export default ArticleList;