'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
