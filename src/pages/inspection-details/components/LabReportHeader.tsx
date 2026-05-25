import type { ReactNode } from 'react';

type Props = {
  status: ReactNode;
  workOrderRef?: string;
};

export function LabReportHeader({ status, workOrderRef }: Props) {
  return (
    <div className="flex items-center justify-between gap-2.5 border-b border-ink-100 px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <span className="text-[14px] font-semibold text-ink-800">
          Lab Test Report
        </span>
        {status}
      </div>
      {workOrderRef && (
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink-500">
          Work Order Ref:
          <span className="font-mono font-semibold text-ink-700">
            {workOrderRef}
          </span>
        </span>
      )}
    </div>
  );
}
