import { useEffect, useState } from 'react';
import { Button, Chip, Select } from '@/atoms';
import type { ChecklistItemResponse } from '@/types/configuration';

const TANKER_TYPES = [
  { code: 'DW' as const, tone: 'blue' as const },
  { code: 'SW' as const, tone: 'amber' as const },
  { code: 'TE' as const, tone: 'green' as const },
];

const REQUIRED_TYPES: { value: string; label: string }[] = [
  { value: 'mandatory', label: 'Mandatory' },
  { value: 'optional', label: 'Optional' },
];
const EVIDENCE_TYPES: { value: string; label: string }[] = [
  { value: 'photo', label: 'Photo' },
  { value: 'document', label: 'Document' },
];

type AppliesTo = { dw: boolean; sw: boolean; te: boolean };

type Props = {
  item: ChecklistItemResponse;
  itemNumber: string;
  onSave: (
    severity: string,
    evidenceType: string,
    appliesTo: AppliesTo,
  ) => void;
};

const APPLIES_KEY: Record<'DW' | 'SW' | 'TE', keyof AppliesTo> = {
  DW: 'dw',
  SW: 'sw',
  TE: 'te',
};

function isApplied(applies: AppliesTo, code: 'DW' | 'SW' | 'TE'): boolean {
  return applies[APPLIES_KEY[code]];
}

export function ChecklistItemRow({ item, itemNumber, onSave }: Props) {
  const [editable, setEditable] = useState(false);
  const [localSeverity, setLocalSeverity] = useState(item.severity);
  const [localEvidenceType, setLocalEvidenceType] = useState(item.evidenceType);
  const [localApplies, setLocalApplies] = useState<AppliesTo>({
    dw: item.appliesToDw,
    sw: item.appliesToSw,
    te: item.appliesToTe,
  });

  useEffect(() => {
    setLocalSeverity(item.severity);
    setLocalEvidenceType(item.evidenceType);
    setLocalApplies({
      dw: item.appliesToDw,
      sw: item.appliesToSw,
      te: item.appliesToTe,
    });
    setEditable(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  function toggleApplies(code: 'DW' | 'SW' | 'TE') {
    const key = APPLIES_KEY[code];
    const next = { ...localApplies, [key]: !localApplies[key] };
    setLocalApplies(next);
    onSave(localSeverity, localEvidenceType, next);
  }

  function handleSeverityChange(value: string) {
    setLocalSeverity(value as typeof localSeverity);
    onSave(value, localEvidenceType, localApplies);
  }

  function handleEvidenceChange(value: string) {
    setLocalEvidenceType(value as typeof localEvidenceType);
    onSave(localSeverity, value, localApplies);
  }

  function handleDone() {
    onSave(localSeverity, localEvidenceType, localApplies);
    setEditable(false);
  }

  return (
    <tr className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50 transition-colors">
      <td className="h-[56px] px-4 py-3 font-mono text-[12px] text-ink-400">
        {itemNumber}
      </td>
      <td className="h-[56px] px-4 py-3 font-medium text-ink-800">
        {item.checkItem}
      </td>
      <td className="h-[56px] px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {TANKER_TYPES.map((type) => {
            const active = isApplied(localApplies, type.code);
            return (
              <Chip
                key={type.code}
                tone={active ? type.tone : 'gray'}
                className={!active ? 'opacity-30 line-through' : undefined}
                onClick={editable ? () => toggleApplies(type.code) : undefined}
              >
                {type.code}
                {editable && active && (
                  <span aria-hidden className="ml-0.5 text-[10px] opacity-70">
                    &times;
                  </span>
                )}
              </Chip>
            );
          })}
        </div>
      </td>
      <td className="h-[56px] px-4 py-3 text-ink-800">
        {editable ? (
          <Select
            options={REQUIRED_TYPES}
            value={localSeverity}
            onChange={(v) => handleSeverityChange(v)}
            size="sm"
          />
        ) : (
          <span className="capitalize">{localSeverity}</span>
        )}
      </td>
      <td className="h-[56px] px-4 py-3 text-ink-800">
        {editable ? (
          <Select
            options={EVIDENCE_TYPES}
            value={localEvidenceType}
            onChange={(v) => handleEvidenceChange(v)}
            size="sm"
            disabled
          />
        ) : (
          <span className="capitalize">{localEvidenceType}</span>
        )}
      </td>
      <td className="h-[56px] px-4 py-3">
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
