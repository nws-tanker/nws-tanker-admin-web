import { Chip } from '@/atoms';
import type {
  ChecklistEvidenceType,
  ChecklistSeverity,
} from '@/types/configuration';
import { CommentChipsCell } from './CommentChipsCell';
import { TANKER_TYPES } from './constants';

export type CommittedNewItem = {
  localId: string;
  displayIndex: string;
  description: string;
  severity: ChecklistSeverity;
  evidenceType: ChecklistEvidenceType;
  appliesToDw: boolean;
  appliesToSw: boolean;
  appliesToTe: boolean;
  isYesComment: boolean;
  isNoComment: boolean;
};

function getAppliesTo(
  item: CommittedNewItem,
  code: 'DW' | 'SW' | 'TE',
): boolean {
  if (code === 'DW') return item.appliesToDw;
  if (code === 'SW') return item.appliesToSw;
  return item.appliesToTe;
}

type Props = { item: CommittedNewItem };

export default function CommittedItemRow({ item }: Props) {
  return (
    <tr className="border-b border-teal-100 bg-teal-25/40 last:border-0 hover:bg-teal-50/30 transition-colors">
      <td className="px-4 py-3 font-mono text-[12px] text-ink-400">
        {item.displayIndex}
      </td>
      <td className="px-4 py-3 font-medium text-ink-800">{item.description}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {TANKER_TYPES.map(({ code, tone }) => {
            const active = getAppliesTo(item, code);
            return (
              <Chip
                key={code}
                tone={active ? tone : 'gray'}
                className={!active ? 'opacity-30 line-through' : undefined}
              >
                {code}
              </Chip>
            );
          })}
        </div>
      </td>
      <td className="px-4 py-3 capitalize text-ink-800">{item.severity}</td>
      <td className="px-4 py-3">
        <CommentChipsCell
          value={{ yes: item.isYesComment, no: item.isNoComment }}
          disabled={false}
        />
      </td>
      <td className="px-4 py-3 capitalize text-ink-800">{item.evidenceType}</td>
      <td className="px-4 py-3">
        <span className="rounded-full bg-teal-100 px-2.5 py-1 text-[11px] font-medium text-teal-800">
          New
        </span>
      </td>
    </tr>
  );
}
