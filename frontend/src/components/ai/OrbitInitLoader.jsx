import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function OrbitInitLoader() {
  const { initPhases, completeInitSequence } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Progress through the 5 steps over ~1.8 seconds
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < initPhases.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            completeInitSequence();
          }, 350);
          return prev;
        }
      });
    }, 320);

    return () => clearInterval(interval);
  }, [initPhases.length, completeInitSequence]);

  const progressPercent = ((currentStep + 1) / initPhases.length) * 100;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '24px'
      }}
      className="orbit-grid-bg orbit-glow-bg"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        {/* Animated Glowing Orbital Ring */}
        <div style={{ position: 'relative', width: '96px', height: '96px', marginBottom: '28px' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              border: '2px dashed rgba(32, 166, 106, 0.4)'
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: -16,
              borderRadius: '50%',
              border: '1.5px solid rgba(14, 165, 233, 0.25)'
            }}
          />
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 32px rgba(32, 166, 106, 0.35)'
            }}
          >
            <img src="/orbit-logo.svg" alt="ORBIT" style={{ width: '58px', height: '58px' }} />
          </div>
        </div>

        {/* Brand Headline */}
        <h2
          className="brand-font"
          style={{
            fontSize: '28px',
            fontWeight: '800',
            letterSpacing: '0.04em',
            color: 'var(--text-primary)',
            marginBottom: '4px'
          }}
        >
          ORBIT
        </h2>
        <p
          style={{
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--deep-green)',
            letterSpacing: '-0.01em',
            marginBottom: '24px'
          }}
        >
          Intelligence for a Cleaner Tomorrow.
        </p>

        {/* Active Step Indicator */}
        <div
          style={{
            minHeight: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}
        >
          <Sparkles size={16} color="var(--orbit-green)" className="animate-spin-slow" />
          <AnimatePresence mode="wait">
            <motion.span
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}
            >
              {initPhases[currentStep]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--border-light)',
            borderRadius: '999px',
            overflow: 'hidden',
            marginBottom: '24px'
          }}
        >
          <motion.div
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--orbit-green) 0%, var(--bright-green) 100%)',
              borderRadius: '999px'
            }}
          />
        </div>

        {/* Completed Steps Checklist Preview */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            maxWidth: '360px'
          }}
        >
          {initPhases.map((phase, idx) => {
            const isDone = idx <= currentStep;
            return (
              <span
                key={idx}
                style={{
                  fontSize: '10.5px',
                  fontWeight: '600',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: isDone ? 'var(--soft-mint)' : 'var(--bg-secondary)',
                  color: isDone ? 'var(--deep-green)' : 'var(--text-muted)',
                  border: isDone ? '1px solid rgba(32, 166, 106, 0.25)' : '1px solid var(--border-light)',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {isDone && <CheckCircle2 size={11} color="var(--orbit-green)" />}
                {phase.replace('...', '')}
              </span>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
