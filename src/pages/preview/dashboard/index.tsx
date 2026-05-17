// PREVIEW ONLY — static HTML-to-JSX translation of the design mock.
// To remove: delete src/pages/preview/ and revert the routes in App.tsx.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/common-components/AppShell';
import { usePreviewLoader } from '../usePreviewLoader';
import ls from '../loader.module.css';
import { ROUTES } from '@/constants/routes';
import {
  kpi,
  types,
  clusters,
  INSP_TREND,
  SPARKLINES,
  GOV_CLUSTER,
  OPERATIONAL,
} from './mockData';
import s from './preview.module.css';

// ── Helpers ────────────────────────────────────────────────────────────────

function sparkline(
  values: number[],
  color: string,
  w = 80,
  h = 24,
): React.ReactElement {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const pts = values
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(' ');
  const gradId = `sg-${color.replace('#', '')}`;
  const areaD = `M0,${h} L${pts
    .split(' ')
    .map((p) => p)
    .join(' L')} L${w},${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function heatCls(v: number | null): string {
  if (v == null) return s.empty;
  if (v >= 85) return s.g3;
  if (v >= 80) return s.g2;
  if (v >= 75) return s.a1;
  if (v >= 70) return s.a2;
  if (v >= 65) return s.r2;
  return s.r1;
}

function RagPill({ v }: { v: number }) {
  const cls = v >= 80 ? s.ragG : v >= 70 ? s.ragA : s.ragR;
  const icon = v >= 80 ? '✓' : '!';
  return (
    <span className={s.ragPill}>
      <span className={`${s.ragDot} ${cls}`}>{icon}</span>
      {v}%
    </span>
  );
}

// ── Heatmap (filterable) ────────────────────────────────────────────────────

function Heatmap({ clusterFilter }: { clusterFilter: string }) {
  const govs = clusterFilter
    ? OPERATIONAL.heat.filter((r) => GOV_CLUSTER[r[0]] === clusterFilter)
    : OPERATIONAL.heat;

  if (!govs.length) {
    return (
      <div
        style={{
          padding: 24,
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: 13,
        }}
      >
        No governorates in selected cluster.
      </div>
    );
  }

  const cols = `60px repeat(${govs.length}, 1fr) 60px`;

  const rowAvg = (ti: number) => {
    const vals = govs
      .map((r) => r[ti + 1])
      .filter((v): v is number => v != null);
    return vals.length
      ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
      : null;
  };

  const colAvg = (r: (string | number | null)[]) => {
    const vs = [r[1], r[2], r[3]].filter((v): v is number => v != null);
    return vs.length
      ? Math.round(vs.reduce((a: number, b: number) => a + b, 0) / vs.length)
      : null;
  };

  const colAvgs = govs.map(colAvg);
  const allVals = govs
    .flatMap((r) => [r[1], r[2], r[3]])
    .filter((v): v is number => v != null);
  const grand = allVals.length
    ? Math.round(allVals.reduce((a, b) => a + b, 0) / allVals.length)
    : null;

  return (
    <div className={s.heat} style={{ gridTemplateColumns: cols }}>
      <div className={`${s.heatH} ${s.heatHFirst}`} />
      {govs.map((r) => (
        <div key={r[0] as string} className={s.heatH} style={{ fontSize: 10 }}>
          {r[0]}
        </div>
      ))}
      <div className={`${s.heatH} ${s.heatHAvg}`}>Avg</div>

      {(['DW', 'SW', 'TE'] as const).map((type, ti) => {
        const ra = rowAvg(ti);
        return (
          <>
            <div
              key={`rl-${type}`}
              className={s.heatRL}
              style={{ fontSize: 12, fontWeight: 700 }}
            >
              {type}
            </div>
            {govs.map((r) => {
              const v = r[ti + 1] as number | null;
              return (
                <div
                  key={`${type}-${r[0]}`}
                  className={`${s.heatCell} ${heatCls(v)}`}
                >
                  {v != null ? `${v}%` : '—'}
                </div>
              );
            })}
            <div
              key={`avg-${type}`}
              className={`${s.heatCell} ${s.heatCellAvg} ${heatCls(ra)}`}
            >
              {ra != null ? `${ra}%` : '—'}
            </div>
          </>
        );
      })}

      <div
        className={`${s.heatRL} ${s.heatRLAvg}`}
        style={{ fontSize: 12, fontWeight: 700 }}
      >
        Avg
      </div>
      {colAvgs.map((a, i) => (
        <div
          key={`colavg-${i}`}
          className={`${s.heatCell} ${s.heatCellColAvg} ${heatCls(a)}`}
        >
          {a != null ? `${a}%` : '—'}
        </div>
      ))}
      <div className={`${s.heatCell} ${s.heatCellGrand} ${heatCls(grand)}`}>
        {grand != null ? `${grand}%` : '—'}
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function ExecutiveDashboardPage() {
  const navigate = useNavigate();
  const [cluster, setCluster] = useState('');
  const ready = usePreviewLoader();

  const inspTotal = {
    approved: INSP_TREND.reduce((s, r) => s + r.approved, 0),
    rejected: INSP_TREND.reduce((s, r) => s + r.rejected, 0),
    labPending: INSP_TREND.reduce((s, r) => s + r.labPending, 0),
  };

  const displayTypes = types;

  const padL = 44,
    padT = 16,
    chartH = 160,
    chartW = 756;
  const slotW = chartW / INSP_TREND.length;
  const yMax = 350;
  const cx = (i: number) => padL + (i + 0.5) * slotW;
  const sy = (v: number) => padT + chartH - (v / yMax) * chartH;

  function chartPolyline(
    key: 'approved' | 'rejected' | 'labPending',
    color: string,
    dashed: boolean,
  ) {
    const pts = INSP_TREND.map(
      (_, i) => `${cx(i).toFixed(1)},${sy(INSP_TREND[i][key]).toFixed(1)}`,
    ).join(' ');
    return (
      <>
        <polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeDasharray={dashed ? '5 3' : undefined}
        />
        {INSP_TREND.map((_, i) => (
          <circle
            key={i}
            cx={cx(i)}
            cy={sy(INSP_TREND[i][key])}
            r={3.5}
            fill={color}
            stroke="white"
            strokeWidth={1.5}
          />
        ))}
      </>
    );
  }

  const gridLines = [0, 100, 200, 300].map((v) => {
    const y = sy(v).toFixed(1);
    return (
      <g key={v}>
        <line
          x1={padL}
          x2={padL + chartW}
          y1={y}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
        <text
          x={padL - 6}
          y={+y + 4}
          textAnchor="end"
          fontSize={10}
          fill="#9ca3af"
        >
          {v}
        </text>
      </g>
    );
  });

  if (!ready) {
    return (
      <AppShell breadcrumbs={['Home', 'Executive Dashboard']}>
        <div className={ls.skeleton}>
          <div className={ls.skHeader}>
            <div className={`${ls.pulse} ${ls.skTitle}`} />
            <div className={`${ls.pulse} ${ls.skSub}`} />
          </div>
          <div
            className={ls.skTiles}
            style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`${ls.pulse} ${ls.skTile}`} />
            ))}
          </div>
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 180 }} />
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 240 }} />
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 160 }} />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell breadcrumbs={['Home', 'Executive Dashboard']}>
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
              <h1>Executive Dashboard</h1>
              <div className={s.sub}>
                Fleet-wide compliance posture · {cluster || 'All 3 Clusters'} ·
                refreshed 5 min ago
              </div>
            </div>
            <div className={s.actions}>
              <select className={s.sel} defaultValue="Q2 2026">
                <option>Q2 2026</option>
                <option>Q1 2026</option>
                <option>Year 2026</option>
              </select>
              <select
                className={s.sel}
                value={cluster}
                onChange={(e) => setCluster(e.target.value)}
              >
                <option value="">All 3 Clusters</option>
                <option value="Cluster 1">Cluster 1 — Muscat / North</option>
                <option value="Cluster 2">
                  Cluster 2 — Batinah / Dhahirah
                </option>
                <option value="Cluster 3">
                  Cluster 3 — Dhofar / Sharqiyah / South
                </option>
              </select>
              <button className={s.btnSecondary}>↓ Export PDF</button>
            </div>
          </div>

          {/* ── 6 KPI tiles ─────────────────────────────────────── */}
          <div className={`${s.grid6} ${s.mb}`}>
            <div className={`${s.kpi} ${s.kpiTeal}`}>
              <div className={s.label}>Total Fleet</div>
              <div className={s.val}>
                <span className={s.valN}>
                  {kpi.totalFleet.toLocaleString()}
                </span>
                <span className={s.valU}>units</span>
              </div>
              <div className={s.footnote}>
                DW {kpi.dw.toLocaleString()} · SW {kpi.sw.toLocaleString()} · TE{' '}
                {kpi.te.toLocaleString()}
              </div>
            </div>

            <div className={`${s.kpi} ${s.kpiGreen}`}>
              <div className={s.label}>Compliance Rate</div>
              <div className={s.val}>
                <span className={s.valN}>{kpi.compliance}%</span>
              </div>
              <div className={s.footnote}>
                Target ≥ {kpi.complianceTarget}% ·{' '}
                <span className={`${s.badge} ${s.badgeGreen}`}>
                  <span className={s.dot} />
                  On track
                </span>
              </div>
              <div className={s.spark}>
                {sparkline(SPARKLINES.compliance, '#059669')}
              </div>
            </div>

            <div className={s.kpi}>
              <div className={s.label}>Inspection Pass Rate</div>
              <div className={s.val}>
                <span className={s.valN}>{kpi.passRate}%</span>
                <span className={s.deltaUp}>↑ {kpi.passDelta}</span>
              </div>
              <div className={s.footnote}>
                Rolling 30-day ·{' '}
                <span className={`${s.badge} ${s.badgeGreen}`}>
                  <span className={s.dot} />
                  Healthy
                </span>
              </div>
              <div className={s.spark}>
                {sparkline(SPARKLINES.passRate, '#059669')}
              </div>
            </div>

            <div className={s.kpi}>
              <div className={s.label}>Lab SLA Adherence</div>
              <div className={s.val}>
                <span className={s.valN}>{kpi.sla}%</span>
                <span className={s.deltaDn}>↓ {Math.abs(kpi.slaDelta)}</span>
              </div>
              <div className={s.footnote}>Rolling 30-day · lab tests only</div>
              <div className={s.spark}>
                {sparkline(SPARKLINES.sla, '#D97706')}
              </div>
            </div>

            <div
              className={`${s.kpi} ${s.kpiAmber}`}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(ROUTES.permitRenewal)}
              title="Go to Permit Renewal"
            >
              <div className={s.label}>Expiring ≤ 30 days</div>
              <div className={s.val}>
                <span className={s.valN}>{kpi.expiringSoon}</span>
              </div>
              <div className={s.footnote}>Renewal queue →</div>
              <div className={s.spark}>
                {sparkline(SPARKLINES.expiringSoon, '#D97706')}
              </div>
            </div>

            <div className={`${s.kpi} ${s.kpiRed}`}>
              <div className={s.label}>Expired Permits</div>
              <div className={s.val}>
                <span className={s.valN}>{kpi.expired}</span>
                <span className={s.valU}>
                  {((kpi.expired / kpi.totalFleet) * 100).toFixed(1)}% fleet
                </span>
              </div>
              <div className={s.footnote}>
                Action required · {OPERATIONAL.clusters['Cluster 3'].lab} in
                Cluster 3
              </div>
              <div className={s.spark}>
                {sparkline(SPARKLINES.expired, '#DC2626')}
              </div>
            </div>
          </div>

          {/* ── Compliance by Tanker Type ────────────────────────── */}
          <div className={`${s.card} ${s.mb}`}>
            <div className={s.cardHead}>
              <h3>Compliance by Tanker Type</h3>
              <div className={s.meta}>
                {cluster ? `${cluster} only` : 'Fleet-wide · all clusters'}
              </div>
            </div>
            <div className={s.grid3} style={{ padding: '20px', gap: 16 }}>
              {displayTypes.map((t) => {
                const color =
                  t.key === 'DW'
                    ? '#2563EB'
                    : t.key === 'SW'
                      ? '#D97706'
                      : '#059669';
                const circ = 2 * Math.PI * 28;
                const dash = (t.pct / 100) * circ;
                const chipCls =
                  t.key === 'DW'
                    ? s.chipDW
                    : t.key === 'SW'
                      ? s.chipSW
                      : s.chipTE;
                const badgeCls = t.pct >= 80 ? s.badgeOnTrack : s.badgeAtRisk;
                return (
                  <div key={t.key} className={s.typeCard}>
                    <div className={s.typeCardHeader}>
                      <div className={s.typeCardHeaderLeft}>
                        <span className={`${s.chip} ${chipCls}`}>{t.key}</span>
                        <span style={{ fontWeight: 600, color: '#0B1220' }}>
                          {t.label}
                        </span>
                      </div>
                      <span className={`${s.badge} ${badgeCls}`}>
                        <span className={s.dot} />
                        {t.status}
                      </span>
                    </div>
                    <div className={s.typeCardBody}>
                      <div className={s.ring}>
                        <svg width={72} height={72}>
                          <circle
                            cx={36}
                            cy={36}
                            r={28}
                            fill="none"
                            stroke="#F3F4F6"
                            strokeWidth={8}
                          />
                          <circle
                            cx={36}
                            cy={36}
                            r={28}
                            fill="none"
                            stroke={color}
                            strokeWidth={8}
                            strokeLinecap="round"
                            strokeDasharray={`${dash} ${circ}`}
                          />
                        </svg>
                        <div className={s.ringVal}>{t.pct}%</div>
                      </div>
                      <div className={s.typeStats}>
                        <div className={s.typeStatLabel}>Target</div>
                        <div className={s.typeStatLabel}>Valid</div>
                        <div className={s.typeStatVal}>
                          {t.target.toLocaleString()}
                        </div>
                        <div className={s.typeStatVal}>
                          {t.active.toLocaleString()}
                        </div>
                        <div className={s.typeStatLabel}>Expired</div>
                        <div className={s.typeStatLabel}>No permit</div>
                        <div className={s.typeStatValRed}>{t.expired}</div>
                        <div className={s.typeStatValRed}>{t.noPermit}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Monthly Inspection Trend ─────────────────────────── */}
          <div className={`${s.card} ${s.mb}`}>
            <div className={s.cardHead}>
              <h3>Monthly Inspection Trend</h3>
              <div className={s.meta}>
                May 2025 – Apr 2026 · Approved · Rejected · Lab Pending
              </div>
            </div>
            <div className={s.chartWrap}>
              <svg
                width="100%"
                viewBox="0 0 800 220"
                style={{ display: 'block' }}
              >
                {gridLines}
                {INSP_TREND.map((row, i) => (
                  <text
                    key={row.m}
                    x={cx(i).toFixed(1)}
                    y={(padT + chartH + 16).toFixed(1)}
                    textAnchor="middle"
                    fontSize={10}
                    fill="#6b7280"
                  >
                    {row.m}
                  </text>
                ))}
                {chartPolyline('approved', '#059669', false)}
                {chartPolyline('rejected', '#DC2626', false)}
                {chartPolyline('labPending', '#D97706', true)}
              </svg>
              <div className={s.chartLegend}>
                <span className={s.legendItem}>
                  <svg width={24} height={3}>
                    <line
                      x1={0}
                      y1={1.5}
                      x2={24}
                      y2={1.5}
                      stroke="#059669"
                      strokeWidth={2}
                    />
                    <circle
                      cx={12}
                      cy={1.5}
                      r={3.5}
                      fill="#059669"
                      stroke="white"
                      strokeWidth={1.5}
                    />
                  </svg>
                  Approved
                </span>
                <span className={s.legendItem}>
                  <svg width={24} height={3}>
                    <line
                      x1={0}
                      y1={1.5}
                      x2={24}
                      y2={1.5}
                      stroke="#DC2626"
                      strokeWidth={2}
                    />
                    <circle
                      cx={12}
                      cy={1.5}
                      r={3.5}
                      fill="#DC2626"
                      stroke="white"
                      strokeWidth={1.5}
                    />
                  </svg>
                  Rejected
                </span>
                <span className={s.legendItem}>
                  <svg width={24} height={3}>
                    <line
                      x1={0}
                      y1={1.5}
                      x2={24}
                      y2={1.5}
                      stroke="#D97706"
                      strokeWidth={2}
                      strokeDasharray="5 3"
                    />
                    <circle
                      cx={12}
                      cy={1.5}
                      r={3.5}
                      fill="#D97706"
                      stroke="white"
                      strokeWidth={1.5}
                    />
                  </svg>
                  Lab Pending
                </span>
                <span className={s.legendSummary}>
                  Approved:{' '}
                  <strong style={{ color: '#059669' }}>
                    {inspTotal.approved.toLocaleString()}
                  </strong>
                  &nbsp;·&nbsp; Rejected:{' '}
                  <strong style={{ color: '#DC2626' }}>
                    {inspTotal.rejected.toLocaleString()}
                  </strong>
                  &nbsp;·&nbsp; Lab Pending:{' '}
                  <strong style={{ color: '#D97706' }}>
                    {inspTotal.labPending.toLocaleString()}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* ── Cluster & Contractor Breakdown ───────────────────── */}
          <div className={s.mb}>
            <div className={s.card}>
              <div className={s.cardHead}>
                <h3>Cluster &amp; Contractor Breakdown</h3>
                <div className={s.meta}>
                  {clusters.length} contractors · {OPERATIONAL.heat.length}{' '}
                  governorates
                </div>
              </div>
              <div className={s.tableWrap}>
                <table className={s.tbl}>
                  <thead>
                    <tr>
                      <th>Cluster / Contractor</th>
                      <th className={s.num}>Fleet</th>
                      <th className={s.num}>DW</th>
                      <th className={s.num}>SW</th>
                      <th className={s.num}>TE</th>
                      <th className={s.num}>Valid</th>
                      <th className={s.num}>Expired</th>
                      <th className={s.num}>≤30d</th>
                      <th className={s.num}>Pass</th>
                      <th className={s.num}>SLA</th>
                      <th className={s.num}>Lab</th>
                      <th>Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clusters
                      .filter((c) => !cluster || c.name.startsWith(cluster))
                      .map((c) => (
                        <tr key={c.name}>
                          <td>
                            <div className={s.strong}>
                              {c.name.split(' — ')[0]} · {c.contractor}
                            </div>
                            <div className={s.muted}>
                              {c.name.split(' — ')[1] || ''}
                            </div>
                          </td>
                          <td className={`${s.num} ${s.mono} ${s.strong}`}>
                            {c.fleet.toLocaleString()}
                          </td>
                          <td className={`${s.num} ${s.mono}`}>{c.dw}</td>
                          <td className={`${s.num} ${s.mono}`}>{c.sw}</td>
                          <td className={`${s.num} ${s.mono}`}>{c.te}</td>
                          <td className={`${s.num} ${s.mono}`}>
                            {c.active.toLocaleString()}
                          </td>
                          <td className={`${s.num} ${s.mono} ${s.numRed}`}>
                            {c.expired}
                          </td>
                          <td className={`${s.num} ${s.mono} ${s.numAmber}`}>
                            {c.exp30}
                          </td>
                          <td className={`${s.num} ${s.mono}`}>{c.pass}%</td>
                          <td className={`${s.num} ${s.mono}`}>{c.sla}%</td>
                          <td className={`${s.num} ${s.mono} ${s.numRed}`}>
                            {c.lab}
                          </td>
                          <td>
                            <RagPill v={c.comp} />
                          </td>
                        </tr>
                      ))}
                    {!cluster &&
                      (() => {
                        const tot = clusters.reduce(
                          (a, c) => ({
                            fleet: a.fleet + c.fleet,
                            dw: a.dw + c.dw,
                            sw: a.sw + c.sw,
                            te: a.te + c.te,
                            active: a.active + c.active,
                            expired: a.expired + c.expired,
                            exp30: a.exp30 + c.exp30,
                            lab: a.lab + c.lab,
                          }),
                          {
                            fleet: 0,
                            dw: 0,
                            sw: 0,
                            te: 0,
                            active: 0,
                            expired: 0,
                            exp30: 0,
                            lab: 0,
                          },
                        );
                        return (
                          <tr className={s.total}>
                            <td>Totals · 3 contractors</td>
                            <td className={`${s.num} ${s.mono}`}>
                              {tot.fleet.toLocaleString()}
                            </td>
                            <td className={`${s.num} ${s.mono}`}>
                              {tot.dw.toLocaleString()}
                            </td>
                            <td className={`${s.num} ${s.mono}`}>
                              {tot.sw.toLocaleString()}
                            </td>
                            <td className={`${s.num} ${s.mono}`}>
                              {tot.te.toLocaleString()}
                            </td>
                            <td className={`${s.num} ${s.mono}`}>
                              {tot.active.toLocaleString()}
                            </td>
                            <td className={`${s.num} ${s.mono}`}>
                              {tot.expired}
                            </td>
                            <td className={`${s.num} ${s.mono}`}>
                              {tot.exp30}
                            </td>
                            <td className={`${s.num} ${s.mono}`}>
                              {kpi.passRate}%
                            </td>
                            <td className={`${s.num} ${s.mono}`}>{kpi.sla}%</td>
                            <td className={`${s.num} ${s.mono}`}>{tot.lab}</td>
                            <td>
                              <RagPill v={kpi.compliance} />
                            </td>
                          </tr>
                        );
                      })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Compliance Heatmap ───────────────────────────────── */}
          <div className={`${s.card} ${s.mb}`}>
            <div className={s.cardHead}>
              <h3>Compliance Heatmap by Tanker Type &amp; Governorate</h3>
              <div className={s.meta}>% compliance · colour = RAG</div>
            </div>
            <div style={{ padding: '14px 16px 16px', overflowX: 'auto' }}>
              <Heatmap clusterFilter={cluster} />
              <div className={s.heatLegend}>
                <span className={s.heatLegendItem}>
                  <span
                    className={s.heatSwatch}
                    style={{ background: '#a7f3d0' }}
                  />
                  ≥ 80%
                </span>
                <span className={s.heatLegendItem}>
                  <span
                    className={s.heatSwatch}
                    style={{ background: '#fde68a' }}
                  />
                  70–79%
                </span>
                <span className={s.heatLegendItem}>
                  <span
                    className={s.heatSwatch}
                    style={{ background: '#fecaca' }}
                  />
                  &lt; 70%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
