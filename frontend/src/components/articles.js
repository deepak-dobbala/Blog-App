import React from 'react'
import { useEffect, useState } from 'react';
import { axioswithtoken } from '../axioswithtoken';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Articles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { userinfo } = useSelector(state => state.userauthorlogin);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axioswithtoken.get('/users-api/articles');
        setArticles(response.data.payload);
      } catch (err) {
        console.error('Error fetching articles:', err);
        alert('Failed to fetch articles');
      }
    };
    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    navigate(`/userprofile/article/${article.username}/${article.articleID}`);
};

  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Articles</h1>
      <div className="d-flex flex-wrap gap-3">
        {articles.length === 0 ? (
          <p>No articles available</p>
        ) : (
          articles.map(article => (
            <div 
              key={article.articleID} 
              className="card" 
              style={{ width: '30%', minWidth: '300px', cursor: 'pointer' }}
              onClick={() => handleArticleClick(article)}
            >
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  By: {article.username} | {article.category}
                </h6>
                <p className="card-text">
                  {article.content.substring(0, 150)}...
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Articles;