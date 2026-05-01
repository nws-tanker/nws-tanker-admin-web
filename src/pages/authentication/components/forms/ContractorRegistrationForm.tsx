import EyeIcon from '@/atoms/icons';
import { Input, Select, Button, IconButton } from '@/atoms';
import type { SelectOption } from '@/atoms';
import { useContractorRegistrationForm } from '@/pages/authentication/hooks/useContractorRegistrationForm';

const COMPANY_OPTIONS: SelectOption[] = [
  { value: 'Al Madina Tankers LLC', label: 'Al Madina Tankers LLC' },
  { value: 'Oman Tanker Services', label: 'Oman Tanker Services' },
  { value: 'Dhofar Compliance Co', label: 'Dhofar Compliance Co' },
];

export default function ContractorRegistrationForm() {
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
  } = useContractorRegistrationForm();

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
            <Select
              options={COMPANY_OPTIONS}
              value={values.company}
              onChange={(next) => handleChange('company', next)}
              placeholder="— Select your company —"
              disabled={isLoading}
              invalid={!!(touched.company && errors.company)}
            />
            {touched.company && errors.company && (
              <p className="mt-1 text-xs text-red-500">{errors.company}</p>
            )}
          </div>

          <div className="flex gap-3 mb-[14px]">
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Contact person <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={values.contactPersonName}
                onChange={(e) =>
                  handleChange('contactPersonName', e.target.value)
                }
                placeholder="Your full name"
                disabled={isLoading}
                invalid={
                  !!(touched.contactPersonName && errors.contactPersonName)
                }
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
              <Input
                type="tel"
                value={values.mobile}
                onChange={(e) =>
                  handleChange('mobile', e.target.value.replace(/\D/g, ''))
                }
                placeholder="9XXX XXXX"
                disabled={isLoading}
                invalid={!!(touched.mobile && errors.mobile)}
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
            <Input
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="ops@yourcompany.om"
              disabled={isLoading}
              invalid={!!(touched.email && errors.email)}
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
              <Input
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Create a password"
                disabled={isLoading}
                invalid={!!(touched.password && errors.password)}
                rightSlot={
                  <IconButton
                    icon={<EyeIcon open={showPassword} />}
                    onClick={toggleShowPassword}
                    disabled={isLoading}
                    size="sm"
                  />
                }
              />
              {touched.password && errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <Input
                type={showConfirm ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={(e) =>
                  handleChange('confirmPassword', e.target.value)
                }
                placeholder="Repeat password"
                disabled={isLoading}
                invalid={!!(touched.confirmPassword && errors.confirmPassword)}
                rightSlot={
                  <IconButton
                    icon={<EyeIcon open={showConfirm} />}
                    onClick={toggleShowConfirm}
                    disabled={isLoading}
                    size="sm"
                  />
                }
              />
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
          <a href="#" className="text-teal-700 font-medium hover:underline">
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  );
}
