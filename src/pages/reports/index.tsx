import { useMemo, useState } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { States } from '@/store/types';
import { InvoiceReportCard } from './components/InvoiceReportCard';
import { PaymentReportCard } from './components/PaymentReportCard';
import { ReportsTabs, type ReportTabKey } from './components/ReportsTabs';
import { useInvoiceReport } from './hooks/useInvoiceReport';
import { usePaymentReport } from './hooks/usePaymentReport';

function isLoading(state: States): boolean {
  return state === States.LOADING || state === States.PRELOADING;
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTabKey>('invoice');

  const invoice = useInvoiceReport();
  const payment = usePaymentReport();

  const currentPeriod = useMemo(
    () =>
      new Date().toLocaleString(undefined, {
        month: 'long',
        year: 'numeric',
      }),
    [],
  );

  const invoicePeriod = useMemo(
    () => invoice.data?.rows[0]?.month ?? '',
    [invoice.data],
  );
  const paymentPeriod = useMemo(
    () => payment.data?.rows[0]?.month ?? '',
    [payment.data],
  );

  return (
    <AppShell breadcrumbs={['Home', 'Reports']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <PageHeader
          title="Reports"
          subtitle={`Financial reports · ${currentPeriod}`}
        />

        <div className="mt-4">
          <ReportsTabs active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="mt-5">
          {activeTab === 'invoice' ? (
            invoice.state === States.ERROR ? (
              <ScreenStatus state={invoice.state} onRetry={invoice.retry} />
            ) : isLoading(invoice.state) || !invoice.data ? (
              <ScreenStatus state={States.LOADING} />
            ) : (
              <InvoiceReportCard
                report={invoice.data}
                periodLabel={invoicePeriod}
              />
            )
          ) : payment.state === States.ERROR ? (
            <ScreenStatus state={payment.state} onRetry={payment.retry} />
          ) : isLoading(payment.state) || !payment.data ? (
            <ScreenStatus state={States.LOADING} />
          ) : (
            <PaymentReportCard
              report={payment.data}
              periodLabel={paymentPeriod}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
