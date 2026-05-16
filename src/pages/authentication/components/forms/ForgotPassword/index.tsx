import { useForgotPasswordFlow } from '@/pages/authentication/hooks/useForgotPasswordFlow';
import EmailStep from './EmailStep';
import OtpStep from './OtpStep';
import ResetStep from './ResetStep';

type Props = {
  onBackToLogin: () => void;
};

export default function ForgotPasswordForm({ onBackToLogin }: Props) {
  const {
    step,
    email,
    error,
    isLoading,
    submitEmail,
    submitOtp,
    submitReset,
    resendOtp,
    goBackToEmail,
  } = useForgotPasswordFlow(onBackToLogin);

  return (
    <div>
      {step === 'email' && (
        <EmailStep
          isLoading={isLoading}
          error={error}
          defaultEmail={email}
          onSubmit={submitEmail}
        />
      )}
      {step === 'otp' && (
        <OtpStep
          email={email}
          isLoading={isLoading}
          error={error}
          onSubmit={submitOtp}
          onResend={resendOtp}
          onChangeEmail={goBackToEmail}
        />
      )}
      {step === 'reset' && (
        <ResetStep isLoading={isLoading} error={error} onSubmit={submitReset} />
      )}

      <div className="mt-[18px] text-center text-[12px] text-gray-500">
        Remembered it?{' '}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-teal-700 font-medium hover:underline"
        >
          Back to sign in
        </button>
      </div>
    </div>
  );
}
