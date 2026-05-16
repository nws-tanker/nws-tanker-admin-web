import { useState } from 'react';
import { Button } from '@/atoms';
import { PasswordField } from '../PasswordField';

type Values = { newPassword: string; confirmPassword: string };

type Props = {
  isLoading: boolean;
  error: string | null;
  onSubmit: (values: Values) => void;
};

export default function ResetStep({ isLoading, error, onSubmit }: Props) {
  const [values, setValues] = useState<Values>({
    newPassword: '',
    confirmPassword: '',
  });
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const mismatch =
    values.newPassword.length > 0 &&
    values.confirmPassword.length > 0 &&
    values.newPassword !== values.confirmPassword;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-gray-900 mb-1.5">
        Set a new password
      </h1>
      <p className="text-[13px] text-gray-500 mb-[22px]">
        Choose a strong password you haven&apos;t used before. Minimum 8
        characters.
      </p>

      <div className="mb-3">
        <PasswordField
          label="New password"
          value={values.newPassword}
          onChange={(v) => setValues((p) => ({ ...p, newPassword: v }))}
          placeholder="Enter new password"
          show={showNew}
          onToggle={() => setShowNew((p) => !p)}
          disabled={isLoading}
          error={error ?? undefined}
        />
      </div>

      <PasswordField
        label="Confirm new password"
        value={values.confirmPassword}
        onChange={(v) => setValues((p) => ({ ...p, confirmPassword: v }))}
        placeholder="Re-enter new password"
        show={showConfirm}
        onToggle={() => setShowConfirm((p) => !p)}
        disabled={isLoading}
        error={mismatch ? 'Passwords do not match' : undefined}
      />

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading || mismatch || !values.newPassword}
        className="w-full h-11 mt-4 justify-center text-[14px]"
      >
        {isLoading ? 'Updating…' : 'Reset password'}
      </Button>
    </form>
  );
}
