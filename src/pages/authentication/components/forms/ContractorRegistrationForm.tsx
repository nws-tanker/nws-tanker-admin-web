import { useState } from 'react';
import { Input, Select, Button } from '@/atoms';
import { useContractorRegistrationForm } from '@/pages/authentication/hooks/useContractorRegistrationForm';
import { FormField } from '@/atoms';
import { PasswordField } from './PasswordField';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';

type Props = {
  onSwitchToLogin: () => void;
};

export default function ContractorRegistrationForm({ onSwitchToLogin }: Props) {
  const [showTerms, setShowTerms] = useState(false);
  const {
    values,
    errors,
    touched,
    showPassword,
    showConfirm,
    isLoading,
    companyOptions,
    handleChange,
    handleSubmit,
    toggleShowPassword,
    toggleShowConfirm,
  } = useContractorRegistrationForm();

  const err = (field: keyof typeof errors) =>
    touched[field] ? errors[field] : undefined;

  return (
    <div>
      <TermsAndConditionsModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
      />

      <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-gray-900 mb-1.5">
        Register as contractor
      </h1>
      <p className="text-[13px] text-gray-500 mb-[22px]">
        Self-registration for licensed tanker operators. Nama will review within
        2 business days.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Company name"
          required
          error={err('company')}
          className="mb-[14px]"
        >
          <Select
            options={companyOptions}
            value={values.company}
            onChange={(next) => handleChange('company', next)}
            placeholder="— Select your company —"
            disabled={isLoading}
            invalid={!!err('company')}
          />
        </FormField>

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

        <FormField
          label="Email address"
          required
          error={err('email')}
          className="mb-[14px]"
        >
          <Input
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="ops@yourcompany.om"
            disabled={isLoading}
            invalid={!!err('email')}
          />
        </FormField>

        <div className="flex gap-3 mb-[14px]">
          <PasswordField
            label="Password"
            value={values.password}
            onChange={(v) => handleChange('password', v)}
            placeholder="Create a password"
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

        <div className="mb-[14px]">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={values.accepted}
              onChange={(e) => handleChange('accepted', e.target.checked)}
              disabled={isLoading}
              className="h-4 w-4 rounded border-gray-300 text-teal-700 accent-teal-700"
            />
            <span className="text-[13px] text-gray-600">
              I accept the{' '}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-teal-700 font-medium hover:underline"
              >
                Terms and Conditions
              </button>
            </span>
          </label>
          {touched.accepted && errors.accepted && (
            <p className="mt-1 text-[12px] text-red-500">{errors.accepted}</p>
          )}
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
        Already registered?{' '}
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
