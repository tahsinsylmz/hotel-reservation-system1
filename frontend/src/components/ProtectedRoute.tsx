import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireYonetici?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin,
  requireYonetici,
}: ProtectedRouteProps) {
  const { user, isAdmin, isYonetici } = useAuth();

  if (!user) {
    return <Navigate to="/giris" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireYonetici && !isYonetici) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
} 