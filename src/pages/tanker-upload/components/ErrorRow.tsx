import { Button } from '@/atoms';
import type { UploadError } from '@/types';

type Props = {
  error: UploadError;
  onSkip: () => void;
};

export function ErrorRow({ error, onSkip }: Props) {
  return (
    <tr className="hover:bg-ink-50">
      <td className="border-b border-ink-100 px-4 py-3 font-mono text-[12px] text-ink-500">
        {error.rowNumber}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 font-mono text-[12.5px] font-semibold text-ink-900">
        {error.cardNumber}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[12px] font-semibold text-ink-700">
        {error.field}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[13px] text-red-700">
        {error.reason}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-right">
        <Button variant="ghost" size="sm" onClick={onSkip}>
          Skip Row
        </Button>
      </td>
    </tr>
  );
}
