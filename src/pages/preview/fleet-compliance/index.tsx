// PREVIEW ONLY — static HTML-to-JSX translation of the Fleet Compliance design mock.
// To remove: delete src/pages/preview/ and revert the route in App.tsx.

import { AppShell } from '@/common-components/AppShell';
import {
  kpi,
  types,
  OPERATIONAL,
  GOVS,
  INSPECTORS,
  COMPLIANCE_TREND,
} from './mockData';
import { usePreviewLoader } from '../usePreviewLoader';
import s from './preview.module.css';
import ls from '../loader.module.css';

function RagBadge({ pct }: { pct: number }) {
  const cls = pct >= 80 ? s.badgeGreen : pct >= 70 ? s.badgeAmber : s.badgeRed;
  return (
    <span className={`${s.badge} ${cls}`}>
      <span className={s.dot} />
      {pct}%
    </span>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  const barCls = pct >= 80 ? s.barGreen : pct >= 70 ? s.barAmber : s.barRed;
  return (
    <div className={`${s.bar} ${barCls}`}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

// Inline SVG trend line for the hero banner
function ComplianceTrendSvg() {
  const pts = COMPLIANCE_TREND;
  const w = 320,
    h = 100,
    pad = 10;
  const step = (w - pad * 2) / (pts.length - 1);
  const min = 65,
    max = 82;
  const y = (v: number) => pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
  const pointStr = pts.map((v, i) => `${pad + i * step},${y(v)}`).join(' ');
  const areaPath = `M${pad},${h - pad} L${pointStr.split(' ').join(' L')} L${w - pad},${h - pad} Z`;
  const targetY = y(80);

  return (
    <svg
      width={w}
      height={h + 20}
      viewBox={`0 0 ${w} ${h + 20}`}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="fcTrendG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1={pad}
        y1={targetY}
        x2={w - pad}
        y2={targetY}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <text
        x={w - pad}
        y={targetY - 6}
        textAnchor="end"
        fill="rgba(255,255,255,0.7)"
        fontSize="10"
        fontFamily="Inter"
      >
        Target 80%
      </text>
      <path d={areaPath} fill="url(#fcTrendG)" />
      <polyline
        points={pointStr}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {pts.map((v, i) => (
        <circle
          key={i}
          cx={pad + i * step}
          cy={y(v)}
          r={i === pts.length - 1 ? 4 : 0}
          fill="white"
          stroke="#02474E"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

// ── Compliance Overview tab ────────────────────────────────────────────────

function ComplianceOverviewTab() {
  const validPct = Math.round((kpi.activePermits / kpi.totalFleet) * 100);
  const expiredPct = ((kpi.expired / kpi.totalFleet) * 100).toFixed(1);
  const neverPct = ((kpi.neverInspected / kpi.totalFleet) * 100).toFixed(1);
  const gap = kpi.complianceTarget - kpi.compliance;

  return (
    <>
      {/* 5 KPI tiles */}
      <div className={`${s.grid5} ${s.mb}`}>
        <div className={s.kpi}>
          <div className={s.label}>Total Fleet</div>
          <div className={s.val}>
            <span className={s.valN}>{kpi.totalFleet.toLocaleString()}</span>
          </div>
          <div className={s.footnote}>11 governorates · 3 clusters</div>
        </div>
        <div className={s.kpi}>
          <div className={s.label}>Valid Permits</div>
          <div className={s.val}>
            <span className={s.valN} style={{ color: '#047857' }}>
              {kpi.activePermits.toLocaleString()}
            </span>
          </div>
          <div className={s.footnote}>{validPct}% of fleet</div>
        </div>
        <div className={`${s.kpi} ${s.kpiAlertRed}`}>
          <div className={s.label}>Expired Permits</div>
          <div className={s.val}>
            <span className={s.valN} style={{ color: '#DC2626' }}>
              {kpi.expired.toLocaleString()}
            </span>
          </div>
          <div className={s.footnote}>{expiredPct}% of fleet</div>
        </div>
        <div className={`${s.kpi} ${s.kpiAlertAmber}`}>
          <div className={s.label}>Never Inspected</div>
          <div className={s.val}>
            <span className={s.valN} style={{ color: '#B45309' }}>
              {kpi.neverInspected.toLocaleString()}
            </span>
          </div>
          <div className={s.footnote}>{neverPct}% of fleet</div>
        </div>
        <div className={`${s.kpi} ${s.kpiBlue}`}>
          <div className={s.label}>Inspection In Progress</div>
          <div className={s.val}>
            <span className={s.valN} style={{ color: '#2563EB' }}>
              {OPERATIONAL.lifecycle.inspectionInProgress.toLocaleString()}
            </span>
          </div>
          <div className={s.footnote}>
            Pipeline · not counted in compliance %
          </div>
        </div>
      </div>

      {/* Hero compliance banner */}
      <div className={`${s.heroBanner} ${s.mb}`}>
        <div
          style={{
            position: 'absolute',
            right: -60,
            top: -60,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />
        <div className={s.heroBannerInner}>
          <div className={s.heroLeft}>
            <div className={s.heroLabel}>Fleet-wide Compliance</div>
            <div className={s.heroPctRow}>
              <div className={s.heroPct}>{kpi.compliance}%</div>
              <span className={s.heroAtRisk}>
                <span className={s.dot} />
                At Risk
              </span>
              <span className={s.heroDelta}>
                ▲ +{kpi.complianceDelta} pts vs Q1
              </span>
            </div>
            <div className={s.heroSub}>
              Target ≥ {kpi.complianceTarget}% by end of Q4 2026. Current gap:{' '}
              <strong style={{ color: 'white' }}>
                {gap} percentage points
              </strong>
              , driven by expired permits in Cluster 3 (Dhofar + Sharqiyah).
            </div>
          </div>
          <div className={s.heroRight}>
            <ComplianceTrendSvg />
            <div className={s.heroChartLabels}>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
              <span>Jan</span>
              <span>Apr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance by Tanker Type */}
      <div className={`${s.card} ${s.mb}`}>
        <div className={s.cardHead}>
          <h3>Compliance by Tanker Type</h3>
          <div className={s.cardMeta}>Fleet-wide · all clusters</div>
        </div>
        <div className={s.grid3}>
          {types.map((t) => {
            const color =
              t.key === 'DW'
                ? '#2563EB'
                : t.key === 'SW'
                  ? '#D97706'
                  : '#059669';
            const barCls =
              t.sCls === 'green'
                ? s.barGreen
                : t.sCls === 'amber'
                  ? s.barAmber
                  : s.barRed;
            return (
              <div key={t.key} className={s.typeCard}>
                <div className={s.typeCardHead}>
                  <span
                    className={s.typeChipLabel}
                    style={{
                      background: `${color}15`,
                      color,
                      borderColor: `${color}30`,
                    }}
                  >
                    {t.key} · {t.label}
                  </span>
                  <span className={s.typeCardPct}>{t.pct}%</span>
                </div>
                <div className={`${s.bar} ${barCls}`}>
                  <span style={{ width: `${t.pct}%` }} />
                </div>
                <div className={s.typeCardStats}>
                  <div>
                    <span className={s.typeCardStatLabel}>Total </span>
                    <span className={s.typeCardStatVal}>
                      {t.target.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className={s.typeCardStatLabel}>Valid </span>
                    <span className={s.typeCardStatVal}>
                      {t.active.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className={s.typeCardStatLabel}>Expired </span>
                    <span className={s.typeCardStatValRed}>{t.expired}</span>
                  </div>
                  <div>
                    <span className={s.typeCardStatLabel}>N.I. </span>
                    <span className={s.typeCardStatValRed}>{t.noPermit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance by Governorate */}
      <div className={`${s.card} ${s.mb}`}>
        <div className={s.cardHead}>
          <h3>Compliance by Governorate</h3>
          <div className={s.cardMeta}>Click any row for drill-down</div>
        </div>
        <table className={s.tbl}>
          <thead>
            <tr>
              <th>Governorate</th>
              <th className={s.num}>Total Fleet</th>
              <th className={s.num}>Valid Permit</th>
              <th className={s.num}>Expired</th>
              <th className={s.num}>Never Inspected</th>
              <th style={{ width: 240 }}>Compliance Rate</th>
            </tr>
          </thead>
          <tbody>
            {GOVS.map((g) => (
              <tr key={g.name}>
                <td className={s.strong}>
                  {g.name}{' '}
                  <span
                    style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 400 }}
                  >
                    {g.cluster}
                  </span>
                </td>
                <td className={s.numMono}>{g.fleet}</td>
                <td className={s.numMono}>{g.active}</td>
                <td className={s.numRed}>{g.expired}</td>
                <td className={s.numRed}>{g.neverInspected}</td>
                <td>
                  <div className={s.compRate}>
                    <div className={s.compRateBar}>
                      <ProgressBar pct={g.comp} />
                    </div>
                    <span className={s.compRatePct}>{g.comp}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspector Performance */}
      <div className={s.card}>
        <div className={s.cardHead}>
          <h3>
            Inspector Performance ·{' '}
            <span style={{ fontWeight: 400 }}>April 2026</span>
          </h3>
          <div className={s.cardMeta}>6 inspectors</div>
        </div>
        <table className={s.tbl}>
          <thead>
            <tr>
              <th>Inspector</th>
              <th>Cluster</th>
              <th className={s.num}>Inspected</th>
              <th className={s.num}>Rejected</th>
              <th className={s.num}>Permits Issued</th>
              <th className={s.num}>Compliance Rate</th>
            </tr>
          </thead>
          <tbody>
            {INSPECTORS.map((ins) => (
              <tr key={ins.name}>
                <td className={s.strong}>{ins.name}</td>
                <td className={s.muted}>{ins.cluster}</td>
                <td className={s.numMono}>{ins.inspected}</td>
                <td className={s.numRed}>{ins.rejected}</td>
                <td className={s.numMono}>{ins.permits}</td>
                <td className={s.num}>
                  <RagBadge pct={ins.compRate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function FleetCompliancePreviewPage() {
  const ready = usePreviewLoader();

  if (!ready) {
    return (
      <AppShell breadcrumbs={['Home', 'Fleet Compliance']}>
        <div className={ls.skeleton}>
          <div className={ls.skHeader}>
            <div className={`${ls.pulse} ${ls.skTitle}`} />
            <div className={`${ls.pulse} ${ls.skSub}`} />
          </div>
          <div
            className={ls.skTiles}
            style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`${ls.pulse} ${ls.skTile}`} />
            ))}
          </div>
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 160 }} />
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 200 }} />
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 220 }} />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell breadcrumbs={['Home', 'Fleet Compliance']}>
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
              <h1>Fleet Compliance</h1>
              <div className={s.sub}>
                Detailed analytics · refreshed 5 min ago
              </div>
            </div>
          </div>

          <ComplianceOverviewTab />
        </div>
      </div>
    </AppShell>
  );
}
