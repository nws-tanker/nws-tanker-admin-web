import EyeIcon from '@/atoms/icons';
import { Input, IconButton } from '@/atoms';
import { FormField } from '@/atoms';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  show: boolean;
  onToggle: () => void;
  disabled?: boolean;
  error?: string;
};

export function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  show,
  onToggle,
  disabled,
  error,
}: Props) {
  return (
    <FormField label={label} required error={error} className="flex-1">
      <Input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        invalid={!!error}
        rightSlot={
          <IconButton
            icon={<EyeIcon open={show} />}
            onClick={onToggle}
            disabled={disabled}
            size="sm"
          />
        }
      />
    </FormField>
  );
}
