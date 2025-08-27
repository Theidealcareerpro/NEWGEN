// components/portfolio/DeployButton.tsx
"use client"

import { useState } from "react"
import { type PortfolioData } from "@/lib/portfolio-types"
import { getFingerprint } from "@/lib/utils"

interface DeployButtonProps {
  data: PortfolioData
}

export default function DeployButton({ data }: DeployButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successUrl, setSuccessUrl] = useState<string | null>(null)

  async function handleDeploy() {
    setLoading(true)
    setError(null)
    setSuccessUrl(null)

    try {
      // generate/compute unique fingerprint for this browser
      const fingerprint = getFingerprint()

      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
          fingerprint,
          templateId: data.templateId || "modern",
        }),
      })

      if (!response.ok) {
        const msg = await response.text()
        throw new Error(msg || "Deployment failed")
      }

      const result: { url: string } = await response.json()
      setSuccessUrl(result.url)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1">
      <button
        type="button"
        onClick={handleDeploy}
        disabled={loading}
        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Deploying..." : "Deploy to GitHub Pages"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {successUrl && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          ✅ Deployed!{" "}
          <a
            href={successUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-700 dark:hover:text-green-300"
          >
            View your portfolio
          </a>
        </p>
      )}
    </div>
  )
}
