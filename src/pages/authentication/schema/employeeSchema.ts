import { z } from 'zod';
import { OMAN_MOBILE_ERROR, OMAN_MOBILE_REGEX } from '@/utils';

export const namaEmployeeSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z
      .string()
      .min(1, 'Work email address is required')
      .email('Please enter a valid email address'),
    mobile: z.string().regex(OMAN_MOBILE_REGEX, OMAN_MOBILE_ERROR),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
