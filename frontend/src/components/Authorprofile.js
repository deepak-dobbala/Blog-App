import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Authorprofile() {
  const {userinfo} = useSelector(state => state.userauthorlogin);
  return (
    <div>
      <h1>Author Profile</h1>
      <ul className='nav justify-content-center d-flex gap-4 p-3'>
        <li className='nav-item'>
          <Link to={`/authorprofile/articlesbyauthor/${userinfo.username}`} className='nav-link'>Articles by Author</Link>
        </li>
        <li className='nav-item'>
          <Link to="/authorprofile/newarticle" className='nav-link'>New Article</Link>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default Authorprofile