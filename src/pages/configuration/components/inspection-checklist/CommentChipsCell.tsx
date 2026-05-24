import { Chip } from '@/atoms';
import type { CommentAppliesTo } from '@/types/configuration';
import { COMMENT_TYPES } from './constants';

type Props = {
  value: CommentAppliesTo;
  disabled: boolean;
  editable?: boolean;
  onToggle?: (code: 'Yes' | 'No') => void;
};

export function CommentChipsCell({
  value,
  disabled,
  editable,
  onToggle,
}: Props) {
  return (
    <div
      className={`flex flex-wrap gap-1.5 ${disabled ? 'pointer-events-none' : ''}`}
    >
      {COMMENT_TYPES.map((type) => {
        const active =
          !disabled && (type.code === 'Yes' ? value.yes : value.no);
        return (
          <Chip
            key={type.code}
            tone={active ? type.tone : 'gray'}
            className={!active ? 'opacity-50 line-through' : undefined}
            onClick={
              editable && onToggle ? () => onToggle(type.code) : undefined
            }
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
  );
}
