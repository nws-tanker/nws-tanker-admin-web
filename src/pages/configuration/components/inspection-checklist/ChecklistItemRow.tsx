import { useState } from 'react';
import { Button, Chip } from '@/atoms';
import type { ChecklistItemResponse } from '@/types/configuration';

const TANKER_TYPES = [
  { code: 'DW' as const, tone: 'blue' as const },
  { code: 'SW' as const, tone: 'amber' as const },
  { code: 'TE' as const, tone: 'green' as const },
];

const REQUIRED_TYPES = ['mandatory', 'optional'];
const EVIDENCE_TYPES = ['photo', 'document'];

type Props = {
  item: ChecklistItemResponse;
  itemNumber: string;
  onSave: (severity: string, evidenceType: string) => void;
};

function isApplied(
  item: ChecklistItemResponse,
  code: 'DW' | 'SW' | 'TE',
): boolean {
  if (code === 'DW') return item.appliesToDw;
  if (code === 'SW') return item.appliesToSw;
  return item.appliesToTe;
}

export function ChecklistItemRow({ item, itemNumber, onSave }: Props) {
  const [editable, setEditable] = useState(false);
  const [localSeverity, setLocalSeverity] = useState(item.severity);
  const [localEvidenceType, setLocalEvidenceType] = useState(item.evidenceType);

  function handleDone() {
    onSave(localSeverity, localEvidenceType);
    setEditable(false);
  }

  return (
    <tr className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50 transition-colors">
      <td className="px-4 py-3 font-mono text-[12px] text-ink-400">
        {itemNumber}
      </td>
      <td className="px-4 py-3 font-medium text-ink-800">{item.checkItem}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {TANKER_TYPES.map((type) => {
            const active = isApplied(item, type.code);
            return (
              <Chip
                key={type.code}
                tone={active ? type.tone : 'gray'}
                className={!active ? 'opacity-30 line-through' : undefined}
              >
                {type.code}
              </Chip>
            );
          })}
        </div>
      </td>
      <td className="px-4 py-3 text-ink-800">
        {editable ? (
          <select
            value={localSeverity}
            onChange={(e) =>
              setLocalSeverity(e.target.value as typeof localSeverity)
            }
            className="h-7 rounded border border-ink-300 px-2 text-[13px] capitalize text-ink-800 outline-none focus:border-teal-600"
          >
            {REQUIRED_TYPES.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        ) : (
          <span className="capitalize">{localSeverity}</span>
        )}
      </td>
      <td className="px-4 py-3 text-ink-800">
        {editable ? (
          <select
            value={localEvidenceType}
            onChange={(e) =>
              setLocalEvidenceType(e.target.value as typeof localEvidenceType)
            }
            className="h-7 rounded border border-ink-300 px-2 text-[13px] capitalize text-ink-800 outline-none focus:border-teal-600"
          >
            {EVIDENCE_TYPES.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        ) : (
          <span className="capitalize">{localEvidenceType}</span>
        )}
      </td>
      <td className="px-4 py-3">
        {editable ? (
          <Button variant="primary" size="sm" onClick={handleDone}>
            Done
          </Button>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setEditable(true)}>
            Edit
          </Button>
        )}
      </td>
    </tr>
  );
}
