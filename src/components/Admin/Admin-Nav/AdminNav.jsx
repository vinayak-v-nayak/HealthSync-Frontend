import React from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library
import './AdminNav.css'; // Importing CSS for styling
import { useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
  const navigate = useNavigate(); 
  // Handle Logout
  function handleLogout() {
    Cookies.remove('adminToken'); // Assuming 'authToken' is the cookie name
    navigate("/admin/login");

  }

  return (
    <div className="admin-navbar">
      <h2 className="navbar-title">Admin Panel</h2>
      <ul className="navbar-links">
        <li><a href="/admin/feedbacks" className="navbar-link">Feedbacks</a></li>
        <li><a href="/admin/users" className="navbar-link">Users</a></li>
        <li>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavBar;
