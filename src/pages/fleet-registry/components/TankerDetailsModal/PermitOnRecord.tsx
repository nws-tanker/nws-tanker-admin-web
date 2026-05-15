import { StatusIndicator, statusToneTextClass } from '@/atoms';
import { PERMIT_LABELS } from '@/constants/fleet';
import { PERMIT_STATUS } from '@/types';
import type { Permit } from '@/types';
import { formatDate } from '@/utils';
import { PermitField } from './PermitField';
import { PERMIT_TONE } from './permitStyle';

type Props = {
  permit: Permit;
};

export function PermitOnRecord({ permit }: Props) {
  const tone = PERMIT_TONE[permit.status];
  const expiryClass = statusToneTextClass(tone);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <PermitField label="Permit No." value={permit.permitNumber!} mono />
        <PermitField label="Issued" value={formatDate(permit.issuedAt)} />
        <PermitField
          label="Expiry"
          value={formatDate(permit.validUntil)}
          valueClassName={`font-bold ${expiryClass}`}
        />
      </div>
      <StatusIndicator
        className="mt-2"
        tone={tone}
        label={PERMIT_LABELS[permit.status]}
        suffix={
          permit.status === PERMIT_STATUS.EXPIRED ? (
            <span className="text-[11px] text-red-600">— renewal required</span>
          ) : null
        }
      />
    </>
  );
}
