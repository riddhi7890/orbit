import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListOrdered, ArrowUpRight } from 'lucide-react';
import { getStatusColor } from '../../utils/formatters';

export default function PrioritySummaryWidget({ priorities = [], onSelectBin = () => {} }) {
  const navigate = useNavigate();
  const topPriorities = priorities.slice(0, 4);

  return (
    <div className="card-orbit" style={{ padding: '28px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--status-critical-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ListOrdered size={18} color="var(--status-critical)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Collection Intelligence
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Optimal collection priority queue for field fleet
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/collection-priority')}
          className="btn-ghost"
          style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--deep-green)', padding: '6px 12px' }}
        >
          <span>Priority Matrix</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Priority List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {topPriorities.length === 0 ? (
          <div style={{ padding: '28px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            No critical bins requiring urgent collection.
          </div>
        ) : (
          topPriorities.map((item, idx) => {
            const statusStyle = getStatusColor(item.priority, item.fill_level);
            const seqNum = idx + 1;
            return (
              <div
                key={item.bin_id}
                onClick={() => onSelectBin(item.bin_id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                className="btn-ghost"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '8px',
                      backgroundColor: seqNum === 1 ? 'var(--status-critical)' : 'var(--border)',
                      color: seqNum === 1 ? '#FFFFFF' : 'var(--text-secondary)',
                      fontSize: '11.5px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    #{seqNum}
                  </div>

                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Bin {item.bin_id}</span>
                      <span style={{ fontWeight: '500', color: 'var(--text-secondary)', fontSize: '12px' }}>
                        • {item.zone}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      {item.waste_type} • Est. overflow in {item.time_to_overflow}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '800',
                      color: statusStyle.text
                    }}
                  >
                    {item.fill_level}%
                  </span>
                  <span className={`badge ${statusStyle.badgeClass}`} style={{ fontSize: '10px' }}>
                    {item.priority}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
