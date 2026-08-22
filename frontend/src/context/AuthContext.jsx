import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser as logoutService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitializingOrbit, setIsInitializingOrbit] = useState(false);
  const [initPhaseIndex, setInitPhaseIndex] = useState(0);

  const initPhases = [
    "Initializing ORBIT AI...",
    "Scanning city data...",
    "Analyzing waste streams...",
    "Loading smart bins...",
    "Activating predictive intelligence..."
  ];

  // Restore saved session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('orbit_auth_token') || sessionStorage.getItem('orbit_auth_token');
    const savedUser = localStorage.getItem('orbit_user_session') || sessionStorage.getItem('orbit_user_session');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('orbit_auth_token');
        localStorage.removeItem('orbit_user_session');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, remember = true, roleType = 'operator') => {
    const res = await loginUser(email, password, roleType);
    
    // Save state
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('orbit_auth_token', res.token);
    storage.setItem('orbit_user_session', JSON.stringify(res.user));

    setUser(res.user);
    setToken(res.token);

    // Trigger ORBIT AI 5-step sequence
    setIsInitializingOrbit(true);
    setInitPhaseIndex(0);

    return res;
  };

  const switchActiveRole = (newRoleType) => {
    if (!user) return;
    const isAuthority = newRoleType === 'authority';
    const updatedUser = {
      ...user,
      roleType: newRoleType,
      name: isAuthority ? 'Dr. Alok Verma' : 'Riddhima Sharma',
      email: isAuthority ? 'authority@orbit.gov' : 'operator@orbit.eco',
      role: isAuthority ? 'Municipal Commissioner & Smart City Authority' : 'Waste Operations Lead',
      zone_access: isAuthority ? 'City-Wide Metropolitan Jurisdiction' : 'Central Treatment Hub & Recycling Sectors',
      avatar_initials: isAuthority ? 'AV' : 'RS'
    };
    setUser(updatedUser);
    localStorage.setItem('orbit_user_session', JSON.stringify(updatedUser));
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
    setIsInitializingOrbit(false);
  };

  const completeInitSequence = () => {
    setIsInitializingOrbit(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        role: user?.roleType || 'operator',
        isAuthority: user?.roleType === 'authority',
        isOperator: user?.roleType !== 'authority',
        loading,
        login,
        logout,
        switchActiveRole,
        isInitializingOrbit,
        setIsInitializingOrbit,
        initPhaseIndex,
        setInitPhaseIndex,
        initPhases,
        completeInitSequence
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
