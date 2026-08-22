import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import OrbitInitLoader from '../ai/OrbitInitLoader';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, isInitializingOrbit } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          gap: '16px'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <img src="/orbit-logo.svg" alt="ORBIT" style={{ width: '32px', height: '32px' }} />
        </div>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--deep-green)' }}>
          Loading ORBIT Platform...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isInitializingOrbit) {
    return <OrbitInitLoader />;
  }

  return children;
}
