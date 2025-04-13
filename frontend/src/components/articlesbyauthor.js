import React from 'react'
import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import { axioswithtoken } from '../axioswithtoken';

function Articlesbyauthor() {
  let [articles,setArticles]=useState([]);
  let {userinfo} = useSelector(state => state.userauthorlogin);
  const getArticles=async()=>{
    //let res= await axioswithtoken.get(`/authors-api/articles/${userinfo.username}`)
    //console.log(res.data);
  }

  useEffect(() => {
    getArticles();
  },[])

  return (
    <div>
      {articles.length===0?<h1>No articles</h1>:<h1>Articles</h1>}
    </div>
  )
}

export default Articlesbyauthor;
