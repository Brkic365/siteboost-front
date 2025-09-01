// components/report-history-table.tsx
'use client'

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react"

interface Report {
  id: string
  url: string
  performanceScore: number
  createdAt: string
}

const fetchReports = async (): Promise<Report[]> => {
  const res = await fetch('/api/reports')
  if (!res.ok) {
    throw new Error('Failed to fetch reports')
  }
  return res.json()
}

export function ReportHistoryTable() {
  const { data: reports, isLoading, isError } = useQuery({ 
    queryKey: ['reports'], 
    queryFn: fetchReports 
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader><CardTitle>Audit History</CardTitle></CardHeader>
        <CardContent className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return <Card><CardHeader><CardTitle>Audit History</CardTitle></CardHeader><CardContent><p className="text-red-500">Failed to load audit history.</p></CardContent></Card>
  }
  
  if (!reports || reports.length === 0) {
      return <Card><CardHeader><CardTitle>Audit History</CardTitle></CardHeader><CardContent><p>No audits run yet. Start by entering a URL above!</p></CardContent></Card>
  }

  return (
    <Card>
      <CardHeader><CardTitle>Audit History</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead className="text-center">Performance</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium truncate max-w-xs">{report.url}</TableCell>
                <TableCell className="text-center font-semibold">
                  {Math.round(report.performanceScore * 100)}%
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(report.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/reports/${report.id}`}>View Report</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}