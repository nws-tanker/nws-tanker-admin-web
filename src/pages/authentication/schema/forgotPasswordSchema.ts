import { z } from 'zod';

export const forgotPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
});

export const forgotPasswordOtpSchema = z.object({
  otp: z
    .string()
    .min(1, 'OTP is required')
    .regex(/^\d{6}$/, 'OTP must be a 6-digit code'),
});

export const forgotPasswordResetSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
