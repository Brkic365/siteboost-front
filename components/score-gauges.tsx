// components/score-gauges.tsx
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface ScoreGaugesProps {
  scores: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
}

const getScoreColor = (score: number) => {
  if (score < 0.5) return "#ef4444" // red-500
  if (score < 0.9) return "#f97316" // orange-500
  return "#22c55e" // green-500
}

const Gauge = ({ title, score }: { title: string, score: number }) => {
  const percentage = Math.round(score * 100)
  const color = getScoreColor(score)
  const data = [
    { name: "Score", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ]

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: 120, height: 120, position: 'relative' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="70%"
              outerRadius="100%"
              dataKey="value"
              stroke="none"
              cornerRadius={20}
            >
              <Cell fill={color} />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>{percentage}</span>
        </div>
      </div>
      <p className="mt-2 font-medium">{title}</p>
    </div>
  )
}


export function ScoreGauges({ scores }: ScoreGaugesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Gauge title="Performance" score={scores.performance} />
          <Gauge title="Accessibility" score={scores.accessibility} />
          <Gauge title="Best Practices" score={scores.bestPractices} />
          <Gauge title="SEO" score={scores.seo} />
        </div>
      </CardContent>
    </Card>
  )
}