// app/login/page.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleSignInButton, EmailSignInForm } from './_components/auth-forms';
import { Suspense } from 'react';

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Welcome to SiteBoost</CardTitle>
            <CardDescription>Sign in or create an account to get started.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Suspense fallback={<div>Loading...</div>}>
              <GoogleSignInButton />
            </Suspense>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>
            
            <Suspense fallback={<div>Loading...</div>}>
              <EmailSignInForm />
            </Suspense>

          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}