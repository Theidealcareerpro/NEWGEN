"use client"

import { useState, useMemo } from "react"
import { type PortfolioData } from "@/lib/portfolio-types"
import { getFingerprint } from "@/lib/utils"

interface DeployButtonProps {
  data: PortfolioData
}

export default function DeployButton({ data }: DeployButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successUrl, setSuccessUrl] = useState<string | null>(null)

  const fingerprint = useMemo(() => getFingerprint(), [])
  const shortFp = useMemo(() => fingerprint.slice(0, 12), [fingerprint])

  async function handleDeploy() {
    setLoading(true)
    setError(null)
    setSuccessUrl(null)

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          fingerprint,
          templateId: data.templateId || "classic",
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

  const BMC_URL =
    process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL ||
    "https://www.buymeacoffee.com/your-handle"

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

      {/* 🧡 Supporter hint to extend hosting (ties into the GitHub Action sync) */}
      <div className="mt-3 rounded-md border border-amber-300/60 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
        <div className="font-semibold mb-1">Need longer hosting?</div>
        <p>
          Support from <strong>£5</strong> and include this code in your message to
          extend hosting by 30 days:
        </p>
        <code className="inline-block mt-1 px-2 py-1 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-100">
          {shortFp}
        </code>
        <div className="mt-2">
          <a
            href={BMC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Open Buy Me a Coffee
          </a>
        </div>
      </div>
    </div>
  )
}
