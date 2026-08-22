import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Recycle,
  Building2,
  Cpu,
  ArrowLeft,
  Activity,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Step state: null (Role selection) or 'operator' | 'authority'
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('orbit2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectRole = (roleType) => {
    setSelectedRole(roleType);
    setError('');
    if (roleType === 'operator') {
      setEmail('operator@orbit.eco');
      setPassword('orbit2026');
    } else {
      setEmail('authority@orbit.gov');
      setPassword('orbit2026');
    }
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, rememberMe, selectedRole || 'operator');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
      setLoading(false);
    }
  };

  const isOperator = selectedRole === 'operator';
  const isAuthority = selectedRole === 'authority';

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="orbit-grid-bg orbit-glow-bg"
    >
      {/* Background Decorative Orbital Rings */}
      <div
        style={{
          position: 'absolute',
          width: '840px',
          height: '840px',
          borderRadius: '50%',
          border: '1px solid rgba(32, 166, 106, 0.1)',
          pointerEvents: 'none'
        }}
        className="animate-spin-slow"
      />
      <div
        style={{
          position: 'absolute',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          border: '1px dashed rgba(14, 165, 233, 0.12)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          border: '1px solid rgba(32, 166, 106, 0.08)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ width: '100%', maxWidth: selectedRole ? '480px' : '760px', position: 'relative', zIndex: 10 }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          {/* Logo Badge */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 10px 25px rgba(32, 166, 106, 0.35)',
              position: 'relative'
            }}
          >
            <img src="/orbit-logo.svg" alt="ORBIT" style={{ width: '42px', height: '42px' }} />
          </div>

          <h1
            className="brand-font"
            style={{
              fontSize: '34px',
              fontWeight: '900',
              letterSpacing: '0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '4px'
            }}
          >
            ORBIT
          </h1>

          <h2
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--deep-green)',
              letterSpacing: '-0.01em',
              marginBottom: '8px'
            }}
          >
            Intelligence for a Cleaner Tomorrow.
          </h2>

          <p
            style={{
              fontSize: '12.5px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              maxWidth: '440px',
              margin: '0 auto'
            }}
          >
            AI-powered platform for smart waste treatment, segregation, recycling, and circular resource recovery.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            /* STEP 1: ROLE SELECTION CARDS */
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-xl)',
                padding: '36px 32px'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--deep-green)',
                    backgroundColor: 'var(--soft-mint)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(32, 166, 106, 0.25)',
                    display: 'inline-block',
                    marginBottom: '8px'
                  }}
                >
                  WELCOME TO ORBIT
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Select your access type
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Choose your designated command interface to proceed
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                {/* ROLE CARD 1: OPERATOR */}
                <div
                  onClick={() => handleSelectRole('operator')}
                  style={{
                    padding: '24px 22px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1.5px solid var(--border)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '18px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                  className="card-orbit"
                >
                  <div>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--soft-mint)',
                        border: '1px solid rgba(32, 166, 106, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px'
                      }}
                    >
                      <Recycle size={24} color="var(--orbit-green)" />
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orbit-green)', marginBottom: '4px' }}>
                      OPERATIONS & RECYCLING
                    </div>
                    <h4 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '8px' }}>
                      Waste Management & Treatment
                    </h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      For treatment centers, recycling facilities, waste operators, and collection teams.
                    </p>
                  </div>

                  <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: '600', padding: '2px 7px', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        • Treatment Plants
                      </span>
                      <span style={{ fontSize: '10.5px', fontWeight: '600', padding: '2px 7px', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        • Smart Bins
                      </span>
                      <span style={{ fontSize: '10.5px', fontWeight: '600', padding: '2px 7px', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        • Material Scanner
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-primary"
                      style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}
                    >
                      <span>Continue as Operator</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* ROLE CARD 2: AUTHORITY */}
                <div
                  onClick={() => handleSelectRole('authority')}
                  style={{
                    padding: '24px 22px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1.5px solid var(--border)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '18px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                  className="card-orbit"
                >
                  <div>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: '#EFFBF5',
                        border: '1px solid rgba(8, 116, 67, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px'
                      }}
                    >
                      <Building2 size={24} color="var(--deep-green)" />
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--deep-green)', marginBottom: '4px' }}>
                      GOVERNMENT & CITY INTELLIGENCE
                    </div>
                    <h4 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '8px' }}>
                      Government & Smart City Authority
                    </h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      For municipal authorities, senior officials, administrators, and city-level decision makers.
                    </p>
                  </div>

                  <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: '600', padding: '2px 7px', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        • City-Wide Flow
                      </span>
                      <span style={{ fontSize: '10.5px', fontWeight: '600', padding: '2px 7px', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        • Plant Capacity
                      </span>
                      <span style={{ fontSize: '10.5px', fontWeight: '600', padding: '2px 7px', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        • Carbon Avoided
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-primary"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        fontSize: '13px',
                        background: 'linear-gradient(135deg, var(--deep-green) 0%, var(--dark-green) 100%)'
                      }}
                    >
                      <span>Continue as Authority</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* STEP 2: ROLE-SPECIFIC LOGIN FORM */
            <motion.div
              key="login-form"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-xl)',
                padding: '36px 32px'
              }}
            >
              {/* Back to Role Selection Button */}
              <button
                type="button"
                onClick={handleBackToRoles}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  marginBottom: '16px',
                  padding: '4px 8px',
                  borderRadius: '6px'
                }}
                className="btn-ghost"
              >
                <ArrowLeft size={15} />
                <span>Switch Access Type</span>
              </button>

              {/* Role Header Badge */}
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isAuthority ? '#EFFBF5' : 'var(--soft-mint)',
                  border: isAuthority ? '1px solid rgba(8, 116, 67, 0.25)' : '1px solid rgba(32, 166, 106, 0.25)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  {isAuthority ? (
                    <Building2 size={20} color="var(--deep-green)" />
                  ) : (
                    <Recycle size={20} color="var(--orbit-green)" />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '800', color: isAuthority ? 'var(--deep-green)' : 'var(--text-primary)' }}>
                    {isAuthority ? 'Government & Smart City Authority' : 'Waste Management & Treatment Operator'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                    {isAuthority
                      ? 'Access city-level waste intelligence and strategic insights.'
                      : 'Access treatment, recycling and waste operations.'}
                  </div>
                </div>
              </div>

              {/* Error Alert Message */}
              {error && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--status-critical-bg)',
                    border: '1px solid var(--status-critical-border)',
                    color: 'var(--status-critical)',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    marginBottom: '18px'
                  }}
                >
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Email / ID Field */}
                <div>
                  <label
                    htmlFor="login-email"
                    style={{
                      display: 'block',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '6px'
                    }}
                  >
                    {isAuthority ? 'Official Email / Government ID' : 'Operator Email'}
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Mail
                      size={18}
                      color="var(--text-muted)"
                      style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }}
                    />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isAuthority ? 'official@orbit.gov' : 'operator@orbit.eco'}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'border-color 0.2s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label
                      htmlFor="login-password"
                      style={{
                        fontSize: '12.5px',
                        fontWeight: '700',
                        color: 'var(--text-primary)'
                      }}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset verification dispatched to registered credentials.')}
                      style={{
                        fontSize: '11.5px',
                        color: isAuthority ? 'var(--deep-green)' : 'var(--orbit-green)',
                        fontWeight: '600',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Lock
                      size={18}
                      color="var(--text-muted)"
                      style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }}
                    />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 44px 12px 42px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        color: 'var(--text-muted)'
                      }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: 'var(--orbit-green)', width: '16px', height: '16px', borderRadius: '4px' }}
                    />
                    <span>Remember this session</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    padding: '13px',
                    fontSize: '14.5px',
                    fontWeight: '700',
                    letterSpacing: '0.02em',
                    marginTop: '4px',
                    background: isAuthority
                      ? 'linear-gradient(135deg, var(--deep-green) 0%, var(--dark-green) 100%)'
                      : 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)'
                  }}
                >
                  {loading ? (
                    <span>Authenticating Session...</span>
                  ) : (
                    <>
                      <span>{isAuthority ? 'ENTER AUTHORITY COMMAND' : 'LOGIN AS OPERATOR'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

