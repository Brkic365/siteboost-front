// app/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BarChart3, BotMessageSquare } from "lucide-react";
import { AuthForm } from "@/login/_components/auth-form";

export default async function HomePage() {
  const session = await auth();

  // If the user is already logged in, send them straight to the dashboard.
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-background text-foreground py-20 md:py-28">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
            
            {/* Left Side: Marketing Copy */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                Turn Website Audits into {' '}
                <span className="text-primary">Actionable Plans</span>
              </h1>
              <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg text-muted-foreground">
                Stop drowning in technical jargon. SiteBoost uses AI to translate complex performance, SEO, and accessibility reports into a simple, prioritized to-do list for your team.
              </p>
              <div className="mt-8 flex justify-center md:justify-start gap-4">
                 <a href="#signin" className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md px-6 inline-flex items-center justify-center">Get Your Free Report</a>
              </div>
            </div>

            {/* Right Side: Sign-in Card */}
            <div id="signin">
              <AuthForm />
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
    </div>
  );
}