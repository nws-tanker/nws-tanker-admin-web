import type { SummaryResponse } from '@/types/executiveDashboard';

type Props = { fleetDetails: SummaryResponse['fleet_details'] };

export default function TotalFleetCard({ fleetDetails }: Props) {
  return (
    <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-br from-[#02474E] to-[#117680] px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
        Total Fleet
      </p>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-white">
          {fleetDetails.total_fleet.toLocaleString()}
        </span>
        <span className="text-sm text-white/75">units</span>
      </div>
      <p className="mt-1.5 text-xs text-white/70">
        DW {fleetDetails.dw.toLocaleString()} · SW{' '}
        {fleetDetails.sw.toLocaleString()} · TE{' '}
        {fleetDetails.te.toLocaleString()}
      </p>
    </div>
  );
}
