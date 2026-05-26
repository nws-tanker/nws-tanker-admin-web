import type { UploadError } from '@/types';

type Props = {
  error: UploadError;
};

export function ErrorRow({ error }: Props) {
  return (
    <tr className="hover:bg-ink-50">
      <td className="border-b border-ink-100 px-4 py-3 font-mono text-[12px] text-ink-500">
        {error.rowNumber ?? '—'}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[13px] text-red-700">
        {error.message}
      </td>
    </tr>
  );
}
