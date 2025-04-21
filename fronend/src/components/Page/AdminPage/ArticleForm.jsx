// components/ArticleForm.jsx
import React from 'react';

const ArticleForm = ({ newArticle, handleInputChange, handleSubmit, loading, darkMode }) => {
  return (
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
  );
};

export default ArticleForm;