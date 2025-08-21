import { ModeToggle } from '@/components/mode-toggle';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SignInButton, SignOutButton } from '@/components/auth-buttons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Shadcn + Dark Mode (v4)</h1>
        <ModeToggle />
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Looks great in light & dark</CardTitle>
        </CardHeader>
        <CardContent className="space-x-2">
          {session ? <SignOutButton /> : <SignInButton />}
        </CardContent>
      </Card>
    </main>
  );
}
