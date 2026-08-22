// Utility Formatters for Currency, Metrics, and Dates

export function formatTons(tons) {
  if (tons === undefined || tons === null) return '0.0 t';
  return `${Number(tons).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} t`;
}

export function formatPercent(val) {
  if (val === undefined || val === null) return '0.0%';
  return `${Number(val).toFixed(1)}%`;
}

export function formatCurrency(val) {
  if (val === undefined || val === null) return '$0';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

export function formatNumber(val) {
  if (val === undefined || val === null) return '0';
  return Number(val).toLocaleString('en-US');
}

export function getStatusColor(status, fillLevel) {
  const upper = String(status || '').toUpperCase();
  const fill = Number(fillLevel || 0);

  if (upper === 'CRITICAL' || fill >= 80) {
    return {
      bg: 'var(--status-critical-bg)',
      text: 'var(--status-critical)',
      border: 'var(--status-critical-border)',
      badgeClass: 'badge-critical',
      hex: '#EF4444'
    };
  }
  if (upper === 'HIGH' || upper === 'MEDIUM' || fill >= 50) {
    return {
      bg: 'var(--status-warning-bg)',
      text: '#B45309',
      border: 'var(--status-warning-border)',
      badgeClass: 'badge-warning',
      hex: '#F59E0B'
    };
  }
  return {
    bg: 'var(--status-good-bg)',
    text: 'var(--deep-green)',
    border: 'var(--status-good-border)',
    badgeClass: 'badge-good',
    hex: '#10B981'
  };
}
