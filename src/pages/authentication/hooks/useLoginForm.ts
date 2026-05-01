import { useState } from 'react';
import { z } from 'zod';
import { handleLogin } from '@/services/authenticationService';
import { useToast } from '@/atoms';
import { loginSchema } from '../schema/loginSchema';

type FormValues = z.infer<typeof loginSchema>;

interface FormErrors {
  email?: string;
  password?: string;
}

export function useLoginForm() {
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

    if (!validateForm()) return;

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

  return {
    values,
    errors,
    touched,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    toggleShowPassword: () => setShowPassword((p) => !p),
  };
}
