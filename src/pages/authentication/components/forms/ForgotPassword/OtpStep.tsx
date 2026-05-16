import { useState } from 'react';
import { Button, FormField, Input } from '@/atoms';

type Props = {
  email: string;
  isLoading: boolean;
  error: string | null;
  onSubmit: (otp: string) => void;
  onResend: () => void;
  onChangeEmail: () => void;
};

export default function OtpStep({
  email,
  isLoading,
  error,
  onSubmit,
  onResend,
  onChangeEmail,
}: Props) {
  const [otp, setOtp] = useState('');

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(otp.trim());
      }}
    >
      <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-gray-900 mb-1.5">
        Verify your email
      </h1>
      <p className="text-[13px] text-gray-500 mb-[22px]">
        We&apos;ve sent a 6-digit code to{' '}
        <strong className="font-semibold text-gray-700">{email}</strong>. Enter
        it below to continue.
      </p>

      <FormField label="One-time code" required error={error ?? undefined}>
        <Input
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          placeholder="••••••"
          disabled={isLoading}
          invalid={!!error}
          autoFocus
          className="tracking-[0.4em] text-center font-mono text-[16px]"
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading || otp.length !== 6}
        className="w-full h-11 mt-4 justify-center text-[14px]"
      >
        {isLoading ? 'Verifying…' : 'Verify code'}
      </Button>

      <div className="mt-4 flex items-center justify-between text-[12px]">
        <button
          type="button"
          onClick={onChangeEmail}
          disabled={isLoading}
          className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          ← Change email
        </button>
        <button
          type="button"
          onClick={onResend}
          disabled={isLoading}
          className="text-teal-700 font-medium hover:underline disabled:opacity-50"
        >
          Resend code
        </button>
      </div>
    </form>
  );
}
