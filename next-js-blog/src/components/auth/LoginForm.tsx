'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authenticate';
import { useRouter } from 'next/navigation';
export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const handleRedirect = () => {
    router.push('/dashboard');
  };
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (event) => {
            await formAction(event);
            if (!errorMessage) {
              handleRedirect();
            }
          }}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' name='email' required></Input>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              name='password'
              required
            ></Input>
          </div>
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
          <div className='flex h-8 items-end space-x-1'>
            {errorMessage && (
              <div className=' text-red-500'>
                <p className='text-sm text-red-500'>{errorMessage}</p>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
