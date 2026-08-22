import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';

import ProtectedRoute from './components/layout/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WasteScanner from './pages/WasteScanner';
import SmartCityMap from './pages/SmartCityMap';
import CollectionPriority from './pages/CollectionPriority';
import WasteAnalytics from './pages/WasteAnalytics';
import ResourceRecovery from './pages/ResourceRecovery';
import AIAssistantPage from './pages/AIAssistantPage';
import SettingsPage from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppDataProvider>
          <Routes>
            {/* Public Login Route (First Screen) */}
            <Route path="/login" element={<Login />} />

            {/* Protected Application Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="waste-scanner" element={<WasteScanner />} />
              <Route path="smart-city-map" element={<SmartCityMap />} />
              <Route path="collection-priority" element={<CollectionPriority />} />
              <Route path="waste-analytics" element={<WasteAnalytics />} />
              <Route path="resource-recovery" element={<ResourceRecovery />} />
              <Route path="ai-assistant" element={<AIAssistantPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback to Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
