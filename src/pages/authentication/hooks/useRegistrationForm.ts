import { useState, useEffect } from 'react';
import { z } from 'zod';
import { handleEmployeeRegistration } from '@/services/registrationService';
import { fetchContractorsApi } from '@/services/getContracterService';
import type { SelectOption } from '@/atoms';
import { useToast } from '@/atoms';
import { namaEmployeeSchema } from '../schema/employeeSchema';

type FormValues = z.infer<typeof namaEmployeeSchema>;

interface FormErrors {
  company?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
}

export function useRegistrationForm() {
  const [values, setValues] = useState<FormValues>({
    company: undefined,
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
  const [companyOptions, setCompanyOptions] = useState<SelectOption[]>([]);
  const [contractorIdMap, setContractorIdMap] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    fetchContractorsApi().then((result) => {
      if (!result.success) return;
      const options: SelectOption[] = result.data.map((c) => ({
        value: c.companyNameEn,
        label: c.companyNameEn,
      }));
      const idMap: Record<string, number> = {};
      result.data.forEach((c) => {
        idMap[c.companyNameEn] = c.contractorId;
      });
      setCompanyOptions(options);
      setContractorIdMap(idMap);
    });
  }, []);

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
      company: true,
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
        contractorId: values.company
          ? (contractorIdMap[values.company] ?? 0)
          : 0,
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
    companyOptions,
    handleChange,
    handleSubmit,
    toggleShowPassword: () => setShowPassword((p) => !p),
    toggleShowConfirm: () => setShowConfirm((p) => !p),
  };
}
