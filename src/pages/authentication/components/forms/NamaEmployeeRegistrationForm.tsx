import EyeIcon from '@/atoms/icons';
import { Input, Button, IconButton } from '@/atoms';
import { useNamaEmployeeRegistrationForm } from '@/pages/authentication/hooks/useNamaEmployeeRegistrationForm';

export default function NamaEmployeeRegistrationForm() {
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
  } = useNamaEmployeeRegistrationForm();

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
              <Input
                type="text"
                value={values.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Khalid"
                disabled={isLoading}
                invalid={!!(touched.firstName && errors.firstName)}
              />
              {touched.firstName && errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Last name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={values.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Al-Maamari"
                disabled={isLoading}
                invalid={!!(touched.lastName && errors.lastName)}
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
            <Input
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@nama.om"
              disabled={isLoading}
              invalid={!!(touched.email && errors.email)}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="grid gap-1.5 mb-[14px]">
            <label className="text-[12px] font-medium text-gray-700">
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

          <div className="flex gap-3 mb-[14px]">
            <div className="flex-1">
              <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Min 8 characters"
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
          <a href="#" className="text-teal-700 font-medium hover:underline">
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  );
}
