import { Input, Button } from '@/atoms';
import { useEmployeeRegistrationForm } from '@/pages/authentication/hooks/useEmployeeRegistrationForm';
import { FormField } from '@/atoms';
import { PasswordField } from './PasswordField';

type Props = {
  onSwitchToLogin: () => void;
};

export default function EmployeeRegistrationForm({ onSwitchToLogin }: Props) {
  const {
    values,
    errors,
    touched,
    showPassword,
    showConfirm,
    isLoading,
    handleChange,
    handleSubmit,
    toggleShowPassword,
    toggleShowConfirm,
  } = useEmployeeRegistrationForm();

  const err = (field: keyof typeof errors) =>
    touched[field] ? errors[field] : undefined;

  return (
    <div>
      <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-gray-900 mb-1.5">
        Nama Employee Registration
      </h1>
      <p className="text-[13px] text-gray-500 mb-[22px]">
        For Nama Water Services employees only. Submit your details and the
        Operations Manager will assign your role and activate your account.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex gap-3 mb-[14px]">
          <FormField
            label="First name"
            required
            error={err('firstName')}
            className="flex-1"
          >
            <Input
              type="text"
              value={values.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="Khalid"
              disabled={isLoading}
              invalid={!!err('firstName')}
            />
          </FormField>
          <FormField
            label="Last name"
            required
            error={err('lastName')}
            className="flex-1"
          >
            <Input
              type="text"
              value={values.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Al-Maamari"
              disabled={isLoading}
              invalid={!!err('lastName')}
            />
          </FormField>
        </div>

        <FormField
          label="Work email address"
          required
          error={err('email')}
          className="mb-[14px]"
        >
          <Input
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="you@nama.om"
            disabled={isLoading}
            invalid={!!err('email')}
          />
        </FormField>

        <FormField
          label="Mobile (+968)"
          required
          error={err('mobile')}
          className="mb-[14px]"
        >
          <Input
            type="tel"
            value={values.mobile}
            onChange={(e) =>
              handleChange('mobile', e.target.value.replace(/\D/g, ''))
            }
            placeholder="9XXX XXXX"
            disabled={isLoading}
            invalid={!!err('mobile')}
          />
        </FormField>

        <div className="flex gap-3 mb-[14px]">
          <PasswordField
            label="Password"
            value={values.password}
            onChange={(v) => handleChange('password', v)}
            placeholder="Min 8 characters"
            show={showPassword}
            onToggle={toggleShowPassword}
            disabled={isLoading}
            error={err('password')}
          />
          <PasswordField
            label="Confirm password"
            value={values.confirmPassword}
            onChange={(v) => handleChange('confirmPassword', v)}
            placeholder="Repeat password"
            show={showConfirm}
            onToggle={toggleShowConfirm}
            disabled={isLoading}
            error={err('confirmPassword')}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full h-11 justify-center text-[14px]"
        >
          {isLoading ? 'Submitting...' : 'Submit registration'}
        </Button>
      </form>

      <p className="mt-[18px] text-center text-[12px] text-gray-500">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-teal-700 font-medium hover:underline"
        >
          Back to sign in
        </button>
      </p>
    </div>
  );
}
