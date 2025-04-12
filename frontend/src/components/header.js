import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetstate } from '../redux/slices/userlogin';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem('userinfo');
    dispatch(resetstate());
    navigate('/login');
  }

  let {loggedin, userinfo} = useSelector(state => state.userauthorlogin);
  return (
    <ul className='nav bg-black justify-content-end d-flex gap-4 p-3'>
      <li className='nav-item'>
        <Link to="/" className='nav-link text-light'>Home</Link>
      </li>
      {loggedin ? (
        <>
          <li className='nav-item text-light'>
            <Link to='/login'className='nav-link text-light'>{userinfo.username}</Link>
          </li>
          <li className='nav-item'>
            <span className='nav-link text-light' style={{ cursor: 'pointer' }} onClick={logout}>Logout</span>
          </li>
        </>
      ) : (
        <li className='nav-item'>
          <Link to="/login" className='nav-link text-light'>Login/Register</Link>
        </li>
      )}
    </ul>
  );
}

export default Header;
