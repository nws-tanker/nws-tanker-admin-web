import { useState } from 'react';
import { Button, FormField, Input } from '@/atoms';

type Props = {
  isLoading: boolean;
  error: string | null;
  defaultEmail?: string;
  onSubmit: (email: string) => void;
};

export default function EmailStep({
  isLoading,
  error,
  defaultEmail = '',
  onSubmit,
}: Props) {
  const [email, setEmail] = useState(defaultEmail);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email.trim());
      }}
    >
      <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-gray-900 mb-1.5">
        Forgot your password?
      </h1>
      <p className="text-[13px] text-gray-500 mb-[22px]">
        Enter the email address associated with your account and we&apos;ll send
        you a one-time code to reset your password.
      </p>

      <FormField label="Email address" required error={error ?? undefined}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={isLoading}
          invalid={!!error}
          autoFocus
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="w-full h-11 mt-4 justify-center text-[14px]"
      >
        {isLoading ? 'Sending OTP…' : 'Send OTP'}
      </Button>
    </form>
  );
}
