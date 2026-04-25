import { StatusIndicator } from '@/atoms';
import type { Permit } from '@/types';
import { cn } from '@/utils';
import { PermitOnRecord } from './PermitOnRecord';
import { PERMIT_CARD_STYLE } from './permitStyle';

type Props = {
  permit: Permit;
};

export function TankerPermitCard({ permit }: Props) {
  const card = PERMIT_CARD_STYLE[permit.status];

  return (
    <div className={cn('rounded-md border px-3.5 py-3', card.border, card.bg)}>
      <div className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-ink-500">
        Permit
      </div>
      {permit.permitNumber ? (
        <PermitOnRecord permit={permit} />
      ) : (
        <StatusIndicator
          tone="gray"
          label="No permit on record — inspection required before a permit can be issued"
        />
      )}
    </div>
  );
}
