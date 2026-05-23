import { useState } from 'react';
import { Button, Checkbox, Chip } from '@/atoms';
import { FileTextIcon } from '@/atoms/icons';
import type { ApprovedInspection } from '@/types/permitRegeneration';
import {
  TANKER_TYPE_LABEL,
  TANKER_TYPE_TONE,
  expiryColorClass,
  formatExpiryDate,
} from '../permitRegenerationHelpers';
import { PermitPdfModal } from './PermitPdfModal';

type Props = {
  row: ApprovedInspection;
  selected: boolean;
  onToggle: (id: number) => void;
};

export function PermitRegenerationRow({ row, selected, onToggle }: Props) {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <tr className="border-b border-ink-100 last:border-b-0 hover:bg-ink-25">
      <td className="px-4 py-3">
        <Checkbox
          checked={selected}
          onChange={() => onToggle(row.inspection_id)}
          aria-label={`Select ${row.plate_number}`}
        />
      </td>
      <td className="px-4 py-3 font-mono text-[13px] font-medium text-ink-900">
        {row.plate_number}
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-800">{row.owner}</td>
      <td className="px-4 py-3">
        <Chip tone={TANKER_TYPE_TONE[row.tanker_type]}>
          {TANKER_TYPE_LABEL[row.tanker_type]}
        </Chip>
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-700">{row.cluster}</td>
      <td className="px-4 py-3 text-[13px] text-ink-700">{row.governorate}</td>
      <td className="px-4 py-3 font-mono text-[12px] text-ink-700">
        {row.permit_number}
      </td>
      <td className="px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<FileTextIcon className="h-3.5 w-3.5" />}
          onClick={() => setPdfOpen(true)}
          className="!px-0 !text-teal-700 hover:!bg-transparent hover:!text-teal-800 hover:underline"
        >
          View PDF
        </Button>
        <PermitPdfModal
          open={pdfOpen}
          onClose={() => setPdfOpen(false)}
          url={row.current_permit_url}
          plateNumber={row.plate_number}
          permitNumber={row.permit_number}
        />
      </td>
      <td
        className={`px-4 py-3 text-[13px] font-medium ${expiryColorClass(row.expiry_status)}`}
      >
        {formatExpiryDate(row.expiry_date)}
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-700">
        {row.last_inspector}
      </td>
    </tr>
  );
}
