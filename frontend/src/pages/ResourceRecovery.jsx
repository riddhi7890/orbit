import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Coins,
  Cpu,
  Layers,
  Leaf,
  Recycle,
  TrendingUp,
  Droplets,
  Trees,
  ShieldCheck,
  Search
} from 'lucide-react';
import { MOCK_RESOURCE_RECOVERY } from '../data/mockData';
import { formatTons, formatCurrency, formatNumber } from '../utils/formatters';
import { getRecoveryRecords, analyzeRecovery } from '../services/recoveryService';

export default function ResourceRecovery() {
  const { materials, circular_metrics } = MOCK_RESOURCE_RECOVERY;
  const [backendRecords, setBackendRecords] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    async function loadRecords() {
      try {
        const res = await getRecoveryRecords();
        if (res?.data && res.data.length > 0) {
          setBackendRecords(res.data);
        }
      } catch (err) {
        console.warn('[ORBIT API] Could not load recovery records:', err);
      }
    }
    loadRecords();
  }, []);

  const handleTestAnalyze = async (category = 'e_waste', itemType = 'charger') => {
    setAnalyzing(true);
    try {
      const res = await analyzeRecovery({ category, item_type: itemType });
      if (res?.data) {
        setAnalysisResult(res.data);
      }
    } catch (err) {
      console.warn('[ORBIT API] Recovery analysis failed:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Precious Metals Intelligence Data
  const preciousMetalsData = {
    gold: {
      symbol: 'Au',
      element: 'Gold (Au-999)',
      quantity_g: 24.8,
      estimated_value_inr: '₹1,52,000',
      estimated_value_usd: '$1,840',
      confidence: 96.4,
      source: 'E-Waste & Telecom PCB Scrap',
      sub_sources: ['Motherboard Bus Traces', 'BGA Processor Pins', 'High-Frequency Connectors'],
      status: 'Detected / Recoverable',
      purity_grade: '99.9% High Purity Feedstock'
    },
    silver: {
      symbol: 'Ag',
      element: 'Silver (Ag-925)',
      quantity_g: 182.4,
      estimated_value_inr: '₹18,500',
      estimated_value_usd: '$225',
      confidence: 93.8,
      source: 'Electronic Connectors & Solar Scrap',
      sub_sources: ['Switch Contacts', 'Thermal Paste Interfaces', 'SMD Capacitor End-Caps'],
      status: 'Detected / Recoverable',
      purity_grade: '92.5% Industrial Alloy'
    },
    summary: {
      total_gold_g: 24.8,
      total_silver_g: 182.4,
      combined_value_inr: '₹1,70,500',
      combined_value_usd: '$2,065',
      avg_confidence: 95.1,
      total_batches_scanned: 142,
      recovery_efficiency: 94.6
    },
    detected_sources: [
      { category: 'PCB Components', yieldAu: '14.2 g', yieldAg: '68.0 g', confidence: 97.2, status: 'High Yield' },
      { category: 'Telecom & Server E-Waste', yieldAu: '8.4 g', yieldAg: '54.2 g', confidence: 96.0, status: 'High Yield' },
      { category: 'Industrial Electronic Scrap', yieldAu: '2.2 g', yieldAg: '42.8 g', confidence: 94.5, status: 'Moderate Yield' },
      { category: 'Recyclable Smart Bin Streams', yieldAu: '0.0 g', yieldAg: '17.4 g', confidence: 91.8, status: 'Trace Detection' }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header Banner: Precious Metal Recovery Intelligence Focus */}
      <div
        className="card-orbit card-orbit-highlight orbit-grid-bg"
        style={{ padding: '28px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#FEF3C7',
                color: '#B45309',
                border: '1px solid #FCD34D',
                fontSize: '12px',
                fontWeight: '700'
              }}
            >
              <Coins size={13} color="#D97706" />
              Precious Metal Detection Active
            </span>
            <span className="badge badge-mint">
              <Sparkles size={12} color="var(--orbit-green)" />
              Hydrometallurgical AI Routing
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Precious Metal Recovery Intelligence
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '4px' }}>
            AI-powered detection and recovery intelligence for gold and silver from recyclable and electronic waste streams.
          </p>
        </div>

        {/* Combined Precious Metal Valuation */}
        <div
          className="card-orbit"
          style={{
            padding: '16px 24px',
            backgroundColor: '#FFFFFF',
            textAlign: 'right',
            border: '1.5px solid #FCD34D',
            boxShadow: '0 4px 16px rgba(217, 119, 6, 0.12)'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            COMBINED PRECIOUS METAL YIELD
          </div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#B45309', fontFamily: 'Outfit, sans-serif' }}>
            {preciousMetalsData.summary.combined_value_inr}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--deep-green)', fontWeight: '600' }}>
            Avg AI Confidence: {preciousMetalsData.summary.avg_confidence}%
          </div>
        </div>
      </div>

      {/* 2. PRIMARY FOCUS: GOLD & SILVER RECOVERY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* GOLD RECOVERY (Au) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card-orbit"
          style={{
            padding: '24px',
            border: '1.5px solid #FCD34D',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFDF5 100%)',
            boxShadow: '0 6px 20px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative'
          }}
        >
          {/* Card Top */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '900',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Au
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Gold Recovery
                </h3>
                <div style={{ fontSize: '12px', color: '#B45309', fontWeight: '600' }}>
                  {preciousMetalsData.gold.element}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--status-good-bg)',
                color: 'var(--deep-green)',
                border: '1px solid var(--status-good-border)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
              {preciousMetalsData.gold.status}
            </span>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #FDE68A' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>DETECTED QUANTITY</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#B45309', margin: '2px 0', fontFamily: 'Outfit, sans-serif' }}>
                {preciousMetalsData.gold.quantity_g} g
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{preciousMetalsData.gold.purity_grade}</div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #FDE68A' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>ESTIMATED VALUE</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--deep-green)', margin: '2px 0', fontFamily: 'Outfit, sans-serif' }}>
                {preciousMetalsData.gold.estimated_value_inr}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>({preciousMetalsData.gold.estimated_value_usd})</div>
            </div>
          </div>

          {/* Source & AI Confidence */}
          <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>Source Waste Category:</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{preciousMetalsData.gold.source}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>AI Detection Confidence:</span>
              <span style={{ fontWeight: '800', color: 'var(--deep-green)' }}>{preciousMetalsData.gold.confidence}%</span>
            </div>
          </div>

          {/* Sub-streams */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {preciousMetalsData.gold.sub_sources.map((src, i) => (
              <span key={i} style={{ fontSize: '10.5px', fontWeight: '600', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#FEF3C7', color: '#92400E' }}>
                • {src}
              </span>
            ))}
          </div>
        </motion.div>

        {/* SILVER RECOVERY (Ag) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card-orbit"
          style={{
            padding: '24px',
            border: '1.5px solid #CBD5E1',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            boxShadow: '0 6px 20px rgba(100, 116, 139, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative'
          }}
        >
          {/* Card Top */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '900',
                  boxShadow: '0 4px 12px rgba(100, 116, 139, 0.3)',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Ag
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Silver Recovery
                </h3>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>
                  {preciousMetalsData.silver.element}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--status-good-bg)',
                color: 'var(--deep-green)',
                border: '1px solid var(--status-good-border)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
              {preciousMetalsData.silver.status}
            </span>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>DETECTED QUANTITY</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#475569', margin: '2px 0', fontFamily: 'Outfit, sans-serif' }}>
                {preciousMetalsData.silver.quantity_g} g
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{preciousMetalsData.silver.purity_grade}</div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>ESTIMATED VALUE</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--deep-green)', margin: '2px 0', fontFamily: 'Outfit, sans-serif' }}>
                {preciousMetalsData.silver.estimated_value_inr}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>({preciousMetalsData.silver.estimated_value_usd})</div>
            </div>
          </div>

          {/* Source & AI Confidence */}
          <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>Source Waste Category:</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{preciousMetalsData.silver.source}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>AI Detection Confidence:</span>
              <span style={{ fontWeight: '800', color: 'var(--deep-green)' }}>{preciousMetalsData.silver.confidence}%</span>
            </div>
          </div>

          {/* Sub-streams */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {preciousMetalsData.silver.sub_sources.map((src, i) => (
              <span key={i} style={{ fontSize: '10.5px', fontWeight: '600', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#E2E8F0', color: '#334155' }}>
                • {src}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3. AI DETECTION STATUS & RECOVERY SOURCES BREAKDOWN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px', alignItems: 'stretch' }}>
        {/* AI Detection Verification Status Card */}
        <div className="card-orbit" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--soft-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="var(--orbit-green)" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                AI Detection & Verification Status
              </h3>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                Real-time multi-spectral spectrometer telemetry
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center' }}>
            <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="var(--orbit-green)" />
              <div style={{ fontSize: '12.5px', color: 'var(--text-primary)' }}>
                <strong>Gold (Au-999) detected</strong> in high-density PCB connector arrays
              </div>
            </div>

            <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="var(--orbit-green)" />
              <div style={{ fontSize: '12.5px', color: 'var(--text-primary)' }}>
                <strong>Silver (Ag) solder alloys</strong> & switch contact plates identified
              </div>
            </div>

            <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="var(--orbit-green)" />
              <div style={{ fontSize: '12.5px', color: 'var(--text-primary)' }}>
                <strong>Hydrometallurgical recovery route</strong> flagged for extraction facility
              </div>
            </div>
          </div>
        </div>

        {/* Source Categories Stream Breakdown */}
        <div className="card-orbit" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
              Precious Metal Detection by Waste Stream
            </h3>
            <span className="badge badge-mint">4 Streams Monitored</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
            {preciousMetalsData.detected_sources.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {item.category}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    Yield: <strong style={{ color: '#B45309' }}>{item.yieldAu} Au</strong> • <strong style={{ color: '#475569' }}>{item.yieldAg} Ag</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-good" style={{ fontSize: '10.5px' }}>
                    {item.confidence}% Confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. SECONDARY SECTION: GENERAL CIRCULAR COMMODITIES & ENVIRONMENTAL METRICS */}
      <div style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Recycle size={18} color="var(--deep-green)" />
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Secondary Circular Commodities & Environmental Metrics
          </h3>
        </div>

        {/* Environmental Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="card-orbit" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--soft-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={20} color="var(--orbit-green)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>CO₂ EMISSIONS AVOIDED</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--deep-green)' }}>
                {circular_metrics.total_co2_offset_tons} Tons
              </div>
            </div>
          </div>

          <div className="card-orbit" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--soft-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Droplets size={20} color="#0284C7" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>WATER CONSERVED</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0369A1' }}>
                {formatNumber(circular_metrics.water_saved_cubic_meters)} m³
              </div>
            </div>
          </div>

          <div className="card-orbit" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--soft-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trees size={20} color="var(--deep-green)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>TREES SAVED EQUIVALENT</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--deep-green)' }}>
                {formatNumber(circular_metrics.trees_saved_equivalent)} Trees
              </div>
            </div>
          </div>

          <div className="card-orbit" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Recycle size={20} color="var(--text-primary)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>LANDFILL DIVERSION</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {circular_metrics.landfill_diversion_rate}%
              </div>
            </div>
          </div>
        </div>

        {/* Commodity Stream Table */}
        <div className="card-orbit" style={{ padding: '24px', overflowX: 'auto' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '14px' }}>
            Bulk Recycled Commodity Yields
          </h4>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border)', fontSize: '11.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '10px 12px' }}>Commodity Stream</th>
                <th style={{ padding: '10px 12px' }}>Recovered Volume</th>
                <th style={{ padding: '10px 12px' }}>Market Value (USD)</th>
                <th style={{ padding: '10px 12px' }}>Carbon Offset</th>
                <th style={{ padding: '10px 12px' }}>Purity Score</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '13px' }}>
                  <td style={{ padding: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {m.name}
                  </td>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatTons(m.recovered_tons)}
                  </td>
                  <td style={{ padding: '12px', fontWeight: '800', color: 'var(--deep-green)' }}>
                    {formatCurrency(m.market_value_usd)}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                    {m.co2_offset_tons} t CO₂
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--deep-green)' }}>{m.circular_score}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
