import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Trash2, ArrowRight, Zap } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { getStatusColor } from '../../utils/formatters';

export default function GlobalSearchModal() {
  const { bins, isSearchOpen, setIsSearchOpen, setSelectedBinId } = useAppData();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredBins = bins.filter((bin) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      bin.bin_id.toLowerCase().includes(q) ||
      bin.name.toLowerCase().includes(q) ||
      bin.zone.toLowerCase().includes(q) ||
      bin.waste_type.toLowerCase().includes(q)
    );
  });

  const handleSelectBin = (bin) => {
    setSelectedBinId(bin.bin_id);
    setIsSearchOpen(false);
    navigate('/smart-city-map');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(6px)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px'
      }}
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid var(--border-light)'
          }}
        >
          <Search size={20} color="var(--orbit-green)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search smart bins by ID (e.g. A102), zone, or material..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              fontSize: '15px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              background: 'transparent'
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="btn-ghost" style={{ padding: '4px' }}>
              <X size={16} color="var(--text-muted)" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{
              fontSize: '11px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '2px 6px',
              color: 'var(--text-secondary)'
            }}
          >
            ESC
          </button>
        </div>

        {/* Search Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-muted)',
              padding: '8px 12px 4px'
            }}
          >
            Municipal Smart Bins ({filteredBins.length})
          </div>

          {filteredBins.length === 0 ? (
            <div
              style={{
                padding: '32px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '13px'
              }}
            >
              No smart bins matching &quot;{query}&quot;
            </div>
          ) : (
            filteredBins.map((bin) => {
              const statusStyle = getStatusColor(bin.status, bin.fill_level);
              return (
                <div
                  key={bin.bin_id}
                  onClick={() => handleSelectBin(bin)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    marginBottom: '4px'
                  }}
                  className="btn-ghost"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: statusStyle.bg,
                        border: `1px solid ${statusStyle.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '12px',
                        color: statusStyle.text
                      }}
                    >
                      {bin.fill_level}%
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '13.5px',
                          fontWeight: '700',
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{bin.bin_id}</span>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                          • {bin.name}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '11.5px',
                          color: 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginTop: '1px'
                        }}
                      >
                        <span>📍 {bin.zone}</span>
                        <span>♻️ {bin.waste_type}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`badge ${statusStyle.badgeClass}`}>
                      {bin.status}
                    </span>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
