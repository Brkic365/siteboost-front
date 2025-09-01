// app/api/mock-lighthouse/route.ts
import { NextResponse } from "next/server";

// This is a simplified, mock Lighthouse JSON response.
const mockLighthouseResult = {
  categories: {
    performance: { score: Math.random() * 0.6 + 0.4, title: "Performance" }, // score between 0.4 and 1.0
    accessibility: { score: Math.random() * 0.2 + 0.8, title: "Accessibility" },
    "best-practices": { score: Math.random() * 0.1 + 0.9, title: "Best Practices" },
    seo: { score: Math.random() * 0.1 + 0.9, title: "SEO" },
  },
  audits: {
    "speed-index": {
      title: "Speed Index",
      score: 0.85,
      displayValue: "1.5 s",
      description: "Speed Index shows how quickly the contents of a page are visibly populated.",
    },
    "largest-contentful-paint": {
        title: "Largest Contentful Paint",
        score: 0.75,
        displayValue: "2.1 s",
        description: "LCP marks the time at which the largest text or image is painted.",
    },
    "uses-responsive-images": {
        title: "Properly size images",
        score: 0.5,
        displayValue: "Potential savings of 250kb",
        description: "Serve images that are appropriately-sized to save cellular data and improve load time.",
    },
  },
};

export async function POST(req: Request) {
  // We're just returning a mock response to simulate the real API
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
  return NextResponse.json(mockLighthouseResult);
}