import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Recycle, AlertTriangle, Cpu, Building2, Leaf, ShieldCheck, Activity } from 'lucide-react';
import { formatTons, formatPercent } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

export default function KpiCards({ data, loading }) {
  const { isAuthority } = useAuth();

  if (loading || !data) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-orbit" style={{ padding: '24px 28px', height: '140px', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: '45%', height: '14px', backgroundColor: 'var(--border-light)', borderRadius: '4px', marginBottom: '16px' }} />
            <div style={{ width: '65%', height: '32px', backgroundColor: 'var(--border-light)', borderRadius: '8px' }} />
          </div>
        ))}
      </div>
    );
  }

  // Operator vs Authority tailored KPI cards
  const operatorKpis = [
    {
      label: 'TOTAL WASTE MANAGED',
      value: formatTons(data.total_waste_tons),
      subtext: `Organic: ${formatTons(data.organic_waste_tons)} • Plastics: ${formatTons(data.plastic_waste_tons)}`,
      icon: Trash2,
      color: 'var(--text-primary)',
      iconBg: 'var(--bg-tertiary)',
      iconColor: 'var(--text-secondary)'
    },
    {
      label: 'RECYCLABLE RECOVERY RATE',
      value: formatPercent(data.recyclable_rate),
      subtext: `Source segregation compliance: 92.6%`,
      icon: Recycle,
      color: 'var(--deep-green)',
      iconBg: 'var(--soft-mint)',
      iconColor: 'var(--orbit-green)'
    },
    {
      label: 'SMART BINS ONLINE',
      value: `${data.active_bins} / ${data.total_bins}`,
      subtext: `${data.total_bins - data.active_bins} in maintenance cycle • 4 Zones`,
      icon: Cpu,
      color: '#0369A1',
      iconBg: 'var(--soft-cyan)',
      iconColor: '#0EA5E9'
    },
    {
      label: 'CRITICAL OVERFLOW BINS',
      value: `${data.critical_bins} Bins`,
      subtext: `Immediate route dispatch required`,
      icon: AlertTriangle,
      color: data.critical_bins > 0 ? 'var(--status-critical)' : 'var(--deep-green)',
      iconBg: data.critical_bins > 0 ? 'var(--status-critical-bg)' : 'var(--soft-mint)',
      iconColor: data.critical_bins > 0 ? 'var(--status-critical)' : 'var(--orbit-green)',
      isAlert: data.critical_bins > 0
    }
  ];

  const authorityKpis = [
    {
      label: 'TOTAL CITY-WIDE WASTE FLOW',
      value: formatTons(data.total_waste_tons),
      subtext: `Landfill diversion rate: 76.8%`,
      icon: Building2,
      color: 'var(--text-primary)',
      iconBg: 'var(--bg-tertiary)',
      iconColor: 'var(--deep-green)'
    },
    {
      label: 'TREATMENT CAPACITY UTILIZATION',
      value: `1,169 / 1,520 t`,
      subtext: `76.9% load across 4 treatment plants`,
      icon: Activity,
      color: 'var(--deep-green)',
      iconBg: 'var(--soft-mint)',
      iconColor: 'var(--orbit-green)'
    },
    {
      label: 'RECYCLABLE & CIRCULAR RECOVERY',
      value: formatPercent(data.recyclable_rate),
      subtext: `Economic value generated: $86,450`,
      icon: Recycle,
      color: '#0369A1',
      iconBg: 'var(--soft-cyan)',
      iconColor: '#0EA5E9'
    },
    {
      label: 'NET ENVIRONMENTAL CO₂ AVOIDED',
      value: `441.2 Tons`,
      subtext: `Equivalent to 5,440 Trees Saved`,
      icon: Leaf,
      color: 'var(--deep-green)',
      iconBg: 'var(--soft-mint)',
      iconColor: 'var(--orbit-green)'
    }
  ];

  const kpis = isAuthority ? authorityKpis : operatorKpis;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}
    >
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="card-orbit"
            style={{
              padding: '26px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}
              >
                {kpi.label}
              </span>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '11px',
                  backgroundColor: kpi.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Icon size={19} color={kpi.iconColor} />
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '34px',
                  fontWeight: '800',
                  color: kpi.color,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: kpi.isAlert ? 'var(--status-critical)' : 'var(--text-secondary)',
                  fontWeight: kpi.isAlert ? '700' : '500',
                  marginTop: '8px'
                }}
              >
                {kpi.subtext}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

