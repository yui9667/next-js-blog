import { object, string } from 'zod';
export const registerSchema = object({
  name: string().min(1, 'Name is required'),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters ')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string({
    required_error: 'Confirm password is required',
  }).min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password is not match',
  path: ['confirmPassword'], //*エラーを表示するフィールドを指定
});
