import React from 'react'
import Articles from './articles'
import { Outlet } from'react-router-dom'
function Userprofile() {
  return (
    <div>
      <h1>User Profile</h1>
      <Outlet/>
    </div>
  )
}

export default Userprofile
