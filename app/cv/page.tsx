// app/cv/page.tsx
import type { Metadata } from "next"
import CVBuilderPage from "@/components/cv/CVBuilderPage"

export const metadata: Metadata = {
  title: "CV Builder | TheIdealProGen",
  description:
    "Build a professional CV instantly with TheIdealProGen. Modern templates, real-time preview, and PDF download.",
  openGraph: {
    title: "CV Builder | TheIdealProGen",
    description:
      "Build a professional CV instantly with TheIdealProGen. Modern templates, real-time preview, and PDF download.",
    url: "https://yourdomain.com/cv",
    siteName: "TheIdealProGen",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TheIdealProGen CV Builder",
      },
    ],
    type: "website",
  },
}

export default function Page() {
  return <CVBuilderPage />
}
