import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Authentication';
import "../styles/Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {currentUser && <li><Link to="/create">Add Movie</Link></li>}
          {currentUser && <li><Link to="/favorites">Favorites</Link></li>}
          <li><Link to="/about">About</Link></li>
        </ul> 
      </div>
      <ul className="auth-links">
        {currentUser ? (
          <>
            <li className='email'>{currentUser.email}</li>
            <li className='logout'><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li className='login'><Link to="/login">Login</Link></li>
            <li className='register'><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
