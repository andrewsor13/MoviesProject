import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Store/AuthContext';

export default function PrivateRoutes() {
  const { user } = useAuth();
  const isAuth = !!user;

  return isAuth ? <Outlet /> : <Navigate to="/signIn" replace />;
}
