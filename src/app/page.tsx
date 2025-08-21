import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Home() {
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
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </CardContent>
      </Card>
    </main>
  );
}
