'use client';

import { signIn, signOut } from 'next-auth/react';

export function SignInButton() {
  return (
    <button onClick={() => signIn('google')} className="border px-4 py-2 rounded">
      Sign in with Google
    </button>
  );
}

export function SignOutButton() {
  return (
    <button onClick={() => signOut()} className="border px-4 py-2 rounded">
      Sign out
    </button>
  );
}
