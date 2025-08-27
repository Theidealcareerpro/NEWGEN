// app/cover-letter/page.tsx
import type { Metadata } from "next"
import CoverLetterPage from "@/components/cover-letter/CoverLetterPage"

export const metadata: Metadata = {
  title: "Cover Letter Builder | TheIdealProGen",
  description:
    "Craft personalized cover letters instantly with TheIdealProGen. Real-time preview, modern styles, and PDF export.",
  openGraph: {
    title: "Cover Letter Builder | TheIdealProGen",
    description:
      "Craft personalized cover letters instantly with TheIdealProGen. Real-time preview, modern styles, and PDF export.",
    url: "https://yourdomain.com/cover-letter",
    siteName: "TheIdealProGen",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TheIdealProGen Cover Letter Builder",
      },
    ],
    type: "website",
  },
}

export default function Page() {
  return <CoverLetterPage />
}
