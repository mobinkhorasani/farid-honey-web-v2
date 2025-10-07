import { z } from 'zod';

export const loginValidationSchema = z.object({
  phone_number: z
    .string()
    .min(11, 'حداقل 11 کاراکتر')
    .max(11, 'حداکثر 11 کاراکتر')
    .regex(/^09\d{9}$/, 'شماره باید ۱۱ رقمی و با 09 شروع شود.'),
  password: z.string().min(4, 'حداقل 4 کاراکتر'),
});

export type LoginFormValues = z.infer<typeof loginValidationSchema>;