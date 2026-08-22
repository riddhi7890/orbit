import React, { useState, useEffect } from 'react';
import { X, Battery, Thermometer, Clock, MapPin, Recycle, Zap, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getBin } from '../../services/binService';
import { saveSensorReading } from '../../services/sensorService';
import { useAppData } from '../../context/AppDataContext';
import { getStatusColor } from '../../utils/formatters';

export default function BinDetailModal({ binId, onClose }) {
  const { updateLocalBin } = useAppData();
  const [bin, setBin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const res = await getBin(binId);
      if (mounted) {
        setBin(res.data);
        setLoading(false);
      }
    }
    if (binId) load();
    return () => { mounted = false; };
  }, [binId]);

  const handleSimulateUpdate = async () => {
    if (!bin) return;
    setSimulating(true);
    // Generate simulated new reading
    const delta = Math.floor(Math.random() * 8) - 2; // -2% to +5%
    const newFill = Math.min(100, Math.max(10, bin.fill_level + delta));
    const newTemp = +(bin.temperature_c + (Math.random() * 0.8 - 0.4)).toFixed(1);
    
    await saveSensorReading({
      bin_id: bin.bin_id,
      fill_level: newFill,
      temperature_c: newTemp,
      battery_level: Math.max(10, bin.battery_level - 1),
      timestamp: new Date().toISOString()
    });

    const updatedFields = {
      fill_level: newFill,
      temperature_c: newTemp,
      last_reading: 'Just now',
      status: newFill >= 80 ? 'CRITICAL' : newFill >= 50 ? 'MEDIUM' : 'GOOD'
    };

    setBin(prev => ({ ...prev, ...updatedFields }));
    updateLocalBin(bin.bin_id, updatedFields);
    
    setSimulating(false);
    setSimulationSuccess(true);
    setTimeout(() => setSimulationSuccess(false), 2400);
  };

  if (!binId) return null;

  const statusStyle = bin ? getStatusColor(bin.status, bin.fill_level) : { bg: '#FFF', text: '#000', border: '#EEE', hex: '#10B981' };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 80,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          borderLeft: '1px solid var(--border)',
          animation: 'slideInRight 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              <Recycle size={18} color="var(--orbit-green)" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                {bin ? `Smart Bin ${bin.bin_id}` : 'Loading Bin...'}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {bin?.zone || 'Municipal Network'}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px' }} aria-label="Close Inspector">
            <X size={18} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Content Body */}
        {loading || !bin ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <RefreshCw size={24} className="animate-spin-slow" color="var(--orbit-green)" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '13px', fontWeight: '600' }}>Fetching live bin telemetry...</p>
          </div>
        ) : (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Fill Level Main Gauge Card */}
            <div
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: statusStyle.bg,
                border: `1.5px solid ${statusStyle.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: statusStyle.text }}>
                  Current Fill Level
                </div>
                <div style={{ fontSize: '38px', fontWeight: '800', color: statusStyle.text, lineHeight: 1.1, margin: '4px 0' }}>
                  {bin.fill_level}%
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  {bin.current_liters} L of {bin.capacity_liters} L Capacity
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${statusStyle.badgeClass}`} style={{ fontSize: '12px', padding: '6px 12px' }}>
                  {bin.status}
                </span>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Overflow in ~{bin.estimated_time_to_overflow_hours}h
                </div>
              </div>
            </div>

            {/* Telemetry Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="card-orbit" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '11.5px', fontWeight: '600' }}>
                  <Thermometer size={15} color="#F59E0B" /> Temperature
                </div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '6px' }}>
                  {bin.temperature_c}°C
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Nominal thermal range</div>
              </div>

              <div className="card-orbit" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '11.5px', fontWeight: '600' }}>
                  <Battery size={15} color="var(--orbit-green)" /> Battery (Solar)
                </div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '6px' }}>
                  {bin.battery_level}%
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Self-charging cell</div>
              </div>

              <div className="card-orbit" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '11.5px', fontWeight: '600' }}>
                  <Clock size={15} color="#0EA5E9" /> Last Telemetry
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '6px' }}>
                  {bin.last_reading}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Auto-sync active</div>
              </div>

              <div className="card-orbit" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '11.5px', fontWeight: '600' }}>
                  <MapPin size={15} color="var(--deep-green)" /> Waste Stream
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {bin.waste_type}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Segregated</div>
              </div>
            </div>

            {/* Sensor Reading History Trend */}
            <div className="card-orbit" style={{ padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Fill Accumulation Profile (Today)
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '80px', gap: '8px', paddingTop: '10px' }}>
                {bin.sensor_history.map((hist, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${hist.fill * 0.65}px`,
                        backgroundColor: hist.fill >= 80 ? 'var(--status-critical)' : hist.fill >= 50 ? 'var(--status-warning)' : 'var(--orbit-green)',
                        borderRadius: '4px',
                        transition: 'height 0.3s ease'
                      }}
                      title={`${hist.fill}% at ${hist.time}`}
                    />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{hist.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulate Action Button */}
            <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
              {simulationSuccess && (
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--status-good-bg)',
                    border: '1px solid var(--status-good-border)',
                    color: 'var(--deep-green)',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px'
                  }}
                >
                  <CheckCircle2 size={15} color="var(--orbit-green)" />
                  IoT sensor telemetry synchronized successfully with ORBIT network!
                </div>
              )}

              <button
                onClick={handleSimulateUpdate}
                disabled={simulating}
                className="btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                <Zap size={16} />
                {simulating ? 'Simulating Sensor Transmission...' : 'Simulate IoT Sensor Update'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
