import type { ComplianceByType } from '@/types/dashboard';
import { TankerTypeComplianceCard } from './TankerTypeComplianceCard';

type Props = {
  items: ComplianceByType[] | null;
};

export function ComplianceByTankerType({ items }: Props) {
  if (!items?.length) {
    return (
      <section className="mb-6 grid grid-cols-3 gap-3.5">
        {['DW', 'SW', 'TE'].map((t) => (
          <article
            key={t}
            className="h-[180px] animate-pulse rounded-card-lg border border-ink-200 bg-ink-100"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="mb-3 text-[15px] font-semibold text-ink-900">
        Compliance by Tanker Type
      </h2>
      <div className="grid grid-cols-3 gap-3.5">
        {items.map((item) => (
          <TankerTypeComplianceCard key={item.type} data={item} />
        ))}
      </div>
    </section>
  );
}
