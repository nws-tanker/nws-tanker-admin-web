import { useState } from 'react';
import { handleLogin } from '@/services/authenticationService';
import { useToast } from '@/atoms';
import { z } from 'zod';
import { loginSchema } from '../../schema/loginSchema';

type FormValues = z.infer<typeof loginSchema>;

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    remember: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const { show: showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (field !== 'email' && field !== 'password') return;
    if (!touched[field as 'email' | 'password']) return;

    const result = loginSchema.shape[field].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0].message,
    }));
  }

  function validateForm(): boolean {
    const result = loginSchema.safeParse(values);

    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: FormErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormErrors;
      if ((field === 'email' || field === 'password') && !newErrors[field]) {
        newErrors[field] = issue.message;
      }
    }
    setErrors(newErrors);
    return false;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({ email: true, password: true });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await handleLogin(values.email, values.password);
      if (!result.success) {
        showToast(result.error.description, { tone: 'error' });
        return;
      }
      localStorage.setItem('jwt', result.data.jwt);
      showToast('Signed in successfully');
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
          Sign in to your account
        </h1>
        <p className="text-[13px] text-gray-500 mb-[22px]">
          Welcome back — Nama employees, cluster managers, inspectors and
          supervisors.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-1.5 mb-[14px]">
            <label className="text-[12px] font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              className={`w-full border rounded-[8px] px-3 py-[10px] text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className={`w-full border rounded-[8px] px-3 py-[10px] pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  touched.password && errors.password
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-1.5 mb-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={values.remember}
                onChange={(e) => handleChange('remember', e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 rounded border-gray-300 accent-teal-700 disabled:opacity-50"
              />
              <span className="text-[12px] text-gray-600">
                Remember me on this device
              </span>
            </label>
            <a
              href="#"
              className="text-[12px] text-teal-700 font-medium hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 mt-1.5 bg-teal-800 hover:bg-teal-900 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-[8px] text-[14px] transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="mt-[18px] space-y-2 text-center text-[12px] text-gray-500">
          <p>
            Nama employee?{' '}
            <a href="#" className="text-teal-700 font-medium hover:underline">
              Register here
            </a>
          </p>
          <p>
            Contractor?{' '}
            <a href="#" className="text-teal-700 font-medium hover:underline">
              Register company
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
