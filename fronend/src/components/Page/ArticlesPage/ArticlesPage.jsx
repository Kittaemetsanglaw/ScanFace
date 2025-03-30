import React, { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Topbar from "./Layout/Topbar";

const API_URL = "http://your-api-url.com/articles";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newArticle, setNewArticle] = useState({ subject: "", subtitle: "" });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });
      setShowModal(false);
      fetchArticles();
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  return (
    <div className="flex">
      {/* Navbar ด้านซ้าย */}
      <Navbar />

      {/* Content ด้านขวา */}
      <div className="flex-1 flex flex-col">
        {/* Topbar ด้านบน */}
        <Topbar />

        {/* Articles Content */}
        <div className="flex-1 bg-white p-4 grid grid-cols-4 gap-4 min-h-screen">
          {/* กล่องแสดงรายการบทความ */}
          <div className="bg-white text-black rounded-lg p-4 shadow-md col-span-3">

            <button
              className="bg-blue-600 text-white px-5 py-2 rounded mb-4"
              onClick={() => setShowModal(true)}
            >
              Add Articles
            </button>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">No.</th>
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Subtitle</th>
                  <th className="border border-gray-300 px-4 py-2">Update</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">ไม่พบข้อมูลบทความ</td>
                  </tr>
                ) : (
                  articles.map((article, index) => (
                    <tr key={article.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2">{article.subject}</td>
                      <td className="border border-gray-300 px-4 py-2">{article.subtitle}</td>
                      <td className="border border-gray-300 px-4 py-2">{article.updated_at}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button className="bg-blue-500 text-white px-3 py-1 mr-2 rounded">
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(article.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* กล่องเพิ่มบทความ */}
          {showModal && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add New Article</h2>
                <input
                  type="text"
                  placeholder="Subject"
                  className="border p-2 w-full mb-2"
                  value={newArticle.subject}
                  onChange={(e) => setNewArticle({ ...newArticle, subject: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Subtitle"
                  className="border p-2 w-full mb-2"
                  value={newArticle.subtitle}
                  onChange={(e) => setNewArticle({ ...newArticle, subtitle: e.target.value })}
                />
                <div className="flex justify-end">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 mr-2 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleAdd}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
