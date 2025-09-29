import { z } from 'zod';

export const registerValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'حداقل ۳ کاراکتر')
    .max(50, 'حداکثر ۵۰ کاراکتر'),
  phone_number: z
    .string()
    .min(11, 'حداقل 11 کاراکتر')
    .max(11, 'حداکثر 11 کاراکتر')
    .regex(/^09\d{9}$/, 'شماره باید ۱۱ رقمی و با 09 شروع شود.'),
  password: z
    .string()
    .min(4, 'حداقل 4 کاراکتر')
    .regex(/(?=.*[A-Za-z])(?=.*\d)/, 'ترکیب عدد و حرف الزامی است.'),
  agree: z.literal(true, { 
    message: 'پذیرفتن قوانین الزامی است.' 
  }),
});

export type RegisterFormValues = z.infer<typeof registerValidationSchema>;