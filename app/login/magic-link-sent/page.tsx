// app/login/magic-link-sent/page.tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';

export default function MagicLinkSentPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit">
              <MailCheck className="h-10 w-10" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardTitle>Check your inbox</CardTitle>
            <CardDescription>
              We've sent a magic sign-in link to your email address. Click the link to securely sign in to your SiteBoost account.
            </CardDescription>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}