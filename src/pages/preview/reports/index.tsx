// PREVIEW ONLY — static HTML-to-JSX translation of the Reports design mock.
// To remove: delete src/pages/preview/ and revert the route in App.tsx.

import { useState } from 'react';
import { AppShell } from '@/common-components/AppShell';
import { INVOICE, INVOICE_TOTALS, PAYMENT, PAYMENT_TOTALS } from './mockData';
import { usePreviewLoader } from '../usePreviewLoader';
import s from './preview.module.css';
import ls from '../loader.module.css';

// ── Helpers ────────────────────────────────────────────────────────────────

function TypeChip({ type }: { type: 'DW' | 'SW' | 'TE' }) {
  const cls = type === 'DW' ? s.chipDW : type === 'SW' ? s.chipSW : s.chipTE;
  return <span className={`${s.chip} ${cls}`}>{type}</span>;
}

// ── Invoice tab ────────────────────────────────────────────────────────────

function InvoiceTab() {
  return (
    <div className={s.card}>
      <div className={s.cardHead}>
        <h3>Invoice Report · April 2026</h3>
        <div className={s.cardActions}>
          <button className={s.btnSecondary}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Excel
          </button>
          <button className={s.btnGhostSm}>Export PDF</button>
        </div>
      </div>
      <table className={s.tbl}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Contractor (Cluster)</th>
            <th>Tanker Type</th>
            <th className={s.num}>Inspections Approved</th>
            <th className={s.num}>Samples Collected</th>
            <th className={s.num}>Permits Issued</th>
          </tr>
        </thead>
        <tbody>
          {INVOICE.map((r, i) => (
            <tr key={i}>
              <td className={s.muted}>{r.month}</td>
              <td>{r.contractor}</td>
              <td>
                <TypeChip type={r.type} />
              </td>
              <td className={s.num}>{r.approved}</td>
              <td className={s.num}>{r.samples}</td>
              <td className={`${s.num} ${s.strong}`}>{r.permits}</td>
            </tr>
          ))}
          <tr className={s.rowTotal}>
            <td colSpan={3}>Totals · April 2026</td>
            <td className={s.num}>{INVOICE_TOTALS.approved}</td>
            <td className={s.num}>{INVOICE_TOTALS.samples}</td>
            <td className={s.num}>{INVOICE_TOTALS.permits}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ── Payment tab ────────────────────────────────────────────────────────────

function PaymentTab() {
  return (
    <div className={s.card}>
      <div className={s.cardHead}>
        <h3>Payment Report · April 2026</h3>
        <div className={s.cardActions}>
          <button className={s.btnSecondary}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Excel
          </button>
          <button className={s.btnGhostSm}>Export PDF</button>
        </div>
      </div>
      <table className={s.tbl}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Inspector</th>
            <th>Contractor</th>
            <th className={s.num}>DW</th>
            <th className={s.num}>SW</th>
            <th className={s.num}>TE</th>
            <th className={s.num}>Total</th>
          </tr>
        </thead>
        <tbody>
          {PAYMENT.map((r, i) => (
            <tr key={i}>
              <td className={s.muted}>{r.month}</td>
              <td className={s.strong}>{r.inspector}</td>
              <td className={s.muted}>{r.cluster}</td>
              <td className={s.num}>{r.dw}</td>
              <td className={s.num}>{r.sw}</td>
              <td className={s.num}>{r.te}</td>
              <td className={`${s.num} ${s.strong}`}>{r.total}</td>
            </tr>
          ))}
          <tr className={s.rowTotal}>
            <td colSpan={3}>Totals · {PAYMENT.length} inspectors</td>
            <td className={s.num}>{PAYMENT_TOTALS.dw}</td>
            <td className={s.num}>{PAYMENT_TOTALS.sw}</td>
            <td className={s.num}>{PAYMENT_TOTALS.te}</td>
            <td className={s.num}>{PAYMENT_TOTALS.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function ReportsPreviewPage() {
  const [activeTab, setActiveTab] = useState<'invoice' | 'payment'>('invoice');
  const ready = usePreviewLoader();

  if (!ready) {
    return (
      <AppShell breadcrumbs={['Home', 'Reports']}>
        <div className={ls.skeleton}>
          <div className={ls.skHeader}>
            <div className={`${ls.pulse} ${ls.skTitle}`} />
            <div className={`${ls.pulse} ${ls.skSub}`} />
          </div>
          <div
            className={`${ls.pulse} ${ls.skCard}`}
            style={{ height: 36, width: 300 }}
          />
          <div className={`${ls.pulse} ${ls.skCard}`} style={{ height: 340 }} />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell breadcrumbs={['Home', 'Reports']}>
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
              <h1>Reports</h1>
              <div className={s.sub}>Financial reports · April 2026</div>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className={s.subtabs}>
            <button
              className={`${s.subtab}${activeTab === 'invoice' ? ` ${s.subtabActive}` : ''}`}
              onClick={() => setActiveTab('invoice')}
            >
              Invoice Report
            </button>
            <button
              className={`${s.subtab}${activeTab === 'payment' ? ` ${s.subtabActive}` : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              Payment Report
            </button>
          </div>

          {activeTab === 'invoice' ? <InvoiceTab /> : <PaymentTab />}
        </div>
      </div>
    </AppShell>
  );
}
