// Authentication Service

import { apiClient } from './api';

export async function loginUser(email, password, roleType = 'operator') {
  const isAuthority = roleType === 'authority';

  const defaultOperatorUser = {
    name: 'Riddhima Sharma',
    email: email || 'operator@orbit.eco',
    role: 'Waste Operations Lead',
    roleType: 'operator',
    department: 'Treatment Operations & Recycling Division',
    zone_access: 'Central Treatment Hub & Recycling Sectors',
    avatar_initials: 'RS'
  };

  const defaultAuthorityUser = {
    name: 'Dr. Alok Verma',
    email: email || 'authority@orbit.gov',
    role: 'Municipal Commissioner & Smart City Authority',
    roleType: 'authority',
    department: 'Urban Waste Management & Environmental Oversight',
    zone_access: 'City-Wide Metropolitan Jurisdiction',
    avatar_initials: 'AV'
  };

  const mockUser = isAuthority ? defaultAuthorityUser : defaultOperatorUser;

  try {
    const { data } = await apiClient('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role: roleType }),
      timeout: 3000
    });
    return {
      token: data.token || 'orbit_jwt_demo_token_authenticated',
      user: data.user ? { ...mockUser, ...data.user, roleType } : mockUser,
      isMock: false
    };
  } catch (err) {
    // Demo / offline authentication fallback
    return {
      token: 'orbit_jwt_demo_token_authenticated',
      user: mockUser,
      isMock: true
    };
  }
}

export function logoutUser() {
  localStorage.removeItem('orbit_auth_token');
  localStorage.removeItem('orbit_user_session');
  sessionStorage.removeItem('orbit_auth_token');
  sessionStorage.removeItem('orbit_user_session');
}

