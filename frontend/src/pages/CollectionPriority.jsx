import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ListOrdered,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Clock,
  MapPin,
  RefreshCw,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { getStatusColor, formatNumber } from '../utils/formatters';

export default function CollectionPriority() {
  const { priorities, loading, refreshAllData, setSelectedBinId } = useAppData();
  const [dispatching, setDispatching] = useState(false);
  const [dispatchedRoutes, setDispatchedRoutes] = useState([]);

  const handleDispatchTruck = (bin) => {
    setDispatching(true);
    setTimeout(() => {
      setDispatchedRoutes(prev => [...prev, bin.bin_id]);
      setDispatching(false);
    }, 800);
  };

  const totalPayload = priorities.reduce((acc, p) => acc + (p.estimated_load_kg || 0), 0);
  const criticalCount = priorities.filter(p => p.priority === 'Critical').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div
        className="card-orbit card-orbit-highlight orbit-grid-bg"
        style={{ padding: '28px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-critical">
              <AlertTriangle size={12} color="var(--status-critical)" />
              {criticalCount} Critical Overflow Imminent
            </span>
            <span className="badge badge-mint">
              AI Route Matrix Active
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Predictive Collection Priority & Fleet Logistics
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '4px' }}>
            ORBIT predictive algorithms calculate optimal collection priorities based on overflow velocity, sensor telemetry, and route proximity to generate fuel-optimal collection sequences.
          </p>
        </div>

        {/* Action Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="card-orbit" style={{ padding: '12px 18px', backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL PICKUP LOAD</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {formatNumber(totalPayload)} kg
            </div>
          </div>
          <div className="card-orbit" style={{ padding: '12px 18px', backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>OPTIMIZED ROUTES</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--deep-green)' }}>
              6 Active Fleet Units
            </div>
          </div>
        </div>
      </div>

      {/* Priority Sequence Table */}
      <div className="card-orbit" style={{ padding: '24px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Dynamic Collection Priority Sequence
          </h3>
          <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            AI Predictive Fleet Dispatch Matrix
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 14px' }}>Priority #</th>
              <th style={{ padding: '12px 14px' }}>Smart Bin & Location</th>
              <th style={{ padding: '12px 14px' }}>Waste Category</th>
              <th style={{ padding: '12px 14px' }}>Fill Level</th>
              <th style={{ padding: '12px 14px' }}>Est. Overflow</th>
              <th style={{ padding: '12px 14px' }}>Recommended Vehicle</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Dispatch Action</th>
            </tr>
          </thead>
          <tbody>
            {priorities.map((item, idx) => {
              const statusStyle = getStatusColor(item.priority, item.fill_level);
              const isDispatched = dispatchedRoutes.includes(item.bin_id);
              const seqNumber = idx + 1;

              return (
                <tr
                  key={item.bin_id}
                  style={{
                    borderBottom: '1px solid var(--border-light)',
                    transition: 'background-color 0.15s ease'
                  }}
                  className="btn-ghost"
                >
                  {/* Sequence Number */}
                  <td style={{ padding: '14px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: seqNumber === 1 ? 'var(--status-critical)' : seqNumber <= 3 ? 'var(--status-warning)' : 'var(--bg-secondary)',
                        color: seqNumber <= 3 ? '#FFFFFF' : 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontSize: '12px'
                      }}
                    >
                      #{seqNumber}
                    </div>
                  </td>

                  {/* Bin Info */}
                  <td style={{ padding: '14px' }}>
                    <div
                      onClick={() => setSelectedBinId(item.bin_id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{item.bin_id}</span>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                          • {item.name}
                        </span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        📍 {item.zone} ({item.distance_km} km from depot)
                      </div>
                    </div>
                  </td>

                  {/* Waste Type */}
                  <td style={{ padding: '14px', fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {item.waste_type}
                  </td>

                  {/* Fill Level */}
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: statusStyle.text }}>
                        {item.fill_level}%
                      </div>
                      <span className={`badge ${statusStyle.badgeClass}`} style={{ fontSize: '10px' }}>
                        {item.priority}
                      </span>
                    </div>
                  </td>

                  {/* Time to Overflow */}
                  <td style={{ padding: '14px', fontSize: '13px', fontWeight: '600', color: item.fill_level >= 85 ? 'var(--status-critical)' : 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} />
                      <span>{item.time_to_overflow}</span>
                    </div>
                  </td>

                  {/* Recommended Vehicle */}
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '600', color: 'var(--deep-green)' }}>
                      <Truck size={14} color="var(--orbit-green)" />
                      <span>{item.recommended_vehicle}</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    {isDispatched ? (
                      <span className="badge badge-good" style={{ padding: '6px 12px' }}>
                        <CheckCircle2 size={13} color="var(--deep-green)" />
                        Dispatched
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDispatchTruck(item)}
                        disabled={dispatching}
                        className="btn-primary"
                        style={{ padding: '7px 14px', fontSize: '12px' }}
                      >
                        <Navigation size={13} />
                        <span>Dispatch Route</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
