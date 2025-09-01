// app/page.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, BarChart3, BotMessageSquare, ShieldCheck } from 'lucide-react'; // Added BotMessageSquare

export default async function HomePage() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-background text-foreground pt-32 pb-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              The Complete Picture of Your {' '}
              <span className="text-primary">Website's Health</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Run comprehensive audits across Performance, SEO, Security, and Accessibility. Get a unified, AI-powered report to fix what matters most.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">Get Your Free AI Report</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">One Platform, Total Clarity</h2>
              <p className="mt-4 text-muted-foreground">
                Stop juggling tools. Get a single, actionable plan for site optimization.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature Card 1: All-in-One Audits */}
              <Card>
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="bg-primary/10 text-primary rounded-full p-3">
                      <Zap className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl">All-in-One Audits</CardTitle>
                  <CardDescription className="text-center pt-2">
                    Combine reports from Lighthouse, SEO crawlers, security scanners, and accessibility checkers into a single, easy-to-read dashboard.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              {/* Feature Card 2: AI-Powered Insights */}
              <Card className="border-primary ring-2 ring-primary">
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="bg-primary/10 text-primary rounded-full p-3">
                      <BotMessageSquare className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl">AI-Powered Insights</CardTitle>
                  <CardDescription className="text-center pt-2">
                    Our AI analyzes all audit data to generate a prioritized, human-readable report. Know exactly what to fix first to make the biggest impact.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature Card 3: Historical Tracking */}
              <Card>
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="bg-primary/10 text-primary rounded-full p-3">
                      <BarChart3 className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl">Track Your Progress</CardTitle>
                  <CardDescription className="text-center pt-2">
                    Save your audit history to visualize improvements over time. See how your changes impact your scores across all categories.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}