import { useState } from 'react';
import { handleEmployeeRegistration } from '@/services/registrationService';
import EyeIcon from '../EyeIcon';
import { useToast } from '@/atoms';
import { z } from 'zod';
import { namaEmployeeSchema } from '@/pages/authentication/schema/employeeSchema';

type FormValues = z.infer<typeof namaEmployeeSchema>;

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
}

export default function NamaEmployeeRegistrationForm() {
  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
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

    const result = namaEmployeeSchema.safeParse(updated);
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
    const result = namaEmployeeSchema.safeParse(values);

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
      firstName: true,
      lastName: true,
      email: true,
      mobile: true,
      password: true,
      confirmPassword: true,
    });

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await handleEmployeeRegistration({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
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
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm">
        <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-gray-900 mb-1.5">
          Nama Employee Registration
        </h1>
        <p className="text-[13px] text-gray-500 mb-[22px]">
          For Nama Water Services employees only. Submit your details and the
          Operations Manager will assign your role and activate your account.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex gap-3 mb-[14px]">
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={values.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Khalid"
                disabled={isLoading}
                className={`w-full border rounded-[8px] px-3 py-[10px] text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed ${
                  touched.firstName && errors.firstName
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50'
                }`}
              />
              {touched.firstName && errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={values.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Al-Maamari"
                disabled={isLoading}
                className={`w-full border rounded-[8px] px-3 py-[10px] text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed ${
                  touched.lastName && errors.lastName
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50'
                }`}
              />
              {touched.lastName && errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid gap-1.5 mb-[14px]">
            <label className="text-[12px] font-medium text-gray-700">
              Work email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@nama.om"
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

          <div className="grid gap-1.5 mb-[14px]">
            <label className="text-[12px] font-medium text-gray-700">
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
                  placeholder="Min 8 characters"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-teal-800 hover:bg-teal-900 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-[8px] text-[14px] transition-colors"
          >
            {isLoading ? 'Submitting...' : 'Submit registration'}
          </button>
        </form>

        <p className="mt-[18px] text-center text-[12px] text-gray-500">
          Already have an account?{' '}
          <a href="#" className="text-teal-700 font-medium hover:underline">
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  );
}
