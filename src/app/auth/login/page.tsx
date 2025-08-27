import { SignInButton } from '@/components/auth-buttons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <SignInButton />
    </main>
  );
}
