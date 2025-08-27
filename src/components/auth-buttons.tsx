'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function SignInButton() {
  return (
    <Button onClick={() => signIn('google', { callbackUrl: '/' })} variant="outline">
      Sign in with Google
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button variant={'outline'} onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </Button>
  );
}
