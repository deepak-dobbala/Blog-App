import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <ul className='nav bg-black justify-content-end d-flex gap-4 p-3'>
      <li className='nav-item text-light'>
        <Link to="/" className='nav-link text-light'>Home</Link>
      </li>
      <li className='nav-item text-light'>
        <Link to="/login" className='nav-link text-light'>Login/Register</Link>
      </li>
    </ul>
  );
}

export default Header;
