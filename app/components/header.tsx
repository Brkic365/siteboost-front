// app/components/header.tsx
import { auth } from "@/auth";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SiteBoost</span>
        </Link>
        <nav className="flex items-center gap-4">
          {session?.user ? (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/#signin">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}