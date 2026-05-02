import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { handleLogin } from '@/services/authenticationService';
import { useToast } from '@/atoms';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { firstAllowedPath } from '@/constants/routes';
import { useAppDispatch } from '@/store';
import { setAuth } from '@/store/slices/authSlice';
import { decodeJwt } from '@/utils';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      console.log('Coming here not successfull', result);
      if (!result.success) {
        showToast(result.error.description, { tone: 'error' });
        return;
      }

      const { jwt } = result.data;
      const payload = decodeJwt(jwt);
      if (!payload) {
        showToast('Invalid token received from server.', { tone: 'error' });
        return;
      }

      localStorage.setItem(STORAGE_KEYS.jwt, jwt);
      dispatch(setAuth({ token: jwt, payload }));
      showToast('Signed in successfully');
      navigate(firstAllowedPath(payload.user_access), { replace: true });
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
