import { useState } from 'react';
import { useToast } from '@/atoms';
import {
  forgetPasswordApi,
  resetPasswordApi,
  validateOtpApi,
} from '@/services/authenticationService';
import {
  forgotPasswordEmailSchema,
  forgotPasswordOtpSchema,
  forgotPasswordResetSchema,
} from '../schema/forgotPasswordSchema';

export type ForgotPasswordStep = 'email' | 'otp' | 'reset';

type ResetValues = { newPassword: string; confirmPassword: string };

export function useForgotPasswordFlow(onDone: () => void, initialEmail = '') {
  const { show: showToast } = useToast();
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [resetValues, setResetValues] = useState<ResetValues>({
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submitEmail(value: string) {
    const parsed = forgotPasswordEmailSchema.safeParse({ email: value });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setIsLoading(true);
    const res = await forgetPasswordApi(value);
    setIsLoading(false);
    if (!res.success) {
      setError(res.error.description);
      return;
    }
    setEmail(value);
    setStep('otp');
    showToast('OTP sent to your email');
  }

  async function submitOtp(value: string) {
    const parsed = forgotPasswordOtpSchema.safeParse({ otp: value });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setIsLoading(true);
    const res = await validateOtpApi(email, value);
    setIsLoading(false);
    if (!res.success) {
      setError(res.error.description);
      return;
    }
    setOtp(value);
    setStep('reset');
  }

  async function submitReset(values: ResetValues) {
    const parsed = forgotPasswordResetSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setIsLoading(true);
    const res = await resetPasswordApi(email, otp, values.newPassword);
    setIsLoading(false);
    if (!res.success) {
      setError(res.error.description);
      return;
    }
    showToast('Password reset successfully. Please sign in.');
    onDone();
  }

  async function resendOtp() {
    if (!email) return;
    setIsLoading(true);
    const res = await forgetPasswordApi(email);
    setIsLoading(false);
    if (!res.success) {
      showToast(res.error.description, { tone: 'error' });
      return;
    }
    showToast('A new OTP has been sent');
  }

  return {
    step,
    email,
    resetValues,
    setResetValues,
    error,
    isLoading,
    submitEmail,
    submitOtp,
    submitReset,
    resendOtp,
    goBackToEmail: () => {
      setError(null);
      setStep('email');
    },
  };
}
