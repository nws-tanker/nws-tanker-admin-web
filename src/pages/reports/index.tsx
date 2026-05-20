import { useState } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { States } from '@/store/types';
import { InvoiceReportCard } from './components/InvoiceReportCard';
import { PaymentReportCard } from './components/PaymentReportCard';
import { ReportCardSkeleton } from './components/ReportCardSkeleton';
import { ReportsTabs, type ReportTabKey } from './components/ReportsTabs';
import { useInvoiceReport } from './hooks/useInvoiceReport';
import { usePaymentReport } from './hooks/usePaymentReport';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTabKey>('invoice');

  const invoice = useInvoiceReport();
  const payment = usePaymentReport();

  const currentPeriod = new Date().toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  const invoicePeriod = invoice.data?.rows[0]?.month ?? '';
  const paymentPeriod = payment.data?.rows[0]?.month ?? '';

  const renderInvoice = () => {
    if (invoice.state === States.ERROR) {
      return <ScreenStatus state={invoice.state} onRetry={invoice.retry} />;
    }
    if (!invoice.data) {
      return <ReportCardSkeleton />;
    }
    return (
      <InvoiceReportCard report={invoice.data} periodLabel={invoicePeriod} />
    );
  };

  const renderPayment = () => {
    if (payment.state === States.ERROR) {
      return <ScreenStatus state={payment.state} onRetry={payment.retry} />;
    }
    if (!payment.data) {
      return <ReportCardSkeleton />;
    }
    return (
      <PaymentReportCard report={payment.data} periodLabel={paymentPeriod} />
    );
  };

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
          {activeTab === 'invoice' ? renderInvoice() : renderPayment()}
        </div>
      </div>
    </AppShell>
  );
}
