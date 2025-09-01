'use client';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ExecutiveSummaryProps {
  summary: {
    overallGrade: string;
    headline: string;
    summaryParagraph: string;
  };
}

const getGradeColor = (grade: string) => {
  if (['A+', 'A', 'A-'].includes(grade)) return "text-green-500";
  if (['B+', 'B', 'B-'].includes(grade)) return "text-yellow-500";
  if (['C+', 'C', 'C-'].includes(grade)) return "text-orange-500";
  return "text-red-500";
};

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  if (!summary) return null;

  return (
    <Card className="bg-card border-primary ring-2 ring-primary">
      <CardHeader>
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-4">
          <CardTitle className="text-2xl">{summary.headline}</CardTitle>
          <div className={`text-5xl font-bold ${getGradeColor(summary.overallGrade)} shrink-0`}>
            {summary.overallGrade}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground">{summary.summaryParagraph}</p>
      </CardContent>
    </Card>
  );
}