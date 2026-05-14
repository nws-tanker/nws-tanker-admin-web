import { Button } from '@/atoms';

export function PendingInspectionSidebar() {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
        <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
          <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
            INSPECTION INFO
          </span>
        </div>
        <div className="p-3.5 flex flex-col gap-2.5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400 mb-0.5">
              Inspector
            </p>
            <p className="text-[12px] text-ink-700">Ahmed Al-Rashidi</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400 mb-0.5">
              Type
            </p>
            <p className="text-[12px] text-ink-700">Annual</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400 mb-0.5">
              Scheduled Date
            </p>
            <p className="text-[12px] text-ink-700">Not scheduled</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400 mb-0.5">
              Cluster
            </p>
            <p className="text-[12px] text-ink-700">Cluster 1</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400 mb-0.5">
              Governorate
            </p>
            <p className="text-[12px] text-ink-700">Muscat</p>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
        <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
          <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
            ACTIONS
          </span>
        </div>
        <div className="p-3.5 flex flex-col gap-2">
          <Button variant="secondary" className="w-full justify-center">
            Cancel Inspection
          </Button>
          <Button variant="secondary" className="w-full justify-center">
            Reassign Inspector
          </Button>
        </div>
      </div>
    </div>
  );
}
