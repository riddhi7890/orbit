import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Sparkles, User, Settings, LogOut, Menu, RefreshCw, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'AI-powered intelligence for a cleaner, smarter city.' },
  '/waste-scanner': { title: 'AI Waste Scanner', subtitle: 'Real-time multi-spectral neural waste classification & material segregation.' },
  '/smart-city-map': { title: 'Smart Waste Treatment Network', subtitle: 'Real-time view of treatment facilities, recycling centers, collection zones, and resource recovery infrastructure.' },
  '/collection-priority': { title: 'Collection Priority Intelligence', subtitle: 'Predictive priority sequence and automated fleet route dispatching.' },
  '/waste-analytics': { title: 'Waste & Treatment Analytics', subtitle: 'Deep-stream segregation compliance, treatment tonnage, and recovery efficiency.' },
  '/resource-recovery': { title: 'Resource Recovery Intelligence', subtitle: 'Circular economy yields, carbon offset metrics, and secondary raw materials.' },
  '/ai-assistant': { title: 'ORBIT AI Intelligence', subtitle: 'Natural language waste intelligence, operational analysis & action dispatcher.' },
  '/settings': { title: 'Platform Settings', subtitle: 'System preferences, sensor telemetry sensitivity, and AI configurations.' },
};

export default function Header({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { isDemoMode, refreshAllData, loading, setIsSearchOpen } = useAppData();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentMeta = PAGE_TITLES[location.pathname] || {
    title: 'ORBIT Intelligence',
    subtitle: 'Intelligence for a Cleaner Tomorrow.'
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await refreshAllData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        height: '70px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          className="btn-ghost"
          style={{ padding: '8px', display: 'none' }}
          id="mobile-sidebar-toggle"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} color="var(--text-primary)" />
        </button>

        <div>
          <h1
            style={{
              fontSize: '19px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              lineHeight: 1.2
            }}
          >
            {currentMeta.title}
          </h1>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: '500',
              marginTop: '1px'
            }}
          >
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls: Search, AI Status, Refresh, Profile (NO notifications) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            padding: '7px 14px',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.15s ease'
          }}
          title="Search bins, zones, or materials (Ctrl+K)"
        >
          <Search size={16} color="var(--text-muted)" />
          <span style={{ color: 'var(--text-muted)' }}>Search bins or zones...</span>
          <kbd
            style={{
              fontSize: '10px',
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '1px 5px',
              color: 'var(--text-muted)'
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Data Refresh Button */}
        <button
          onClick={handleManualRefresh}
          className="btn-ghost"
          style={{ padding: '8px 10px', borderRadius: '8px' }}
          title="Refresh real-time intelligence data"
        >
          <RefreshCw
            size={16}
            color="var(--text-secondary)"
            style={{
              animation: refreshing || loading ? 'spin-slow 1s linear infinite' : 'none'
            }}
          />
        </button>

        {/* Profile Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 8px 4px 4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.15s ease'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '12px'
              }}
            >
              {user?.avatar_initials || 'RS'}
            </div>
            <div style={{ textAlign: 'left' }} className="hide-mobile">
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                {user?.name || 'Riddhima Sharma'}
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                {user?.role || 'Chief Intelligence Lead'}
              </div>
            </div>
          </button>

          {/* Dropdown Menu - NO notifications */}
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '240px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '8px',
                zIndex: 60,
                animation: 'float-subtle 0.2s ease-out'
              }}
            >
              <div
                style={{
                  padding: '10px 12px 8px',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '6px'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {user?.name || 'Riddhima Sharma'}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  {user?.email || 'lead@orbit.city'}
                </div>
                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '600',
                    color: 'var(--deep-green)',
                    marginTop: '4px'
                  }}
                >
                  ● {user?.zone_access || 'City-Wide Authority'}
                </div>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/settings');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                className="btn-ghost"
              >
                <Settings size={15} color="var(--text-secondary)" />
                Settings & API Status
              </button>

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--status-critical)',
                  textAlign: 'left',
                  marginTop: '4px',
                  transition: 'all 0.15s ease'
                }}
                className="btn-ghost"
              >
                <LogOut size={15} color="var(--status-critical)" />
                Sign Out of ORBIT
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
