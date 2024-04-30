import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
  const { state } = useAuth();

  return (
    <Route
      {...rest}
      element={state.isAuthenticated ? children : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
