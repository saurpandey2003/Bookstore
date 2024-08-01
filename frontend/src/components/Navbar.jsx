import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Stores/auth'; // Adjust the path as needed

const Navbar = () => {
  // Use useSelector to get the authentication state
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogout = () => {
   
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Dispatch logout action
    dispatch(logout());

    // Navigate to the home page
    navigate('/');
  };

  // Define the navbar items with conditional rendering
  const navItems = [
    { title: 'Home', to: '/' },
    { title: 'About Us', to: '/about' },
    { title: 'All Books', to: '/allBooks' },
    ...(isLoggedIn ? [{ title: 'Profile', to: '/profile' },  { title: 'Cart', to: '/cart' }] : []), // Include Profile link only if logged in
  ];

  return (
    <nav className="navbar navbar-expand-lg custom-navbar" style={{ backgroundColor: '#aad6ec' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">BookStore</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link text-white btn btn-light" to={item.to}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className="d-flex">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="btn btn-outline-light me-2" type="button">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-light me-2" type="button">Signup</button>
                </Link>
              </>
            ) : (
              <button className="btn btn-outline-light" type="button" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
