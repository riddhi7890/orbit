import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building2, Recycle, ShieldCheck, Sparkles } from 'lucide-react';
import DashboardHero from '../components/dashboard/DashboardHero';
import KpiCards from '../components/dashboard/KpiCards';
import WasteOverviewWidget from '../components/dashboard/WasteOverviewWidget';
import PrioritySummaryWidget from '../components/dashboard/PrioritySummaryWidget';
import RecommendationsWidget from '../components/dashboard/RecommendationsWidget';
import SmartCityCanvas from '../components/3d/SmartCityCanvas';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import { MOCK_TREATMENT_FACILITIES } from '../data/mockData';

export default function Dashboard() {
  const {
    dashboard,
    bins,
    wasteStats,
    priorities,
    recommendations,
    loading,
    selectedBinId,
    setSelectedBinId
  } = useAppData();
  const { isAuthority, isOperator, switchActiveRole } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
    >
      {/* Role Context Bar & View Switcher (For demo/judges evaluation) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-xs)',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              backgroundColor: isAuthority ? '#EFFBF5' : 'var(--soft-mint)',
              border: isAuthority ? '1px solid rgba(8, 116, 67, 0.3)' : '1px solid rgba(32, 166, 106, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isAuthority ? (
              <Building2 size={16} color="var(--deep-green)" />
            ) : (
              <Recycle size={16} color="var(--orbit-green)" />
            )}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {isAuthority
                ? 'Government & Smart City Authority View'
                : 'Waste Management & Treatment Operator View'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {isAuthority
                ? 'City-wide waste flow, treatment plant capacity & environmental metrics'
                : 'Facility monitoring, IoT bin telemetry & operational priority dispatch'}
            </div>
          </div>
        </div>

        {/* Seamless Role Toggle for judges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Perspective:
          </span>
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-secondary)', padding: '2px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <button
              onClick={() => switchActiveRole('operator')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: '700',
                backgroundColor: !isAuthority ? '#FFFFFF' : 'transparent',
                color: !isAuthority ? 'var(--deep-green)' : 'var(--text-secondary)',
                boxShadow: !isAuthority ? 'var(--shadow-xs)' : 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Operator
            </button>
            <button
              onClick={() => switchActiveRole('authority')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: '700',
                backgroundColor: isAuthority ? '#FFFFFF' : 'transparent',
                color: isAuthority ? 'var(--deep-green)' : 'var(--text-secondary)',
                boxShadow: isAuthority ? 'var(--shadow-xs)' : 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Authority
            </button>
          </div>
        </div>
      </div>

      {/* LEVEL 1: HERO SECTION - ORBIT Branding + Tagline + 3D Focal Canvas */}
      <DashboardHero />

      {/* LEVEL 2: REAL-TIME KPIs - Floating Cards */}
      <KpiCards data={dashboard} loading={loading} />

      {/* LEVEL 3A: TWO-COLUMN INTELLIGENCE - Waste & Treatment Streams & Collection Priority */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
          gap: '28px'
        }}
      >
        <WasteOverviewWidget data={wasteStats} />
        <PrioritySummaryWidget
          priorities={priorities}
          onSelectBin={(binId) => {
            setSelectedBinId(binId);
            navigate('/smart-city-map');
          }}
        />
      </div>

      {/* LEVEL 3B: AI RECOMMENDATIONS & 3D SMART WASTE TREATMENT NETWORK PREVIEW */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.25fr',
          gap: '28px',
          alignItems: 'stretch'
        }}
      >
        {/* Left: AI Recommendations Floating Module */}
        <RecommendationsWidget recommendations={recommendations} />

        {/* Right: 3D Smart Waste Treatment Network Preview Card */}
        <div className="card-orbit" style={{ padding: '28px 30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
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
                <Recycle size={18} color="var(--orbit-green)" />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Smart Waste Treatment Network
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Treatment plants, recycling centers, recovery hubs & collection fleet
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/smart-city-map')}
              className="btn-primary"
              style={{ fontSize: '12.5px', padding: '8px 16px' }}
            >
              <span>Explore Network 3D</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Embedded 3D Smart Treatment Canvas */}
          <div style={{ flex: 1, minHeight: '280px', height: '280px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <SmartCityCanvas
              bins={bins.slice(0, 8)}
              facilities={MOCK_TREATMENT_FACILITIES}
              selectedBinId={selectedBinId}
              onSelectBin={(bin) => {
                setSelectedBinId(bin.bin_id);
                navigate('/smart-city-map');
              }}
              onSelectFacility={() => {
                navigate('/smart-city-map');
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

