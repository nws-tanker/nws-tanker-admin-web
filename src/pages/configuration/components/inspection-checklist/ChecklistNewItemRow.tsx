import { useState } from 'react';
import { Button, Chip, Select, TextInput } from '@/atoms';
import type { SelectOption } from '@/atoms/option';
import type {
  ChecklistEvidenceType,
  ChecklistSeverity,
  NewChecklistItemData,
} from '@/types/configuration';
import { CommentChipsCell } from './CommentChipsCell';
import { TANKER_TYPES } from './constants';

const SEVERITY_OPTIONS: SelectOption<ChecklistSeverity>[] = [
  { value: 'mandatory', label: 'Mandatory' },
  { value: 'optional', label: 'Optional' },
];

const EVIDENCE_OPTIONS: SelectOption<ChecklistEvidenceType>[] = [
  { value: 'photo', label: 'Photo' },
  { value: 'document', label: 'Document' },
];

type Props = {
  itemNumber: string;
  onSave: (item: NewChecklistItemData) => void;
  onCancel: () => void;
};

export function ChecklistNewItemRow({ itemNumber, onSave, onCancel }: Props) {
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<ChecklistSeverity>('mandatory');
  const [evidenceType, setEvidenceType] =
    useState<ChecklistEvidenceType>('photo');
  const [appliesToDw, setAppliesToDw] = useState(true);
  const [appliesToSw, setAppliesToSw] = useState(true);
  const [appliesToTe, setAppliesToTe] = useState(true);
  const [isYesComment, setIsYesComment] = useState(false);
  const [isNoComment, setIsNoComment] = useState(false);
  const [touched, setTouched] = useState(false);

  function handleSave() {
    setTouched(true);
    if (!description.trim()) return;
    onSave({
      description: description.trim(),
      severity,
      evidenceType,
      appliesToDw,
      appliesToSw,
      appliesToTe,
      isYesComment,
      isNoComment,
    });
  }

  function toggleAppliesTo(code: 'DW' | 'SW' | 'TE') {
    if (code === 'DW') setAppliesToDw((v) => !v);
    else if (code === 'SW') setAppliesToSw((v) => !v);
    else setAppliesToTe((v) => !v);
  }

  function isActive(code: 'DW' | 'SW' | 'TE'): boolean {
    if (code === 'DW') return appliesToDw;
    if (code === 'SW') return appliesToSw;
    return appliesToTe;
  }

  function handleSeverityChange(v: string) {
    const next = (v || 'mandatory') as ChecklistSeverity;
    setSeverity(next);
    if (next === 'optional') {
      setIsYesComment(false);
      setIsNoComment(false);
    }
  }

  function toggleComment(code: 'Yes' | 'No') {
    if (code === 'Yes') setIsYesComment((v) => !v);
    else setIsNoComment((v) => !v);
  }

  return (
    <tr className="border-b border-teal-100 bg-teal-25/60 last:border-0">
      <td className="px-4 py-3 font-mono text-[12px] text-ink-400">
        {itemNumber}
      </td>
      <td className="px-4 py-3">
        <TextInput
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="New check item…"
          invalid={touched && !description.trim()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') onCancel();
          }}
          className="h-8 text-[13px] font-medium"
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {TANKER_TYPES.map(({ code, tone }) => {
            const active = isActive(code);
            return (
              <Chip
                key={code}
                tone={active ? tone : 'gray'}
                className={!active ? 'opacity-30 line-through' : undefined}
                onClick={() => toggleAppliesTo(code)}
              >
                {code}
              </Chip>
            );
          })}
        </div>
      </td>
      <td className="px-4 py-3">
        <Select
          options={SEVERITY_OPTIONS}
          value={severity}
          onChange={handleSeverityChange}
          size="sm"
        />
      </td>
      <td className="px-4 py-3">
        <CommentChipsCell
          value={{ yes: isYesComment, no: isNoComment }}
          disabled={severity === 'optional'}
          editable
          onToggle={toggleComment}
        />
      </td>
      <td className="px-4 py-3">
        <Select
          options={EVIDENCE_OPTIONS}
          value={evidenceType}
          onChange={(v) =>
            setEvidenceType((v || 'photo') as ChecklistEvidenceType)
          }
          size="sm"
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1.5">
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </td>
    </tr>
  );
}
