// app/dashboard/page.tsx
'use client'; // This page is interactive, so it's a client component

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NewAuditForm } from "@/components/new-audit-form";
import { ReportHistoryTable } from "@/components/report-history-table";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle loading and unauthenticated states
  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null; // Return null to prevent rendering the rest of the component
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session?.user?.name || session?.user?.email}
          </p>
        </div>
        <Button onClick={() => signOut({ callbackUrl: "/" })} variant="outline">
          Sign Out
        </Button>
      </header>

      <main className="space-y-8">
        {/* Component to run a new audit */}
        <NewAuditForm />

        {/* Component to display past reports */}
        <ReportHistoryTable />
      </main>
    </div>
  );
}