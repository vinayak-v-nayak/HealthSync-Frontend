// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminPrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get('adminToken'); // Assuming the token is stored in cookies

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, allow access to the page
  return children;
};

export default AdminPrivateRoute;
