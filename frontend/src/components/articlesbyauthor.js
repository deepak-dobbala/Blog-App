import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axioswithtoken } from '../axioswithtoken';

function Articlesbyauthor() {
  let [articles, setArticles] = useState([]);
  let { userinfo } = useSelector(state => state.userauthorlogin);
  const navigate = useNavigate();

  const getArticles = async () => {
    let res = await axioswithtoken.get(`/authors-api/articles/${userinfo.username}`);
    console.log(res.data.payload);
    setArticles(res.data.payload);
  }

  useEffect(() => {
    getArticles();
  }, []);

  const displayarticle = (username, articleID) => {
    console.log(`/auth/article/${username}/${articleID}`)
    navigate(`/authorprofile/article/${username}/${articleID}`);
  }

  return (
    <div className="container mt-4">
      {articles.length === 0 ? <h1>No articles</h1> : (
        <div>
          <h1 className="mb-4">Articles</h1>
          <div className="d-flex flex-wrap gap-2 justify-content-start">
            {articles.map(article => (
              <div key={article.articleID} className="card" style={{ width: '30%', minWidth: '300px' }} onClick={() => displayarticle(article.username, article.articleID)}>
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{article.category}</h6>
                  <p className="card-text">{article.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Articlesbyauthor;