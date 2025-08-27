// src/app/page.tsx
import Header from "@/components/Layout/Header"
import Footer from "@/components/Layout/Footer"
import HomePage from "@/components/home/HomePage"

export const metadata = {
  title: "TheIdealProGen — Free CV, Cover Letter & Portfolio Builder",
  description:
    "Generate a professional CV, cover letter, and portfolio in minutes. Beautiful templates, real-time preview, and one-click GitHub Pages deployment — free forever.",
  keywords: [
    "CV builder",
    "resume builder",
    "cover letter generator",
    "portfolio builder",
    "free CV online",
    "GitHub portfolio",
    "TheIdealProGen",
  ],
  openGraph: {
    title: "TheIdealProGen — CV, Cover Letter & Portfolio Builder",
    description:
      "Create a professional CV, cover letter, and portfolio in minutes. Free, modern, and open-source.",
    url: "https://your-domain.com",
    siteName: "TheIdealProGen",
    images: [
      {
        url: "https://your-domain.com/og-image.png", // replace with real image
        width: 1200,
        height: 630,
        alt: "TheIdealProGen CV Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheIdealProGen — CV, Cover Letter & Portfolio Builder",
    description:
      "Free professional CV, cover letter, and portfolio generator. Real-time preview + one-click deploy.",
    images: ["https://your-domain.com/og-image.png"], // replace with real image
    creator: "@yourhandle", // optional
  },
  icons: {
    icon: "/favicon.ico", // favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function Page() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}
