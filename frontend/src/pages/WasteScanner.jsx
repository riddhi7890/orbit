import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  ScanLine,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Leaf,
  Layers,
  ArrowRight,
  Trash2,
  FileImage,
  Zap
} from 'lucide-react';
import { classifyWaste } from '../services/wasteService';
import { SAMPLE_WASTE_PRESETS } from '../data/mockData';
import { formatPercent } from '../utils/formatters';

export default function WasteScanner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setSelectedPresetId(null);
    setScanResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPreset = (preset) => {
    setSelectedFile(null);
    setSelectedPresetId(preset.id);
    setPreviewUrl(preset.preview_url);
    setScanResult(null);
    setError(null);
  };

  const handleTriggerScan = async () => {
    if (!previewUrl && !selectedFile && !selectedPresetId) {
      setError('Please select or upload a waste item to scan.');
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      const res = await classifyWaste(selectedFile, selectedPresetId);
      setScanResult(res.data);
      
      // Fire confetti if recyclable / high confidence
      if (res.data.category === 'RECYCLABLE' || res.data.category === 'ORGANIC') {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#20A66A', '#00D2A0', '#0EA5E9', '#F59E0B']
        });
      }
    } catch (err) {
      setError('Neural vision analysis error. Please try another image.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedPresetId(null);
    setScanResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner */}
      <div
        className="card-orbit card-orbit-highlight orbit-grid-bg"
        style={{ padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-mint">
              <Sparkles size={12} color="var(--orbit-green)" />
              Neural Vision v4.2 Active
            </span>
            <span className="badge badge-cyan">
              Multi-Spectral Material Segregation
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>
            AI Waste Classifier & Material Analyzer
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '4px' }}>
            Upload or capture waste item imagery. ORBIT neural networks instantly identify polymer composition, recyclable grades, organic biodegradability, and optimal circular disposal paths.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="btn-secondary"
          style={{ padding: '10px 18px', fontSize: '13.5px' }}
        >
          <RefreshCw size={15} />
          Reset Scanner
        </button>
      </div>

      {/* Main Scanner Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '28px', alignItems: 'start' }}>
        {/* Left Column: Image Dropzone & Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Dropzone Container */}
          <div
            className="card-orbit"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{
              padding: '24px',
              border: previewUrl ? '1.5px solid var(--orbit-green)' : '2px dashed var(--border)',
              backgroundColor: previewUrl ? '#FFFFFF' : 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Laser scanner animation overlay during scan */}
            {isScanning && <div className="laser-scanner-bar" />}

            {previewUrl ? (
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '320px', backgroundColor: '#F8FAFC' }}>
                <img
                  src={previewUrl}
                  alt="Waste to scan"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />

                {/* Remove Image Button */}
                <button
                  onClick={handleReset}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '8px',
                    backdropFilter: 'blur(4px)'
                  }}
                  title="Remove image"
                >
                  <Trash2 size={16} />
                </button>

                {isScanning && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.65)',
                      backdropFilter: 'blur(2px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px'
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        border: '3px solid var(--orbit-green)',
                        borderTopColor: 'transparent',
                        animation: 'spin-slow 0.8s linear infinite'
                      }}
                    />
                    <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--deep-green)' }}>
                      ORBIT AI is analyzing your waste...
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Extracting material signatures & polymer density
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '48px 24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--soft-mint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <UploadCloud size={30} color="var(--orbit-green)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Drop waste image here, or <span style={{ color: 'var(--orbit-green)' }}>browse files</span>
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Supports high-res JPG, PNG, WEBP, or live camera feed captures
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {/* Preset Demo Items for Hackathon Presentation */}
          <div className="card-orbit" style={{ padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Quick Preset Samples (Hackathon Demo Mode)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {SAMPLE_WASTE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '10px',
                    backgroundColor: selectedPresetId === preset.id ? 'var(--soft-mint)' : 'var(--bg-secondary)',
                    border: selectedPresetId === preset.id ? '1.5px solid var(--orbit-green)' : '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <img
                    src={preset.preview_url}
                    alt={preset.name}
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', textAlign: 'center' }}>
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scan Action Button */}
          <button
            onClick={handleTriggerScan}
            disabled={isScanning || !previewUrl}
            className="btn-primary"
            style={{
              padding: '16px',
              fontSize: '15px',
              fontWeight: '700',
              opacity: previewUrl && !isScanning ? 1 : 0.6
            }}
          >
            <ScanLine size={20} />
            <span>{isScanning ? 'Classifying with Neural Network...' : 'Analyze Waste with ORBIT AI'}</span>
          </button>
        </div>

        {/* Right Column: AI Classification Results Display */}
        <div>
          <AnimatePresence mode="wait">
            {scanResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="card-orbit"
                style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '22px' }}
              >
                {/* Result Header Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--soft-mint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CheckCircle2 size={18} color="var(--orbit-green)" />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--deep-green)' }}>
                      AI CLASSIFICATION COMPLETE
                    </span>
                  </div>

                  <span
                    className={scanResult.category === 'RECYCLABLE' ? 'badge badge-good' : scanResult.category === 'ORGANIC' ? 'badge badge-mint' : 'badge badge-critical'}
                    style={{ fontSize: '12px', padding: '6px 12px' }}
                  >
                    {scanResult.category}
                  </span>
                </div>

                {/* Detected Object Title */}
                <div>
                  <h3
                    className="brand-font"
                    style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.15 }}
                  >
                    {scanResult.detected_object}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--deep-green)' }}>
                      Confidence: {formatPercent(scanResult.confidence)}
                    </span>
                    <span style={{ color: 'var(--border)' }}>•</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Material: <strong>{scanResult.material}</strong>
                    </span>
                  </div>
                </div>

                {/* Recommended Action Card */}
                <div
                  style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--soft-mint)',
                    border: '1px solid rgba(32, 166, 106, 0.3)'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--deep-green)', marginBottom: '4px' }}>
                    Recommended Disposal Action
                  </div>
                  <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {scanResult.recommended_action}
                  </div>
                </div>

                {/* Environmental & Circular Impact */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="card-orbit" style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: '700', color: 'var(--deep-green)', marginBottom: '6px' }}>
                      <Leaf size={14} color="var(--orbit-green)" /> Environmental Offset
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.45, fontWeight: '500' }}>
                      {scanResult.environmental_impact}
                    </div>
                  </div>

                  <div className="card-orbit" style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: '700', color: '#0369A1', marginBottom: '6px' }}>
                      <Layers size={14} color="#0EA5E9" /> Circular Yield
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.45, fontWeight: '500' }}>
                      {scanResult.circular_yield}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div
                className="card-orbit"
                style={{
                  padding: '60px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: '16px',
                  backgroundColor: '#FFFFFF',
                  minHeight: '440px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ScanLine size={28} color="var(--text-muted)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Waiting for Item to Scan
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '320px', margin: '6px auto 0' }}>
                    Select an image or one of the quick presets on the left, then click &quot;Analyze Waste with ORBIT AI&quot;.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
