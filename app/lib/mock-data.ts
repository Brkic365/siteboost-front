// This file acts as our "fake backend" during frontend development.
// It provides the data structure we agreed upon in our API Contract.

export const mockReport = {
  id: "clg2p4f7h0000t2x1h3c9d7g4",
  url: "https://example.com",
  createdAt: "2023-10-28T10:00:00Z",
  scores: {
    performance: 0.85,
    accessibility: 0.92,
    bestPractices: 0.98,
    seo: 1.0,
  },
  aiData: {
    executiveSummary: {
      overallGrade: "A-",
      headline: "Excellent SEO with minor performance opportunities.",
      summaryParagraph: "Your site is well-optimized for search engines and follows best practices. We've identified 2 high-impact issues related to image optimization that could make your site even faster for mobile users.",
    },
    priorityActionPlan: [
      {
        title: "Optimize and Compress Images",
        impact: "High",
        effort: "Low",
        whyItMatters: "Large images are the single biggest reason your site is slow, especially on mobile. Studies show that a 1-second delay can result in a 7% reduction in conversions.",
        howToFix_ManagerView: "Ask your developer or designer to compress the images listed in the technical details. Aim for WebP format and ensure no image is larger than 200kb.",
        howToFix_DeveloperView: "The image `hero-banner.jpg` (1.8 MB) should be optimized. Convert it to WebP and implement responsive images using `<picture>` or `srcset`.",
      },
      {
        title: "Leverage Browser Caching",
        impact: "Medium",
        effort: "Medium",
        whyItMatters: "By caching static assets like logos and CSS files, you can dramatically speed up the experience for repeat visitors.",
        howToFix_ManagerView: "Ask your developer to implement a caching policy on the server for static assets.",
        howToFix_DeveloperView: "Configure your server (e.g., Nginx, Apache) or CDN to set a `Cache-Control: max-age=31536000` header for static file types (jpg, png, css, js).",
      },
      {
        title: "Add Alt Text to Images",
        impact: "Medium",
        effort: "Low",
        whyItMatters: "Alternative text is crucial for accessibility, allowing screen readers to describe images to visually impaired users. It's also a factor in SEO.",
        howToFix_ManagerView: "Review key images on the site and provide descriptive alt text for them, particularly for images that convey information.",
        howToFix_DeveloperView: "Ensure all `<img>` tags have a descriptive `alt` attribute. For decorative images, use an empty `alt=\"\"` attribute.",
      },
    ],
  },
};

// Mock data for the history table
export const mockReportHistory = [
  {
    id: "rep1",
    url: "https://vercel.com",
    performanceScore: 0.95,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rep2",
    url: "https://nextjs.org",
    performanceScore: 0.88,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "rep3",
    url: "https://tailwindcss.com",
    performanceScore: 0.91,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];