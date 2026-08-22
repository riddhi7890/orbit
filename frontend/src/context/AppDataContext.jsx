import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getDashboard } from '../services/dashboardService';
import { getBins } from '../services/binService';
import { getWasteStats } from '../services/statsService';
import { getCollectionPriority } from '../services/collectionService';
import { getRecommendations } from '../services/recommendationService';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [dashboard, setDashboard] = useState(null);
  const [bins, setBins] = useState([]);
  const [wasteStats, setWasteStats] = useState(null);
  const [priorities, setPriorities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    let mockActive = false;

    try {
      const [dashRes, binsRes, statsRes, prioRes, recRes] = await Promise.allSettled([
        getDashboard(),
        getBins(),
        getWasteStats(),
        getCollectionPriority(),
        getRecommendations()
      ]);

      let allMock = true;

      if (dashRes.status === 'fulfilled' && dashRes.value) {
        setDashboard(dashRes.value.data);
        if (!dashRes.value.isMock) allMock = false;
      }
      if (binsRes.status === 'fulfilled' && binsRes.value) {
        setBins(binsRes.value.data);
        if (!binsRes.value.isMock) allMock = false;
      }
      if (statsRes.status === 'fulfilled' && statsRes.value) {
        setWasteStats(statsRes.value.data);
        if (!statsRes.value.isMock) allMock = false;
      }
      if (prioRes.status === 'fulfilled' && prioRes.value) {
        setPriorities(prioRes.value.data);
        if (!prioRes.value.isMock) allMock = false;
      }
      if (recRes.status === 'fulfilled' && recRes.value) {
        setRecommendations(recRes.value.data);
        if (!recRes.value.isMock) allMock = false;
      }

      setIsDemoMode(allMock);
      setLastRefreshed(new Date());
    } catch (e) {
      console.error('Error fetching ORBIT application data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Update a single bin in local state (e.g. after simulation)
  const updateLocalBin = (binId, updatedFields) => {
    setBins(prev => prev.map(b => (b.bin_id === binId ? { ...b, ...updatedFields } : b)));
  };

  return (
    <AppDataContext.Provider
      value={{
        dashboard,
        bins,
        wasteStats,
        priorities,
        recommendations,
        loading,
        isDemoMode,
        lastRefreshed,
        refreshAllData: fetchAllData,
        selectedBinId,
        setSelectedBinId,
        isSearchOpen,
        setIsSearchOpen,
        updateLocalBin
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
