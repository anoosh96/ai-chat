import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  // Check if the user is logged in by checking for a token in localStorage
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  // If the user is authenticated, render the child routes
  if (isAuthenticated) {
    return <Outlet />;
  }

  // If the user is not authenticated, redirect to the login page
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
