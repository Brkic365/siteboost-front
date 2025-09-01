// app/api/audit/route.ts
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const auditRequestSchema = z.object({
  url: z.string().url(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const validation = auditRequestSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  
  const { url } = validation.data;
  
  try {
    // --- IMPORTANT ---
    // In a real app, you would fetch from your colleague's API.
    // We are fetching from our own mock API for this example.
    const lighthouseApiUrl = process.env.LIGHTHOUSE_API_URL!;
    const response = await fetch(lighthouseApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }), // Forward the URL
    });

    if (!response.ok) {
      throw new Error("Lighthouse API failed");
    }

    const reportData = await response.json();

    // Save the report to the database
    const newReport = await prisma.report.create({
      data: {
        url,
        userId: session.user.id,
        performanceScore: reportData.categories.performance.score,
        accessibilityScore: reportData.categories.accessibility.score,
        bestPracticesScore: reportData.categories["best-practices"].score,
        seoScore: reportData.categories.seo.score,
        rawData: reportData, // Store the full JSON
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Audit failed:", error);
    return NextResponse.json({ error: "Failed to process audit" }, { status: 500 });
  }
}