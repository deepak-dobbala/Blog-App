import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { axioswithtoken } from '../axioswithtoken';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Articlecomponent() {
  const { username, articleID } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [editedArticle, setEditedArticle] = useState({
    title: '',
    content: '',
    category: ''
  });
  const {userinfo} = useSelector(state=>state.userauthorlogin)

  // ... existing code ...

async function editarticle() {
  if (editMode) {
    try {
      const updatedArticle = {
        title: editedArticle.title,
        content: editedArticle.content,
        category: editedArticle.category,
        username: article.username,
        articleID: articleID,
        dateofcreation: article.dateofcreation,
        dateoflastupdate: new Date(),
        comments: article.comments,
        status: article.status
      };

      const response = await axioswithtoken.put(`/authors-api/update-article/${articleID}`, updatedArticle);
      if (response.status === 200) {
        setArticle(updatedArticle); // Update local state immediately
        setEditMode(false);
        getarticle(); // Refresh article data from server
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update article');
    }
  } else {
    setEditedArticle({
      title: article.title,
      content: article.content,
      category: article.category
    });
    setEditMode(true);
  }
}

// ... existing code ...

  async function addcomment() {
    if (!commentText.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      const commentData = {
        text: commentText,
        username: userinfo.username,
        articleID: articleID
      };
      const response = await axioswithtoken.post(`/users-api/add-comment/${articleID}`, commentData);
      if (response.status === 200) {
        setCommentText('');
        getarticle(); // Refresh article data to show new comment
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    }
  }
  
  const getarticle = async () => {
    try {
      console.log(`/auth/article/${username}/${articleID}`)
      let res = await axioswithtoken.get(`/auth/article/${username}/${articleID}`);
      setArticle(res.data.payload);
      console.log(res)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch article');
    }
  }

  useEffect(() => {
    console.log(`/auth/article/${username}/${articleID}`)
    if (username && articleID) {
      getarticle();
    }
  }, [username, articleID]);
  if(error){
    return <div>{error}</div>
  }
  if (!article) return <div>Loading...</div>;


  return (
    <div className="container mt-4">
      {editMode ? (
        <div className="card">
          <div className="card-body">
            <input
              type="text"
              className="form-control mb-3"
              value={editedArticle.title}
              onChange={(e) => setEditedArticle({...editedArticle, title: e.target.value})}
            />
            <select
              className="form-select mb-3"
              value={editedArticle.category}
              onChange={(e) => setEditedArticle({...editedArticle, category: e.target.value})}
            >
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
              <option value="Health">Health</option>
              <option value="Sports">Sports</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <textarea
              className="form-control mb-3"
              rows="5"
              value={editedArticle.content}
              onChange={(e) => setEditedArticle({...editedArticle, content: e.target.value})}
            />
            <button className="btn btn-primary" onClick={editarticle}>Save Changes</button>
            <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{article?.title}</h2>
            <h6 className="card-subtitle mb-2 text-muted">
              By: {article?.username} | Category: {article?.category}
            </h6>
            <p className="card-text mt-3">{article?.content}</p>
            
            <div className="mt-4">
              <h5>Comments</h5>
              {!userinfo?.userType === 'author' && (
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment..."
                  />
                  <button className="btn btn-secondary mt-2" onClick={addcomment}>Add Comment</button>
                </div>
              )}
              {article?.comments && article.comments.length > 0 ? (
                article.comments.map((comment, index) => (
                  <div key={index} className="card mb-2">
                    <div className="card-body">
                      <p className="card-text">{comment.text}</p>
                      <small className="text-muted">By: {comment.username}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {userinfo?.userType === 'author' && !editMode && (
        <button className="btn btn-primary mt-3" onClick={editarticle}>Edit Article</button>
      )}
    </div>
  );
}

export default Articlecomponent

