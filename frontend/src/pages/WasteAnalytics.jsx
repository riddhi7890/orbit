import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { BarChart3, TrendingUp, ShieldCheck, Layers, Leaf, RefreshCw } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { formatTons, formatPercent } from '../utils/formatters';

export default function WasteAnalytics() {
  const { wasteStats, loading, refreshAllData } = useAppData();

  const summary = wasteStats?.summary || {
    total_volume_tons: 428.6,
    recycled_volume_tons: 293.1,
    recovery_efficiency: 68.4,
    compliance_score: 92.6
  };

  const categories = wasteStats?.categories || [];
  const weeklyTrend = wasteStats?.weekly_trend || [];
  const zoneStats = wasteStats?.zone_segregation || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div
        className="card-orbit card-orbit-highlight orbit-grid-bg"
        style={{ padding: '28px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-mint">
              <BarChart3 size={12} color="var(--orbit-green)" />
              Waste & Treatment Analytics
            </span>
            <span className="badge badge-cyan">
              Material Stream Intelligence
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Waste Segregation & Material Stream Analytics
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '4px' }}>
            Continuous tracking of city-wide waste generation, source segregation efficiency, circular material recovery rates, and compliance scoring.
          </p>
        </div>

        {/* Quick Refresh */}
        <button
          onClick={refreshAllData}
          className="btn-secondary"
          style={{ padding: '10px 18px', fontSize: '13.5px' }}
        >
          <RefreshCw size={15} />
          Refresh Stats
        </button>
      </div>

      {/* 4 Summary Scorecards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div className="card-orbit" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>TOTAL GENERATED WASTE</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0', fontFamily: 'Outfit, sans-serif' }}>
            {formatTons(summary.total_volume_tons)}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--deep-green)', fontWeight: '600' }}>
            ● Municipal aggregate baseline
          </div>
        </div>

        <div className="card-orbit" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>RECYCLED & DIVERTED</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--deep-green)', margin: '4px 0', fontFamily: 'Outfit, sans-serif' }}>
            {formatTons(summary.recycled_volume_tons)}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--deep-green)', fontWeight: '600' }}>
            ● Diverted from regional landfills
          </div>
        </div>

        <div className="card-orbit" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>RECOVERY EFFICIENCY</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--orbit-green)', margin: '4px 0', fontFamily: 'Outfit, sans-serif' }}>
            {formatPercent(summary.recovery_efficiency)}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--orbit-green)', fontWeight: '600' }}>
            +4.2% higher than target standard
          </div>
        </div>

        <div className="card-orbit" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>SEGREGATION COMPLIANCE</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0369A1', margin: '4px 0', fontFamily: 'Outfit, sans-serif' }}>
            {formatPercent(summary.compliance_score)}
          </div>
          <div style={{ fontSize: '12px', color: '#0284C7', fontWeight: '600' }}>
            AI image validation passed
          </div>
        </div>
      </div>

      {/* Main Charts: Donut Material Stream & Weekly Segregation Trend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'stretch' }}>
        {/* Weekly Trend Bar Chart */}
        <div className="card-orbit" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                7-Day Waste Stream Volumes (Tons)
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Daily segregation breakdown across municipal zones
              </p>
            </div>
            <span className="badge badge-mint">Daily Aggregation</span>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  formatter={(val) => [`${val} t`, '']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-md)',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="recyclable" name="Recyclables (Plastics/Metals/Paper)" fill="#20A66A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="organic" name="Organic Compost" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="general" name="General Waste" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Material Stream Share Donut */}
        <div className="card-orbit" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                Stream Distribution
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Percentage by weight
              </p>
            </div>
          </div>

          <div style={{ height: '220px', width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
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
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stream List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', maxHeight: '140px', marginTop: '8px' }}>
            {categories.map((cat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', padding: '4px 6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color }} />
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{cat.name}</span>
                </div>
                <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone Performance Table */}
      <div className="card-orbit" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>
          Zone-by-Zone Segregation Efficiency
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {zoneStats.map((z, idx) => (
            <div
              key={idx}
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{z.zone}</span>
                <span className="badge badge-good">{z.efficiency}% Efficiency</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Primary Stream: <strong>{z.topStream}</strong>
              </div>
              {/* Progress Bar */}
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)', borderRadius: '999px', overflow: 'hidden', marginTop: '4px' }}>
                <div style={{ width: `${z.efficiency}%`, height: '100%', backgroundColor: 'var(--orbit-green)', borderRadius: '999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
