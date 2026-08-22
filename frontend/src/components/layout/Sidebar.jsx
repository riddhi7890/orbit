import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  MapPin,
  ListOrdered,
  BarChart3,
  Recycle,
  BotMessageSquare,
  Settings,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Waste Scanner', path: '/waste-scanner', icon: ScanLine },
  { name: 'Smart Waste Treatment Network', path: '/smart-city-map', icon: MapPin },
  { name: 'Collection Priority', path: '/collection-priority', icon: ListOrdered },
  { name: 'Waste & Treatment Analytics', path: '/waste-analytics', icon: BarChart3 },
  { name: 'Resource Recovery', path: '/resource-recovery', icon: Recycle },
  { name: 'ORBIT AI', path: '/ai-assistant', icon: BotMessageSquare },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
            display: 'block'
          }}
        />
      )}

      <aside
        style={{
          width: '260px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '24px 20px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid var(--border-light)'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(32, 166, 106, 0.3)',
              position: 'relative'
            }}
          >
            <img src="/orbit-logo.svg" alt="ORBIT" style={{ width: '26px', height: '26px' }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                className="brand-font"
                style={{
                  fontSize: '22px',
                  fontWeight: '800',
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.1
                }}
              >
                ORBIT
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  background: 'var(--soft-mint)',
                  color: 'var(--deep-green)',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  border: '1px solid rgba(32, 166, 106, 0.25)'
                }}
              >
                AI v2.4
              </span>
            </div>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--text-secondary)',
                fontWeight: '500',
                letterSpacing: '-0.01em',
                marginTop: '1px'
              }}
            >
              Smart Waste Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            flex: 1,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            overflowY: 'auto'
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              padding: '6px 12px 4px'
            }}
          >
            Navigation
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? 'var(--deep-green)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--soft-mint)' : 'transparent',
                  border: isActive ? '1px solid rgba(32, 166, 106, 0.25)' : '1px solid transparent',
                  transition: 'all 0.15s ease'
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      color={isActive ? 'var(--orbit-green)' : 'currentColor'}
                      strokeWidth={isActive ? 2.3 : 1.8}
                    />
                    <span style={{ flex: 1 }}>{item.name}</span>
                    {isActive && (
                      <ChevronRight size={14} color="var(--deep-green)" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer System Status - NO notifications */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div className="pulse-dot" />
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                ORBIT AI Online
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                System Operational
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
