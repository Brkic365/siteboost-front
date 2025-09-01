// app/api/audit/route.ts
import { NextResponse } from "next/server";
import { mockReport } from "@/lib/mock-data"; // Import your mock data

export async function POST(req: Request) {
  const body = await req.json();
  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Return a copy of the mock report with the requested URL
  const responseData = { ...mockReport, url, id: crypto.randomUUID() };

  return NextResponse.json(responseData, { status: 201 });
}