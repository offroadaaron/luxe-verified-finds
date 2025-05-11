
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { user, isAdmin, isLoading } = useAuth();
  const [isLocalAdmin, setIsLocalAdmin] = useState<boolean>(false);
  
  useEffect(() => {
    // Check localStorage for admin status
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsLocalAdmin(adminStatus);
  }, []);
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // Allow access if they're either a Supabase admin or if they've logged in via the admin page
  if (!user && !isLocalAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  if (!isAdmin && !isLocalAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedAdminRoute;
