// app/reports/[reportId]/page.tsx
'use client'; // This page fetches data on the client

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScoreGauges } from "@/components/score-gauges";
import { ExecutiveSummary } from "@/components/executive-summary";
import { PriorityActionPlan } from "@/components/priority-action-plan";
import { ArrowLeft, Loader2, ShieldAlert } from "lucide-react";
import { mockReport } from "@/lib/mock-data"; // We use this for development

// In a real app, this function would fetch from your friend's backend
// For now, it simulates a fetch and returns our mock data.
const fetchReport = async (reportId: string) => {
  console.log(`Fetching report with ID: ${reportId}...`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is where you'll eventually call the real backend:
  // const res = await fetch(`https://api.siteboost.com/reports/${reportId}`);
  // if (!res.ok) throw new Error('Report not found');
  // return res.json();
  
  // For development, we return a copy of the mock report
  return { ...mockReport, id: reportId };
};

export default function ReportPage() {
  const params = useParams();
  const reportId = params.reportId as string;

  const { data: report, isLoading, isError, error } = useQuery({
    queryKey: ['report', reportId],
    queryFn: () => fetchReport(reportId),
    enabled: !!reportId, // Only run the query if reportId is available
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <p className="text-muted-foreground">Analyzing your report...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="flex justify-center items-center h-64">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold">Report not found</h1>
        <p className="text-destructive">
          Error: {error?.message || "This report could not be loaded."}
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }
  
  // Once data is loaded, we can render the full report
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold truncate">
          AI Report for <span className="text-primary">{report.url}</span>
        </h1>
        <p className="text-muted-foreground">
          Audited on {new Date(report.createdAt).toLocaleString()}
        </p>
      </header>

      <main className="space-y-8">
        {/* The main AI-powered sections */}
        <ExecutiveSummary summary={report.aiData.executiveSummary} />
        <PriorityActionPlan plan={report.aiData.priorityActionPlan} />
        
        {/* The detailed score breakdown */}
        <ScoreGauges scores={report.scores} />
      </main>
    </div>
  );
}