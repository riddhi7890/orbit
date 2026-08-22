import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Recycle,
  Building2,
  Cpu,
  Layers,
  ArrowRight,
  Zap,
  Info,
  CheckCircle2,
  Activity,
  X,
  TrendingUp,
  Leaf,
  ShieldCheck
} from 'lucide-react';
import SmartCityCanvas from '../components/3d/SmartCityCanvas';
import { useAppData } from '../context/AppDataContext';
import { MOCK_TREATMENT_FACILITIES } from '../data/mockData';
import { getStatusColor, formatTons } from '../utils/formatters';

const WASTE_FLOW_STEPS = [
  { id: 'bins', label: '1. SMART BINS', icon: '🗑️', desc: 'IoT fill & thermal telemetry' },
  { id: 'collection', label: '2. COLLECTION', icon: '🚛', desc: 'Predictive EV route dispatch' },
  { id: 'segregation', label: '3. SEGREGATION', icon: '⚡', desc: 'AI multi-spectral optical sorting' },
  { id: 'treatment', label: '4. TREATMENT', icon: '♻️', desc: 'Thermal & bio-digestion plants' },
  { id: 'recycling', label: '5. RECYCLING', icon: '🔄', desc: 'Polymer & metal flaking' },
  { id: 'recovery', label: '6. RESOURCE RECOVERY', icon: '🌐', desc: 'Secondary circular feedstocks' }
];

export default function SmartCityMap() {
  const { bins, selectedBinId, setSelectedBinId } = useAppData();
  const [activeZone, setActiveZone] = useState('ALL');
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'FACILITY' | 'BIN' | 'CRITICAL'
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [activeFlowStep, setActiveFlowStep] = useState(null);

  // Filter facilities
  const filteredFacilities = MOCK_TREATMENT_FACILITIES.filter((f) => {
    if (activeZone !== 'ALL' && !f.zone.includes(activeZone)) return false;
    if (activeFilter === 'BIN' || activeFilter === 'CRITICAL') return false;
    return true;
  });

  // Filter bins
  const filteredBins = bins.filter((bin) => {
    if (activeZone !== 'ALL' && bin.zone !== activeZone) return false;
    if (activeFilter === 'FACILITY') return false;
    if (activeFilter === 'CRITICAL' && bin.fill_level < 80) return false;
    return true;
  });

  const handleSelectFacility = (fac) => {
    setSelectedFacility(fac);
    setSelectedBinId(null);
  };

  const handleSelectBin = (bin) => {
    setSelectedBinId(bin.bin_id);
    setSelectedFacility(null);
  };

  const totalCapacity = MOCK_TREATMENT_FACILITIES.reduce((acc, f) => acc + f.capacity_tons_day, 0);
  const totalLoad = MOCK_TREATMENT_FACILITIES.reduce((acc, f) => acc + f.current_load_tons_day, 0);
  const avgRecoveryRate = (
    MOCK_TREATMENT_FACILITIES.reduce((acc, f) => acc + f.recovery_rate_percent, 0) /
    MOCK_TREATMENT_FACILITIES.length
  ).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div
        className="card-orbit card-orbit-highlight"
        style={{
          padding: '22px 28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--soft-mint)',
              border: '1px solid rgba(32, 166, 106, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(32, 166, 106, 0.2)'
            }}
          >
            <Recycle size={22} color="var(--orbit-green)" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Smart Waste Treatment Network
            </h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Real-time view of treatment facilities, recycling centers, collection zones, and resource recovery infrastructure.
            </p>
          </div>
        </div>

        {/* Network Metrics Overview */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          <div className="card-orbit" style={{ padding: '8px 14px', backgroundColor: '#FFFFFF' }}>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: '700' }}>TREATMENT LOAD</span>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--deep-green)' }}>
              {totalLoad} / {totalCapacity} t/day
            </div>
          </div>

          <div className="card-orbit" style={{ padding: '8px 14px', backgroundColor: '#FFFFFF' }}>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: '700' }}>RECOVERY RATE</span>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--orbit-green)' }}>
              {avgRecoveryRate}%
            </div>
          </div>

          <div className="card-orbit" style={{ padding: '8px 14px', backgroundColor: '#FFFFFF' }}>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: '700' }}>FACILITIES ONLINE</span>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
              4 of 4 Active
            </div>
          </div>
        </div>
      </div>

      {/* WASTE FLOW VISUALIZER (Interactive Banner) */}
      <div
        className="card-orbit"
        style={{
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--deep-green)' }}>
              END-TO-END CIRCULAR WASTE FLOW PIPELINE
            </span>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
            Hover or click any stage to inspect operational telemetry
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
          {WASTE_FLOW_STEPS.map((step, idx) => (
            <div
              key={step.id}
              onClick={() => setActiveFlowStep(activeFlowStep === step.id ? null : step.id)}
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: activeFlowStep === step.id ? 'var(--soft-mint)' : 'var(--bg-secondary)',
                border: activeFlowStep === step.id ? '1.5px solid var(--orbit-green)' : '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              className="btn-ghost"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span style={{ fontSize: '14px' }}>{step.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)' }}>{step.label}</span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Control & 3D Network Main Viewport */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'stretch' }}>
        {/* Main 3D Viewport Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Filter Bar */}
          <div
            className="card-orbit"
            style={{
              padding: '12px 18px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            {/* Zone Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Zone:
              </span>
              <div style={{ display: 'flex', backgroundColor: 'var(--bg-secondary)', padding: '2px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                {['ALL', 'Zone A', 'Zone B', 'Zone C', 'Zone D'].map((z) => (
                  <button
                    key={z}
                    onClick={() => setActiveZone(z)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: '600',
                      backgroundColor: activeZone === z ? '#FFFFFF' : 'transparent',
                      color: activeZone === z ? 'var(--deep-green)' : 'var(--text-secondary)',
                      boxShadow: activeZone === z ? 'var(--shadow-xs)' : 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* Entity Type Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Filter:
              </span>
              <div style={{ display: 'flex', backgroundColor: 'var(--bg-secondary)', padding: '2px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                {[
                  { id: 'ALL', label: 'All Elements' },
                  { id: 'FACILITY', label: `Facilities (${filteredFacilities.length})` },
                  { id: 'BIN', label: `Smart Bins (${filteredBins.length})` },
                  { id: 'CRITICAL', label: 'Critical Only' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: '600',
                      backgroundColor: activeFilter === f.id ? (f.id === 'CRITICAL' ? 'var(--status-critical-bg)' : '#FFFFFF') : 'transparent',
                      color: activeFilter === f.id ? (f.id === 'CRITICAL' ? 'var(--status-critical)' : 'var(--deep-green)') : 'var(--text-secondary)',
                      boxShadow: activeFilter === f.id ? 'var(--shadow-xs)' : 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Map Canvas */}
          <div
            className="card-orbit"
            style={{
              height: '620px',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#F8FAF9'
            }}
          >
            {/* Help Indicator Pill */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)',
                fontSize: '12px',
                color: 'var(--text-secondary)'
              }}
            >
              <Info size={14} color="var(--orbit-green)" />
              <span>Click 3D Treatment Facilities or Smart Bins to inspect real-time operational telemetry</span>
            </div>

            <SmartCityCanvas
              bins={filteredBins}
              facilities={filteredFacilities}
              selectedBinId={selectedBinId}
              selectedFacilityId={selectedFacility?.facility_id}
              onSelectBin={(bin) => handleSelectBin(bin)}
              onSelectFacility={(fac) => handleSelectFacility(fac)}
            />
          </div>
        </div>

        {/* Telemetry & Details Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '690px' }}>
          {/* Detailed Selected Facility Inspector */}
          {selectedFacility ? (
            <div
              className="card-orbit"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: '1.5px solid var(--orbit-green)',
                backgroundColor: '#FFFFFF',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-mint" style={{ fontSize: '10.5px' }}>
                  {selectedFacility.type}
                </span>
                <button onClick={() => setSelectedFacility(null)} className="btn-ghost" style={{ padding: '4px' }}>
                  <X size={16} color="var(--text-muted)" />
                </button>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                  {selectedFacility.name}
                </h3>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  📍 {selectedFacility.zone}
                </div>
              </div>

              {/* Facility Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700' }}>CAPACITY / LOAD</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedFacility.current_load_tons_day} / {selectedFacility.capacity_tons_day} t
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--deep-green)', fontWeight: '600' }}>
                    {selectedFacility.utilization_percent}% utilized
                  </div>
                </div>

                <div style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700' }}>RECOVERY YIELD</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--orbit-green)', marginTop: '2px' }}>
                    {selectedFacility.recovery_rate_percent}%
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Target: &gt;75%</div>
                </div>
              </div>

              {/* Input & Processing Stream */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px' }}>
                <div style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>Input Stream: </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{selectedFacility.input_stream}</span>
                </div>
                <div style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>Processing Mode: </span>
                  <span style={{ color: 'var(--deep-green)', fontWeight: '600' }}>{selectedFacility.processing_mode}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', paddingTop: '4px' }}>
                <span>Status: <strong style={{ color: 'var(--deep-green)' }}>● {selectedFacility.status}</strong></span>
                <span>Telemetry: {selectedFacility.last_update}</span>
              </div>
            </div>
          ) : null}

          {/* Treatment Facilities List */}
          <div
            className="card-orbit"
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              flex: selectedFacility ? 'none' : '1',
              maxHeight: selectedFacility ? '180px' : '300px',
              overflow: 'hidden'
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--deep-green)', marginBottom: '10px' }}>
              Treatment Facilities ({filteredFacilities.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
              {filteredFacilities.map((fac) => (
                <div
                  key={fac.facility_id}
                  onClick={() => handleSelectFacility(fac)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: selectedFacility?.facility_id === fac.facility_id ? 'var(--soft-mint)' : 'var(--bg-secondary)',
                    border: selectedFacility?.facility_id === fac.facility_id ? '1.5px solid var(--orbit-green)' : '1px solid var(--border-light)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                  className="btn-ghost"
                >
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {fac.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {fac.zone} • {fac.type}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '800', color: 'var(--orbit-green)' }}>
                      {fac.recovery_rate_percent}%
                    </div>
                    <span style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>recovery</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Smart Bins List */}
          <div
            className="card-orbit"
            style={{
              flex: 1,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Smart Bins in Network ({filteredBins.length})
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredBins.map((bin) => {
                const statusStyle = getStatusColor(bin.status, bin.fill_level);
                return (
                  <div
                    key={bin.bin_id}
                    onClick={() => handleSelectBin(bin)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: selectedBinId === bin.bin_id ? 'var(--soft-mint)' : 'var(--bg-secondary)',
                      border: selectedBinId === bin.bin_id ? '1.5px solid var(--orbit-green)' : '1px solid var(--border-light)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                    className="btn-ghost"
                  >
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {bin.bin_id} • {bin.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                        {bin.zone} • {bin.waste_type}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: statusStyle.text }}>
                        {bin.fill_level}%
                      </div>
                      <span className={`badge ${statusStyle.badgeClass}`} style={{ fontSize: '9px', padding: '1px 5px' }}>
                        {bin.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

