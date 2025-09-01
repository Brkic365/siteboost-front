// components/actionable-insights.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

// A simplified type for the audit items we care about
interface Audit {
  id: string
  title: string
  description: string
  score: number | null
  displayValue?: string
}

export function ActionableInsights({ rawData }: { rawData: any }) {
  // Find audits that are opportunities (score < 0.9 and not null)
  const opportunities = Object.values(rawData.audits as Record<string, Audit>)
    .filter(audit => audit.score !== null && audit.score < 0.9)
    .sort((a, b) => (a.score ?? 1) - (b.score ?? 1)) // Sort by lowest score first
    .slice(0, 5) // Take the top 5

  if (opportunities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>What to Fix First</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Great job! No major opportunities were found in this audit.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>What to Fix First</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((audit) => (
            <div key={audit.id} className="p-4 border rounded-md">
              <h3 className="font-semibold">{audit.title}</h3>
              {audit.displayValue && (
                <p className="text-sm font-mono text-amber-500">{audit.displayValue}</p>
              )}
              {/* Using dangerouslySetInnerHTML because Lighthouse descriptions can contain markdown links */}
              <p 
                className="text-sm text-muted-foreground mt-1"
                dangerouslySetInnerHTML={{ __html: audit.description.replace(/\[Learn more\]\(.*\)/, '') }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}