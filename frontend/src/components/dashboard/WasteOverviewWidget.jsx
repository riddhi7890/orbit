import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight, Layers } from 'lucide-react';
import { formatTons, formatPercent } from '../../utils/formatters';

export default function WasteOverviewWidget({ data }) {
  const navigate = useNavigate();

  const categories = data?.categories || [
    { name: 'Organic', volume: 164.2, percentage: 38.3, color: '#10B981' },
    { name: 'Plastics (PET/HDPE)', volume: 72.1, percentage: 16.8, color: '#0EA5E9' },
    { name: 'Paper & Cardboard', volume: 32.0, percentage: 7.5, color: '#F59E0B' },
    { name: 'Metals & Aluminum', volume: 25.0, percentage: 5.8, color: '#6366F1' },
    { name: 'General / Mixed', volume: 110.5, percentage: 25.8, color: '#94A3B8' }
  ];

  const totalVolume = categories.reduce((acc, c) => acc + c.volume, 0);

  return (
    <div className="card-orbit" style={{ padding: '28px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--soft-mint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Layers size={18} color="var(--orbit-green)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Waste & Segregation Streams
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Municipal material streams breakdown
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/waste-analytics')}
          className="btn-ghost"
          style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--deep-green)', padding: '6px 12px' }}
        >
          <span>Full Analytics</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Chart + Legend Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', alignItems: 'center', flex: 1 }}>
        {/* Donut Chart */}
        <div style={{ height: '190px', width: '100%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={54}
                outerRadius={80}
                paddingAngle={3}
                dataKey="volume"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name, item) => [`${formatTons(val)} (${item.payload.percentage}%)`, name]}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-md)',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}
          >
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.04em' }}>TOTAL</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              {formatTons(totalVolume)}
            </div>
          </div>
        </div>

        {/* Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.slice(0, 5).map((cat, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                padding: '6px 8px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '3px',
                    backgroundColor: cat.color
                  }}
                />
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{cat.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{formatTons(cat.volume)}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '36px', textAlign: 'right' }}>
                  {formatPercent(cat.percentage)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
