import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanLine, MapPin, Sparkles, ArrowRight, Activity, Recycle, Layers } from 'lucide-react';
import OrbitHeroCanvas from '../3d/OrbitHeroCanvas';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHero() {
  const navigate = useNavigate();
  const { isAuthority } = useAuth();

  return (
    <div
      className="card-orbit-hero orbit-grid-bg"
      style={{
        padding: '40px 44px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: '40px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Left Column: Big Typography & Editorial Hierarchy */}
        <div>
          {/* Floating Subsystem Status Chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#FFFFFF',
                color: 'var(--deep-green)',
                border: '1px solid var(--border)',
                fontSize: '12px',
                fontWeight: '700',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
              Treatment Facilities Online
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#FFFFFF',
                color: '#0369A1',
                border: '1px solid #BAE6FD',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <Sparkles size={13} color="#0284C7" />
              AI Segregation & Vision Active
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#FFFFFF',
                color: 'var(--deep-green)',
                border: '1px solid var(--border)',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <Recycle size={13} color="var(--deep-green)" />
              Resource Recovery Active
            </span>
          </div>

          {/* Large Bold ORBIT Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="brand-font"
              style={{
                fontSize: '52px',
                fontWeight: '900',
                letterSpacing: '0.03em',
                lineHeight: 1.02,
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}
            >
              ORBIT
            </h1>
          </motion.div>

          {/* Prominent Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--deep-green)',
              letterSpacing: '-0.02em',
              marginBottom: '12px'
            }}
          >
            Intelligence for a Cleaner Tomorrow.
          </motion.h2>

          {/* Detect. Classify. Collect. Treat. Recover. Story Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: 'var(--soft-mint)',
              border: '1px solid rgba(32, 166, 106, 0.25)',
              fontSize: '12.5px',
              fontWeight: '800',
              color: 'var(--deep-green)',
              letterSpacing: '0.04em',
              marginBottom: '18px'
            }}
          >
            <span>Detect</span>
            <span>•</span>
            <span>Classify</span>
            <span>•</span>
            <span>Collect</span>
            <span>•</span>
            <span>Treat</span>
            <span>•</span>
            <span>Recover</span>
          </div>

          {/* Spacious Description Paragraph */}
          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '520px',
              marginBottom: '26px'
            }}
          >
            {isAuthority
              ? 'Real-time city-level intelligence across municipal treatment facilities, recycling throughput, circular resource recovery, and environmental impact metrics.'
              : 'AI-powered smart waste command center integrating computer vision segregation, IoT telemetry, predictive fleet logistics, and industrial treatment processing.'}
          </p>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/waste-scanner')}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '14px' }}
            >
              <ScanLine size={17} />
              <span>AI Waste Scanner</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => navigate('/smart-city-map')}
              className="btn-secondary"
              style={{ padding: '12px 22px', fontSize: '14px' }}
            >
              <MapPin size={17} color="var(--deep-green)" />
              <span>Treatment Network 3D</span>
            </button>
          </div>
        </div>

        {/* Right Column: Spacious 3D ORBIT Focal Visualization */}
        <div style={{ height: '360px', width: '100%', position: 'relative' }}>
          <OrbitHeroCanvas />
        </div>
      </div>
    </div>
  );
}

