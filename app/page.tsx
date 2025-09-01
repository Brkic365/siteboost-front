// app/page.tsx
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Understand Your Website's Performance
        </h1>
        <p className="text-muted-foreground text-lg">
          Get detailed Lighthouse reports to improve your speed, SEO, and user
          experience.
        </p>
        <Button asChild size="lg">
          <Link href="/api/auth/signin/google">Sign In with Google to Get Started</Link>
        </Button>
      </div>
    </main>
  )
}