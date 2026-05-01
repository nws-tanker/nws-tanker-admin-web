import { useState } from 'react';
import EyeIcon from '../EyeIcon';
import { handleContractorRegistration } from '@/services/registrationService';
import { useToast } from '@/atoms';
import { contractorSchema } from '@/pages/authentication/schema/contractorSchema';
import type { z } from 'zod';

const COMPANIES = [
  'Al Madina Tankers LLC',
  'Oman Tanker Services',
  'Dhofar Compliance Co',
];

type FormValues = z.infer<typeof contractorSchema>;

interface FormErrors {
  company?: string;
  contactPersonName?: string;
  mobile?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accepted?: string;
}

export default function ContractorRegistrationForm() {
  const [values, setValues] = useState<FormValues>({
    company: '',
    contactPersonName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    accepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormErrors, boolean>>
  >({});
  const { show: showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    const updated = { ...values, [field]: value } as FormValues;
    setValues(updated);

    if (!touched[field as keyof FormErrors]) return;

    const result = contractorSchema.safeParse(updated);
    const fieldErrors: FormErrors = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const f = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[f]) fieldErrors[f] = issue.message;
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: fieldErrors[field as keyof FormErrors],
      // When password changes, also re-check confirmPassword if it's been touched
      ...(field === 'password' &&
        touched.confirmPassword && {
          confirmPassword: fieldErrors.confirmPassword,
        }),
    }));
  }

  function validateForm(): boolean {
    const result = contractorSchema.safeParse(values);

    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: FormErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormErrors;
      if (!newErrors[field]) newErrors[field] = issue.message;
    }
    setErrors(newErrors);
    return false;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({
      company: true,
      contactPersonName: true,
      mobile: true,
      email: true,
      password: true,
      confirmPassword: true,
      accepted: true,
    });

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await handleContractorRegistration({
        company: values.company,
        contactPersonName: values.contactPersonName,
        mobile: values.mobile,
        password: values.password,
      });
      if (!result.success) {
        showToast(result.error.description, { tone: 'error' });
        return;
      }
      showToast('Registration submitted successfully');
      // TODO: redirect
    } catch {
      showToast('Something went wrong. Please try again.', { tone: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-xl">
        <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-gray-900 mb-1.5">
          Register as contractor
        </h1>
        <p className="text-[13px] text-gray-500 mb-[22px]">
          Self-registration for licensed tanker operators. Nama will review
          within 2 business days.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-1.5 mb-[14px]">
            <label className="text-[12px] font-medium text-gray-700">
              Company name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={values.company}
                onChange={(e) => handleChange('company', e.target.value)}
                disabled={isLoading}
                className={`w-full border rounded-[8px] px-3 py-[10px] text-sm appearance-none focus:outline-none focus:ring-[3px] bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                  touched.company && errors.company
                    ? 'border-red-400 text-gray-900 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-300 text-gray-500 focus:border-teal-600 focus:ring-teal-50'
                }`}
              >
                <option value="" disabled>
                  — Select your company —
                </option>
                {COMPANIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {touched.company && errors.company && (
              <p className="mt-1 text-xs text-red-500">{errors.company}</p>
            )}
          </div>

          <div className="flex gap-3 mb-[14px]">
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Contact person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={values.contactPersonName}
                onChange={(e) =>
                  handleChange('contactPersonName', e.target.value)
                }
                placeholder="Your full name"
                disabled={isLoading}
                className={`w-full border rounded-[8px] px-3 py-[10px] text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed ${
                  touched.contactPersonName && errors.contactPersonName
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50'
                }`}
              />
              {touched.contactPersonName && errors.contactPersonName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.contactPersonName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Mobile (+968) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={values.mobile}
                onChange={(e) =>
                  handleChange('mobile', e.target.value.replace(/\D/g, ''))
                }
                placeholder="9XXX XXXX"
                disabled={isLoading}
                className={`w-full border rounded-[8px] px-3 py-[10px] text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed ${
                  touched.mobile && errors.mobile
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50'
                }`}
              />
              {touched.mobile && errors.mobile && (
                <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
              )}
            </div>
          </div>

          <div className="grid gap-1.5 mb-[14px]">
            <label className="text-[12px] font-medium text-gray-700">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="ops@yourcompany.om"
              disabled={isLoading}
              className={`w-full border rounded-[8px] px-3 py-[10px] text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed ${
                touched.email && errors.email
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50'
              }`}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="flex gap-3 mb-[14px]">
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a password"
                  disabled={isLoading}
                  className={`w-full border rounded-[8px] px-3 py-[10px] pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed ${
                    touched.password && errors.password
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                      : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={(e) =>
                    handleChange('confirmPassword', e.target.value)
                  }
                  placeholder="Repeat password"
                  disabled={isLoading}
                  className={`w-full border rounded-[8px] px-3 py-[10px] pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed ${
                    touched.confirmPassword && errors.confirmPassword
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                      : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={values.accepted}
                onChange={(e) => handleChange('accepted', e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 rounded border-gray-300 accent-teal-700 disabled:opacity-50"
              />
              <span className="text-[12px] text-gray-600">
                I accept the{' '}
                <a
                  href="#"
                  className="text-teal-700 font-medium hover:underline"
                >
                  Terms and Conditions
                </a>
              </span>
            </label>
            {touched.accepted && errors.accepted && (
              <p className="mt-1 text-xs text-red-500">{errors.accepted}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-teal-800 hover:bg-teal-900 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-[8px] text-[14px] transition-colors"
          >
            {isLoading ? 'Submitting...' : 'Submit registration'}
          </button>
        </form>

        <p className="mt-[18px] text-center text-[12px] text-gray-500">
          Already registered?{' '}
          <a href="#" className="text-teal-700 font-medium hover:underline">
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  );
}
