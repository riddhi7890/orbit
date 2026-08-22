import React, { useState } from 'react';
import {
  Settings,
  User,
  Lock,
  Bell,
  Sliders,
  Palette,
  Zap,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { refreshAllData } = useAppData();

  const [name, setName] = useState(user?.name || 'Riddhima Sharma');
  const [email, setEmail] = useState(user?.email || 'lead@orbit.city');
  const [role, setRole] = useState(user?.role || 'Chief Intelligence Lead');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [refreshInterval, setRefreshInterval] = useState('manual');
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [autoDispatchThreshold, setAutoDispatchThreshold] = useState(80);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    setPasswordSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px' }}>
      {/* Header Banner */}
      <div
        className="card-orbit card-orbit-highlight"
        style={{ padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--soft-mint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Settings size={20} color="var(--orbit-green)" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Platform & Account Settings
            </h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Manage operator profile, municipal telemetry preferences, and autonomous AI sensitivity.
            </p>
          </div>
        </div>

        <div className="badge badge-mint">
          <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
          System Operational
        </div>
      </div>

      {/* Account Profile Settings Card */}
      <div className="card-orbit" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <User size={18} color="var(--deep-green)" />
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Operator Profile & Municipal Authority
          </h3>
        </div>

        <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '13.5px',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Municipal Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '13.5px',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Operational Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '13.5px',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Jurisdiction Access
            </label>
            <input
              type="text"
              disabled
              value="All City Sectors (Zone A, B, C, D)"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                cursor: 'not-allowed'
              }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            {profileSaved ? (
              <span style={{ fontSize: '12.5px', color: 'var(--deep-green)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={15} color="var(--orbit-green)" /> Profile information saved successfully.
              </span>
            ) : <span />}

            <button type="submit" className="btn-primary" style={{ padding: '9px 18px', fontSize: '13px' }}>
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Change Password Card */}
      <div className="card-orbit" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lock size={18} color="var(--deep-green)" />
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Security & Authentication
          </h3>
        </div>

        <form onSubmit={handleSavePassword} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '13px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '13px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '13px'
              }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {passwordSaved ? (
              <span style={{ fontSize: '12.5px', color: 'var(--deep-green)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={15} color="var(--orbit-green)" /> Password updated successfully.
              </span>
            ) : <span />}

            <button type="submit" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12.5px' }}>
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Dashboard & AI Preferences Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Refresh Rate & Telemetry Frequency */}
        <div className="card-orbit" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={18} color="var(--orbit-green)" />
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
              Dashboard Refresh Frequency
            </h3>
          </div>

          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            Configure automatic polling frequency for smart-bin fill levels and fleet route telematics.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
            {[
              { id: 'manual', label: 'Manual' },
              { id: '15s', label: '15 Seconds' },
              { id: '30s', label: '30 Seconds' },
              { id: '60s', label: '60 Seconds' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setRefreshInterval(opt.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  backgroundColor: refreshInterval === opt.id ? 'var(--soft-mint)' : 'var(--bg-secondary)',
                  border: refreshInterval === opt.id ? '1.5px solid var(--orbit-green)' : '1px solid var(--border)',
                  color: refreshInterval === opt.id ? 'var(--deep-green)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Confidence Threshold Slider */}
        <div className="card-orbit" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={18} color="#0EA5E9" />
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
              AI Detection Preferences
            </h3>
          </div>

          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            Controls the confidence threshold used for automatic AI classification and material purity validation.
          </p>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
              <span>Detection Confidence</span>
              <span style={{ color: 'var(--deep-green)' }}>{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="99"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--orbit-green)' }}
            />
          </div>
        </div>
      </div>

      {/* Appearance & Product Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card-orbit" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--soft-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Palette size={18} color="var(--orbit-green)" />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
              Appearance: Premium White & ORBIT Green
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              High-contrast, clean white theme optimized for command center visibility.
            </div>
          </div>
        </div>

        <div className="card-orbit" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--soft-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Info size={18} color="#0284C7" />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
              ORBIT v2.4 • Smart Waste Intelligence
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Intelligence for a Cleaner Tomorrow.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
