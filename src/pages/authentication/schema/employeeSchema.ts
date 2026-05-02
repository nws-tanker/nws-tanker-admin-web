import { z } from 'zod';

export const namaEmployeeSchema = z
  .object({
    company: z.string().optional(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z
      .string()
      .min(1, 'Work email address is required')
      .email('Please enter a valid email address'),
    mobile: z.string().regex(/^\d{8}$/, 'Enter a valid 8-digit mobile number'),
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
