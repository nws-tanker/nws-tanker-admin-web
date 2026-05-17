// PREVIEW ONLY — static HTML-to-JSX translation of the Operations design mock.
// To remove: delete src/pages/preview/ and revert the route in App.tsx.

import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/common-components/AppShell';
import { usePreviewLoader } from '../usePreviewLoader';
import ls from '../loader.module.css';
import { ROUTES } from '@/constants/routes';
import { kpi, INSPECTIONS, RENEWALS } from './mockData';
import s from './preview.module.css';

// ── Helpers ────────────────────────────────────────────────────────────────

function TypeChip({ type }: { type: string }) {
  const cls = type === 'DW' ? s.chipDW : type === 'SW' ? s.chipSW : s.chipTE;
  return <span className={`${s.chip} ${cls}`}>{type}</span>;
}

function StatusBadge({ status, sCls }: { status: string; sCls: string }) {
  const cls =
    sCls === 'green'
      ? s.badgeGreen
      : sCls === 'red'
        ? s.badgeRed
        : sCls === 'blue'
          ? s.badgeBlue
          : sCls === 'purple'
            ? s.badgePurple
            : sCls === 'amber'
              ? s.badgeAmber
              : s.badgeGray;
  return (
    <span className={`${s.badge} ${cls}`}>
      <span className={s.dot} />
      {status}
    </span>
  );
}

function DaysBadge({ days }: { days: number }) {
  const cls = days <= 7 ? s.badgeRed : days <= 14 ? s.badgeAmber : s.badgeGray;
  return (
    <span className={`${s.badge} ${cls}`}>
      <span className={s.dot} />
      {days} days
    </span>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function OperationsPreviewPage() {
  const navigate = useNavigate();
  const ready = usePreviewLoader();

  const validPct = Math.round((kpi.activePermits / kpi.totalFleet) * 100);

  if (!ready) {
    return (
      <AppShell breadcrumbs={['Home', 'Operations']}>
        <div className={ls.skeleton}>
          <div className={ls.skHeader}>
            <div className={`${ls.pulse} ${ls.skTitle}`} />
            <div className={`${ls.pulse} ${ls.skSub}`} />
          </div>
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 100 }} />
          <div
            className={ls.skTiles}
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`${ls.pulse} ${ls.skTile}`} />
            ))}
          </div>
          <div
            className={ls.skTiles}
            style={{ gridTemplateColumns: '1fr 1fr' }}
          >
            <div
              className={`${ls.pulse} ${ls.skCard}`}
              style={{ height: 280 }}
            />
            <div
              className={`${ls.pulse} ${ls.skCard}`}
              style={{ height: 280 }}
            />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell breadcrumbs={['Home', 'Operations']}>
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
              <h1>Operations Dashboard</h1>
              <div className={s.sub}>
                Today · 20 April 2026 ·{' '}
                <span style={{ color: '#117680', fontWeight: 500 }}>
                  7 inspections submitted
                </span>
              </div>
            </div>
          </div>

          {/* ── Fleet banner ──────────────────────────────────── */}
          <div className={s.fleetBanner}>
            {/* decorative circles */}
            <div
              style={{
                position: 'absolute',
                right: -40,
                top: -40,
                width: 240,
                height: 240,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 40,
                bottom: -60,
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)',
              }}
            />

            <div className={s.fleetBannerInner}>
              <div className={s.fleetBannerLeft}>
                <div className={s.fleetBannerStat}>
                  <div className={s.statLabel}>Total Fleet</div>
                  <div className={s.statBig}>
                    {kpi.totalFleet.toLocaleString()}{' '}
                    <span className={s.statBigUnit}>tankers</span>
                  </div>
                </div>
                <div className={s.fleetBannerDivider} />
                <div className={s.fleetBannerTypes}>
                  <div className={s.fleetBannerStat}>
                    <div className={s.statLabel}>Drinking Water</div>
                    <div className={s.statMid}>{kpi.dw.toLocaleString()}</div>
                  </div>
                  <div className={s.fleetBannerStat}>
                    <div className={s.statLabel}>Sewage Water</div>
                    <div className={s.statMid}>{kpi.sw.toLocaleString()}</div>
                  </div>
                  <div className={s.fleetBannerStat}>
                    <div className={s.statLabel}>Treated Effluent</div>
                    <div className={s.statMid}>{kpi.te.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div className={s.fleetBannerRight}>
                <div>
                  <div className={s.statLabel}>Pass Rate</div>
                  <div className={s.statVal} style={{ color: '#6EE7B7' }}>
                    {kpi.passRate}%
                  </div>
                </div>
                <div>
                  <div className={s.statLabel}>Lab SLA</div>
                  <div className={s.statVal} style={{ color: '#FBBF24' }}>
                    {kpi.sla}%
                  </div>
                </div>
                <div>
                  <div className={s.statLabel}>Lab Overdue</div>
                  <div className={s.statVal} style={{ color: '#F87171' }}>
                    {kpi.labOverdue}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4 action KPI tiles ────────────────────────────── */}
          <div className={`${s.grid4} ${s.mb}`}>
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
              <div className={s.footnote}>Needs immediate action</div>
            </div>

            <div className={s.kpi}>
              <div className={s.label}>Pending Review</div>
              <div className={s.val}>
                <span className={s.valN}>{kpi.pendingReview}</span>
              </div>
              <div className={s.footnote}>Your approval queue</div>
            </div>

            <div
              className={`${s.kpi} ${s.kpiAlertAmber}`}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(ROUTES.permitRenewal)}
              title="Go to Permit Renewal"
            >
              <div className={s.label}>Expiring ≤ 30 days</div>
              <div className={s.val}>
                <span className={s.valN} style={{ color: '#B45309' }}>
                  {kpi.expiringSoon.toLocaleString()}
                </span>
              </div>
              <div className={s.footnote}>Plan renewals →</div>
            </div>
          </div>

          {/* ── Two worklist tables ────────────────────────────── */}
          <div className={s.grid2}>
            {/* Inspection Pipeline */}
            <div className={s.card}>
              <div className={s.cardHead}>
                <h3>Inspection Pipeline</h3>
                <div className={s.cardHeadRight}>
                  <span className={`${s.badge} ${s.badgeGray}`}>Today</span>
                  <a
                    className={s.viewAll}
                    onClick={() => navigate(ROUTES.inspectionReview)}
                  >
                    View all →
                  </a>
                </div>
              </div>
              <table className={s.tbl}>
                <thead>
                  <tr>
                    <th>Plate</th>
                    <th>Inspector</th>
                    <th>Type</th>
                    <th>Governorate</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {INSPECTIONS.map((row) => (
                    <tr key={row.plate}>
                      <td className={s.plate}>{row.plate}</td>
                      <td>{row.inspector}</td>
                      <td>
                        <TypeChip type={row.type} />
                      </td>
                      <td className={s.muted}>{row.gov}</td>
                      <td className={s.muted}>{row.date}</td>
                      <td>
                        <StatusBadge status={row.status} sCls={row.sCls} />
                      </td>
                      <td>
                        <button
                          className={s.btnGhost}
                          onClick={() => navigate(ROUTES.inspectionReview)}
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Permit Renewal Queue */}
            <div className={s.card}>
              <div className={s.cardHead}>
                <h3>Permit Renewal Queue</h3>
                <div className={s.cardHeadRight}>
                  <span className={`${s.badge} ${s.badgeRed}`}>12 urgent</span>
                  <a
                    className={s.viewAll}
                    onClick={() => navigate(ROUTES.permitRenewal)}
                  >
                    View all →
                  </a>
                </div>
              </div>
              <table className={s.tbl}>
                <thead>
                  <tr>
                    <th>Plate</th>
                    <th>Owner</th>
                    <th>Type</th>
                    <th>Expires</th>
                    <th>Days left</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {RENEWALS.map((row) => (
                    <tr key={row.plate}>
                      <td className={s.plate}>{row.plate}</td>
                      <td>{row.owner}</td>
                      <td>
                        <TypeChip type={row.type} />
                      </td>
                      <td className={s.mono}>{row.exp}</td>
                      <td>
                        <DaysBadge days={row.days} />
                      </td>
                      <td>
                        <button
                          className={s.btnGhost}
                          onClick={() => navigate(ROUTES.permitRenewal)}
                        >
                          Renew
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
