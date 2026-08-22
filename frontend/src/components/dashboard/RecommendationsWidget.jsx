import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

export default function RecommendationsWidget({ recommendations = [] }) {
  const topRecs = recommendations.slice(0, 2);

  return (
    <div className="card-orbit" style={{ padding: '28px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'var(--soft-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Sparkles size={18} color="#0284C7" />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
            ORBIT AI Recommendations
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Real-time automated operational actions
          </p>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
        {topRecs.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            No operational recommendations pending.
          </div>
        ) : (
          topRecs.map((rec) => (
            <div
              key={rec.id}
              style={{
                padding: '18px 20px',
                borderRadius: '14px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {rec.title}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '700',
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: rec.urgency === 'HIGH' ? 'var(--status-critical-bg)' : '#FFFFFF',
                    color: rec.urgency === 'HIGH' ? 'var(--status-critical)' : 'var(--deep-green)',
                    border: rec.urgency === 'HIGH' ? '1px solid var(--status-critical-border)' : '1px solid var(--border)'
                  }}
                >
                  {rec.category}
                </span>
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {rec.description}
              </p>

              <div
                style={{
                  padding: '9px 13px',
                  borderRadius: '9px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  fontSize: '12px',
                  color: 'var(--deep-green)',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Zap size={14} color="var(--orbit-green)" />
                <span>Action: {rec.recommended_action}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
