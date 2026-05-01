import { useState } from 'react';
import { z } from 'zod';
import { handleContractorRegistration } from '@/services/registrationService';
import { useToast } from '@/atoms';
import { contractorSchema } from '../schema/contractorSchema';

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

export function useContractorRegistrationForm() {
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
