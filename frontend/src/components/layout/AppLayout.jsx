import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import GlobalSearchModal from './GlobalSearchModal';
import FloatingAiAssistant from '../ai/FloatingAiAssistant';
import BinDetailModal from '../ui/BinDetailModal';
import { useAppData } from '../../context/AppDataContext';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedBinId, setSelectedBinId } = useAppData();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div
        style={{
          flex: 1,
          marginLeft: '260px',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          transition: 'margin-left 0.3s ease'
        }}
        id="main-app-container"
      >
        {/* Top Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dynamic Page Views */}
        <main style={{ flex: 1, padding: '28px', maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>

        {/* Global Floating AI Assistant Widget */}
        <FloatingAiAssistant />

        {/* Global Search Modal (⌘K / Ctrl+K) */}
        <GlobalSearchModal />

        {/* Bin Detail Inspector Slide-over */}
        {selectedBinId && (
          <BinDetailModal
            binId={selectedBinId}
            onClose={() => setSelectedBinId(null)}
          />
        )}
      </div>
    </div>
  );
}
