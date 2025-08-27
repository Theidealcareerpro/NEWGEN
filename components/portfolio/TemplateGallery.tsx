// components/portfolio/TemplateGallery.tsx
"use client"

import { useEffect, useState } from "react"
import type { PortfolioData } from "@/lib/portfolio-types"

import PortfolioTemplateModern from "@/components/portfolio/PortfolioTemplateModern"
import PortfolioTemplateClassic from "@/components/portfolio/PortfolioTemplateClassic"
import PortfolioTemplateMinimal from "@/components/portfolio/PortfolioTemplateMinimal"

type TemplateId = "modern" | "classic" | "minimal"

const TEMPLATE_OPTIONS: { id: TemplateId; label: string }[] = [
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "minimal", label: "Minimal" },
]

export default function TemplateGallery({ data }: { data: PortfolioData }) {
  const [selected, setSelected] = useState<TemplateId>("modern")

  useEffect(() => {
    if (data.templateId && ["modern", "classic", "minimal"].includes(data.templateId)) {
      setSelected(data.templateId as TemplateId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full space-y-4">
      {/* Template selector */}
      <div className="flex gap-2">
        {TEMPLATE_OPTIONS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`px-4 py-2 text-sm rounded-md border transition ${
              selected === t.id
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Template preview */}
      <div className="rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden">
        {selected === "modern" && <PortfolioTemplateModern data={data} />}
        {selected === "classic" && <PortfolioTemplateClassic data={data} />}
        {selected === "minimal" && <PortfolioTemplateMinimal data={data} />}
      </div>
    </div>
  )
}
