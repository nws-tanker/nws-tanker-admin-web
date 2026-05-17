import type { RagStatus } from '@/types/dashboard';

export const RAG_ON_TRACK = 80;
export const RAG_AT_RISK = 70;

export function currentQuarterLabel(): string {
  const now = new Date();
  const q = Math.floor(now.getMonth() / 3) + 1;
  return `${now.getFullYear()}-Q${q}`;
}

export function buildQuarterOptions(
  count = 6,
): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  const now = new Date();
  let year = now.getFullYear();
  let q = Math.floor(now.getMonth() / 3) + 1;
  for (let i = 0; i < count; i++) {
    const value = `${year}-Q${q}`;
    options.push({ value, label: value.replace('-', ' ') });
    q -= 1;
    if (q < 1) {
      q = 4;
      year -= 1;
    }
  }
  return options;
}

export function ragStatusLabel(status: RagStatus): string {
  if (status === 'on_track') return 'On track';
  if (status === 'at_risk') return 'At Risk';
  return 'Critical';
}

export function ragToneClass(status: RagStatus): string {
  if (status === 'on_track') return 'text-green-700';
  if (status === 'at_risk') return 'text-amber-600';
  return 'text-red-600';
}

export function ragBgClass(value: number | null): string {
  if (value == null) return 'bg-ink-100 text-ink-400';
  if (value >= RAG_ON_TRACK) return 'bg-teal-100 text-teal-900';
  if (value >= RAG_AT_RISK) return 'bg-amber-100 text-amber-900';
  return 'bg-red-100 text-red-900';
}

export function formatPct(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function trendWindowLabel(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) =>
    d.toLocaleString('en', { month: 'short', year: 'numeric' });
  return `${fmt(s)} – ${fmt(e)}`;
}
