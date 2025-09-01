// app/login/page.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthForm } from './_components/auth-form'; // We will create this next

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthForm />
      </main>
      <Footer />
    </div>
  );
}