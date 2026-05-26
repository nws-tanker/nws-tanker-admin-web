import { useState } from 'react';
import { z } from 'zod';
import { handleEmployeeRegistration } from '@/services/registrationService';
import { useToast } from '@/atoms';
import { OMAN_MOBILE_FULL_LENGTH, sanitizeOmanMobileInput } from '@/utils';
import { namaEmployeeSchema } from '../schema/employeeSchema';

type FormValues = z.infer<typeof namaEmployeeSchema>;

const INITIAL_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '968',
  password: '',
  confirmPassword: '',
};

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
}

export function useEmployeeRegistrationForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
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
    if (field === 'mobile') {
      value = sanitizeOmanMobileInput(value as string) as FormValues[K];
    }
    const updated = { ...values, [field]: value } as FormValues;
    setValues(updated);

    const mobileReachedFullLength =
      field === 'mobile' &&
      (value as string).length === OMAN_MOBILE_FULL_LENGTH;
    if (mobileReachedFullLength && !touched.mobile) {
      setTouched((t) => ({ ...t, mobile: true }));
    }

    const isTouched =
      touched[field as keyof FormErrors] || mobileReachedFullLength;
    if (!isTouched) return;

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
        contractorId: 0,
      });
      if (!result.success) {
        showToast(result.error.description, { tone: 'error' });
        return;
      }
      showToast('Registration submitted successfully');
      setValues(INITIAL_VALUES);
      setErrors({});
      setTouched({});
    } catch {
      showToast('Something went wrong. Please try again.', { tone: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    values,
    errors,
    touched,
    showPassword,
    showConfirm,
    isLoading,
    handleChange,
    handleSubmit,
    toggleShowPassword: () => setShowPassword((p) => !p),
    toggleShowConfirm: () => setShowConfirm((p) => !p),
  };
}
