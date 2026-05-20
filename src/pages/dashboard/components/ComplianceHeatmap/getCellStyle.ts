import type { CSSProperties } from 'react';

export default function getCellStyle(pct: number): CSSProperties {
  if (pct >= 80) {
    const t = Math.min((pct - 80) / 20, 1);
    const opacity = 0.18 + t * 0.65;
    return {
      backgroundColor: `rgba(16, 185, 129, ${opacity.toFixed(2)})`,
      color: t > 0.45 ? '#064e3b' : '#065f46',
    };
  }
  if (pct >= 70) {
    const t = (79 - pct) / 9;
    const opacity = 0.2 + t * 0.55;
    return {
      backgroundColor: `rgba(245, 158, 11, ${opacity.toFixed(2)})`,
      color: '#78350f',
    };
  }
  const t = Math.min((70 - pct) / 30, 1);
  const opacity = 0.18 + t * 0.65;
  return {
    backgroundColor: `rgba(239, 68, 68, ${opacity.toFixed(2)})`,
    color: t > 0.45 ? '#7f1d1d' : '#991b1b',
  };
}
