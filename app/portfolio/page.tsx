import type { Metadata } from "next"
import PortfolioBuilderPage from "@/components/portfolio/PortfolioBuilderPage"

export const metadata: Metadata = {
  title: "Portfolio Builder | TheIdealProGen",
  description:
    "Create a modern online portfolio with TheIdealProGen. Customizable templates, live preview, and one-click deploy to GitHub Pages.",
  openGraph: {
    title: "Portfolio Builder | TheIdealProGen",
    description:
      "Create a modern online portfolio with TheIdealProGen. Customizable templates, live preview, and one-click deploy to GitHub Pages.",
    url: "https://yourdomain.com/portfolio",
    siteName: "TheIdealProGen",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TheIdealProGen Portfolio Builder",
      },
    ],
    type: "website",
  },
}

export default function Page() {
  return <PortfolioBuilderPage />
}
