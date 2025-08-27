import "./../styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TheIdealProGen",
  description: "Free CV, Cover Letter & e-Portfolio builder with GitHub Pages deploy",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  )
}
