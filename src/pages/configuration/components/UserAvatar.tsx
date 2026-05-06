import { avatarColor, getInitials } from '../configurationHelpers';

type Props = {
  name: string;
  size?: 'sm' | 'md';
};

const SIZE_CLASS = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-9 w-9 text-[12px]',
};

export function UserAvatar({ name, size = 'md' }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${avatarColor(name)} ${SIZE_CLASS[size]}`}
    >
      {getInitials(name)}
    </span>
  );
}
