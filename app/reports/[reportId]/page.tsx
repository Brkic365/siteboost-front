// app/reports/[reportId]/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { ScoreGauges } from "@/components/score-gauges";
import { ActionableInsights } from "@/components/actionable-insights";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

async function getReport(reportId: string, userId: string) {
  const report = await prisma.report.findUnique({
    where: { id: reportId, userId: userId },
  });
  return report;
}

export default async function ReportPage({ params }: { params: { reportId: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const report = await getReport(params.reportId, session.user.id);

  if (!report) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Report not found</h1>
        <p>This report either does not exist or you do not have permission to view it.</p>
        <Button asChild className="mt-4"><Link href="/dashboard">Back to Dashboard</Link></Button>
      </div>
    );
  }

  const scores = {
    performance: report.performanceScore,
    accessibility: report.accessibilityScore,
    bestPractices: report.bestPracticesScore,
    seo: report.seoScore,
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Dashboard</Link>
        </Button>
        <h1 className="text-3xl font-bold truncate">Report for {report.url}</h1>
        <p className="text-muted-foreground">
          Audited on {new Date(report.createdAt).toLocaleString()}
        </p>
      </header>
      
      <main className="space-y-8">
        <ScoreGauges scores={scores} />
        <ActionableInsights rawData={report.rawData as any} />
      </main>
    </div>
  );
}