import { z } from 'zod';

export const contractorSchema = z
  .object({
    company: z.string().min(1, 'Please select a company'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    mobile: z
      .string()
      .regex(/^968\d{8}$/, 'Enter a valid 8-digit mobile number'),
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    accepted: z.boolean(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((d) => d.accepted, {
    message: 'You must accept the Terms and Conditions',
    path: ['accepted'],
  });
