// PREVIEW ONLY — static HTML-to-JSX translation of the Permit Renewal design mock.
// To remove: delete src/pages/preview/ and revert the route in App.tsx.

import { useState, useRef, useEffect } from 'react';
import { AppShell } from '@/common-components/AppShell';
import {
  PERMITS,
  CLUSTER_REGIONS,
  ALL_CLUSTERS,
  daysUntil,
  fmtDate,
  H24,
  type Permit,
} from './mockData';
import { usePreviewLoader } from '../usePreviewLoader';
import s from './preview.module.css';
import ls from '../loader.module.css';

// ── Helpers ────────────────────────────────────────────────────────────────

function TypeChip({ type }: { type: string }) {
  const cls = type === 'DW' ? s.chipDW : type === 'SW' ? s.chipSW : s.chipTE;
  const label =
    type === 'DW'
      ? 'Drinking Water'
      : type === 'SW'
        ? 'Sewage Water'
        : 'Treated Effluent';
  return <span className={`${s.chip} ${cls}`}>{label}</span>;
}

function DaysCell({ p }: { p: Permit }) {
  const d = daysUntil(p.validUntil);
  if (d <= 0) return <span className={s.expiredBadge}>EXPIRED</span>;
  if (d <= 7) return <span className={s.daysRed}>{d}d</span>;
  return <span className={s.daysAmber}>{d}d</span>;
}

function ReminderCell({
  p,
  notifyState,
}: {
  p: Permit;
  notifyState: Record<string, number>;
}) {
  const ts = notifyState[p.id] ?? p.lastReminder;
  if (!ts) return <span className={s.noReminder}>Not notified</span>;
  const hoursAgo = (Date.now() - ts) / 3600000;
  const label =
    new Date(ts).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) +
    ', ' +
    new Date(ts).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  return (
    <div>
      <div className={s.reminderTs}>{label}</div>
      {hoursAgo < 24 && (
        <div className={s.reminderSub}>Sent recently (24h cooldown)</div>
      )}
    </div>
  );
}

// Multi-select dropdown
function FilterDropdown({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const toggle = (val: string) => {
    onChange(
      selected.includes(val)
        ? selected.filter((x) => x !== val)
        : [...selected, val],
    );
  };

  const displayLabel =
    selected.length === 0 ? label : `${label} (${selected.length})`;

  return (
    <div className={s.dropdownWrap} ref={ref}>
      <button
        className={`${s.filterBtn}${selected.length > 0 ? ` ${s.filterBtnActive}` : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {displayLabel} ▾
      </button>
      {open && (
        <div className={s.dropdownPanel}>
          {options.map((opt) => (
            <label key={opt} className={s.dropdownItem}>
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

type Tab = '30' | '7' | 'expired';

export default function PermitRenewalPreviewPage() {
  const [activeTab, setActiveTab] = useState<Tab>('30');
  const [clusterFilter, setClusterFilter] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [notifyState, setNotifyState] = useState<Record<string, number>>({});
  const ready = usePreviewLoader();

  // Derived counts
  const cnt30 = PERMITS.filter((p) => {
    const d = daysUntil(p.validUntil);
    return d > 0 && d <= 30;
  }).length;
  const cnt7 = PERMITS.filter((p) => {
    const d = daysUntil(p.validUntil);
    return d > 0 && d <= 7;
  }).length;
  const cntExpired = PERMITS.filter((p) => daysUntil(p.validUntil) <= 0).length;

  // Tab-filtered
  function tabPermits(tab: Tab) {
    if (tab === 'expired')
      return PERMITS.filter((p) => daysUntil(p.validUntil) <= 0);
    if (tab === '7')
      return PERMITS.filter((p) => {
        const d = daysUntil(p.validUntil);
        return d > 0 && d <= 7;
      });
    return PERMITS.filter((p) => {
      const d = daysUntil(p.validUntil);
      return d > 0 && d <= 30;
    });
  }

  // Fully filtered
  function filteredPermits() {
    let rows = tabPermits(activeTab);
    if (clusterFilter.length)
      rows = rows.filter((r) => clusterFilter.includes(r.cluster));
    if (regionFilter.length)
      rows = rows.filter((r) => regionFilter.includes(r.gov));
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.plate.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q) ||
          r.permitNo.toLowerCase().includes(q),
      );
    }
    return rows;
  }

  function canNotify(p: Permit) {
    const ts = notifyState[p.id] ?? p.lastReminder;
    return !ts || Date.now() - ts >= H24;
  }

  const rows = filteredPermits();
  const eligible = rows.filter((p) => canNotify(p)).length;

  // Available regions (filtered by cluster selection)
  const availRegions = (
    clusterFilter.length ? clusterFilter : ALL_CLUSTERS
  ).flatMap((c) => CLUSTER_REGIONS[c] ?? []);

  const hasFilters =
    clusterFilter.length > 0 || regionFilter.length > 0 || search !== '';

  function handleBulkNotify() {
    const toNotify = filteredPermits().filter((p) => canNotify(p));
    if (!toNotify.length) return;
    const now = Date.now();
    setNotifyState((prev) => {
      const next = { ...prev };
      toNotify.forEach((p) => {
        next[p.id] = now;
      });
      return next;
    });
  }

  function handleClusterChange(vals: string[]) {
    setClusterFilter(vals);
    // Drop any region selections that are no longer valid
    if (vals.length) {
      const avail = vals.flatMap((c) => CLUSTER_REGIONS[c] ?? []);
      setRegionFilter((prev) => prev.filter((r) => avail.includes(r)));
    }
  }

  const bulkLabel =
    activeTab === '30' ? 'Send Standard Notice' : 'Send Urgent Warning';
  const bulkBg = activeTab === '30' ? '#0d9488' : '#b91c1c';

  const cardBadgeCls =
    activeTab === '30'
      ? s.countBadgeAmber
      : activeTab === '7'
        ? s.countBadgeRed
        : s.countBadgeDark;

  if (!ready) {
    return (
      <AppShell breadcrumbs={['Home', 'Permit Renewal']}>
        <div className={ls.skeleton}>
          <div className={ls.skHeader}>
            <div className={`${ls.pulse} ${ls.skTitle}`} />
            <div className={`${ls.pulse} ${ls.skSub}`} />
          </div>
          <div
            className={ls.skTiles}
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`${ls.pulse} ${ls.skTile}`}
                style={{ height: 110 }}
              />
            ))}
          </div>
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 48 }} />
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 320 }} />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell breadcrumbs={['Home', 'Permit Renewal']}>
      <div
        className={`${s.root} ${ls.fadeIn}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <div className={s.previewBanner}>🚧 Development in progress</div>

        <div className={s.page}>
          {/* Page header */}
          <div className={s.pageHead}>
            <div>
              <h1>Permit Renewal</h1>
              <div className={s.sub}>
                Monitor permits approaching expiry and schedule renewal
                inspections
              </div>
            </div>
            <div className={s.pageActions}>
              <button className={s.btnGhostSm}>Export List</button>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  color: 'white',
                  background: bulkBg,
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={handleBulkNotify}
              >
                {bulkLabel}
                {eligible > 0 && (
                  <span
                    style={{
                      background: 'rgba(255,255,255,0.25)',
                      padding: '1px 6px',
                      borderRadius: 10,
                      fontSize: 11,
                      fontFamily: 'var(--f-mono)',
                    }}
                  >
                    {eligible}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* KPI tab tiles */}
          <div className={s.kpiGrid}>
            <div
              className={`${s.kpiTile}${activeTab === '30' ? ` ${s.tileAmber}` : ''}`}
              onClick={() => setActiveTab('30')}
            >
              <div className={`${s.kpiTileLabel} ${s.tileAmberLabel}`}>
                Expiring in 30 Days
              </div>
              <div className={`${s.kpiTileCount} ${s.tileAmberCount}`}>
                {cnt30}
              </div>
              <div className={s.kpiTileSub}>
                Valid permits · renewal notices eligible
              </div>
            </div>
            <div
              className={`${s.kpiTile}${activeTab === '7' ? ` ${s.tileRed}` : ''}`}
              onClick={() => setActiveTab('7')}
            >
              <div className={`${s.kpiTileLabel} ${s.tileRedLabel}`}>
                Expiring in 7 Days
              </div>
              <div className={`${s.kpiTileCount} ${s.tileRedCount}`}>
                {cnt7}
              </div>
              <div className={s.kpiTileSub}>Urgent — escalate immediately</div>
            </div>
            <div
              className={`${s.kpiTile}${activeTab === 'expired' ? ` ${s.tileDarkRed}` : ''}`}
              onClick={() => setActiveTab('expired')}
            >
              <div className={`${s.kpiTileLabel} ${s.tileDarkRedLabel}`}>
                Expired
              </div>
              <div className={`${s.kpiTileCount} ${s.tileDarkRedCount}`}>
                {cntExpired}
              </div>
              <div className={s.kpiTileSub}>
                Permits past due date — action required
              </div>
            </div>
          </div>

          {/* Filter bar */}
          <div className={s.filterBar}>
            <span className={s.filterLabel}>Filters:</span>
            <FilterDropdown
              label="All Clusters"
              options={ALL_CLUSTERS}
              selected={clusterFilter}
              onChange={handleClusterChange}
            />
            <FilterDropdown
              label="All Regions"
              options={availRegions}
              selected={regionFilter}
              onChange={setRegionFilter}
            />
            <div className={s.filterSearch}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className={s.filterSearchInput}
                type="text"
                placeholder="Search plate, owner, permit…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className={s.filterClearBtn}
                  onClick={() => setSearch('')}
                >
                  ✕
                </button>
              )}
            </div>
            <div className={s.filterSpacer} />
            {hasFilters && (
              <button
                className={s.btnGhostSm}
                onClick={() => {
                  setClusterFilter([]);
                  setRegionFilter([]);
                  setSearch('');
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Table card */}
          <div className={s.card}>
            <div className={s.cardHead}>
              <span className={s.cardTitle}>
                {activeTab === '30'
                  ? 'Expiring in 30 Days'
                  : activeTab === '7'
                    ? 'Expiring in 7 Days'
                    : 'Expired Permits'}
              </span>
              <span className={`${s.countBadge} ${cardBadgeCls}`}>
                {rows.length}
              </span>
            </div>

            {rows.length === 0 ? (
              <div className={s.empty}>
                <div className={s.emptyTitle}>No permits in this category</div>
                <div className={s.emptySub}>
                  Try adjusting cluster or region filters
                </div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className={s.tbl}>
                  <thead>
                    <tr>
                      <th>Plate No.</th>
                      <th>Owner</th>
                      <th>Type</th>
                      <th>Permit No.</th>
                      <th>Valid Until</th>
                      <th>Days Remaining</th>
                      <th>Last Inspector</th>
                      <th style={{ minWidth: 170 }}>Last Reminder Sent</th>
                      <th style={{ width: 150 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((p) => {
                      const expired = daysUntil(p.validUntil) <= 0;
                      return (
                        <tr
                          key={p.id}
                          className={expired ? s.rowExpired : undefined}
                        >
                          <td>
                            <span className={s.plate}>{p.plate}</span>
                          </td>
                          <td style={{ fontSize: 13 }}>{p.owner}</td>
                          <td>
                            <TypeChip type={p.type} />
                          </td>
                          <td className={s.mono}>{p.permitNo}</td>
                          <td style={{ fontSize: 13, color: '#374151' }}>
                            {fmtDate(p.validUntil)}
                          </td>
                          <td>
                            <DaysCell p={p} />
                          </td>
                          <td style={{ fontSize: 12, color: '#374151' }}>
                            {p.lastInspector}
                          </td>
                          <td>
                            <ReminderCell p={p} notifyState={notifyState} />
                          </td>
                          <td>
                            <button className={s.btnAssign}>
                              Assign for Inspection
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
