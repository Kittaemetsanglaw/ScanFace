// components/TeachersContent.jsx
import React from 'react';
import ArticleList from './ArticleList';
import ArticleForm from './ArticleForm';

const TeachersContent = ({ view, articles, setView, newArticle, handleInputChange, handleSubmit, loading, darkMode }) => {
  return (
    <>
      {view === 'list' ? (
        <ArticleList
          articles={articles}
          setView={setView}
          darkMode={darkMode}
        />
      ) : (
        <ArticleForm
          newArticle={newArticle}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default TeachersContent;