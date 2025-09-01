// app/dashboard/page.tsx
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { NewAuditForm } from "@/components/new-audit-form"
import { ReportHistoryTable } from "@/components/report-history-table"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <Button type="submit" variant="outline">
            Sign Out
          </Button>
        </form>
      </header>

      <main className="space-y-8">
        <NewAuditForm />
        <ReportHistoryTable />
      </main>
    </div>
  )
}