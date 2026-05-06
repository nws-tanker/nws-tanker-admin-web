import EyeIcon from '@/atoms/icons';
import { Input, Button, IconButton } from '@/atoms';
import { useLoginForm } from '@/pages/authentication/hooks/useLoginForm';

type Props = {
  onSwitchToEmployee: () => void;
  onSwitchToContractor: () => void;
};

export default function LoginForm({
  onSwitchToEmployee,
  onSwitchToContractor,
}: Props) {
  const {
    values,
    errors,
    touched,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    toggleShowPassword,
  } = useLoginForm();

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
            <Input
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              invalid={!!(touched.email && errors.email)}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="grid gap-1.5 mb-[14px]">
            <label className="text-[12px] font-medium text-gray-700">
              Password
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              invalid={!!(touched.password && errors.password)}
              rightSlot={
                <IconButton
                  icon={<EyeIcon open={showPassword} />}
                  onClick={toggleShowPassword}
                  disabled={isLoading}
                  size="sm"
                  tabIndex={-1}
                />
              }
            />
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

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full h-11 mt-1.5 justify-center text-[14px]"
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
          </Button>
        </form>

        <div className="mt-[18px] space-y-2 text-center text-[12px] text-gray-500">
          <p>
            Nama employee?{' '}
            <button
              type="button"
              onClick={onSwitchToEmployee}
              className="text-teal-700 font-medium hover:underline"
            >
              Register here
            </button>
          </p>
          <p>
            Contractor?{' '}
            <button
              type="button"
              onClick={onSwitchToContractor}
              className="text-teal-700 font-medium hover:underline"
            >
              Register company
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
