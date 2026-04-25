import { Badge } from '@/atoms';
import type { TankerUploadColumn } from '@/types';

type Props = {
  column: TankerUploadColumn;
};

export function ColumnSpecRow({ column }: Props) {
  return (
    <tr className="hover:bg-ink-50">
      <td className="border-b border-ink-100 px-4 py-3 font-mono text-[13px] font-semibold text-ink-800">
        {column.name}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-center">
        {column.required ? (
          <Badge tone="red">Required</Badge>
        ) : (
          <Badge tone="gray">Optional</Badge>
        )}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[13px] text-ink-600">
        {column.description}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 font-mono text-[12px] text-teal-900">
        {column.example}
      </td>
    </tr>
  );
}
