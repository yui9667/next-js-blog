'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useActionState } from 'react';

import { createUser } from '@/lib/actions/createUser';
export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' type='text' name='name' required />
            {state.errors.name && (
              <p className='text-red-500 text-sm mt-1'>
                {state.errors.name.join(',')}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='text' name='email' required />
            {state.errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {state.errors.email.join(',')}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='text' name='password' required />
            {state.errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {state.errors.password.join(',')}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              required
            />
            {state.errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {state.errors.confirmPassword.join(',')}
              </p>
            )}
          </div>
          <Button type='submit' className='w-full'>
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
