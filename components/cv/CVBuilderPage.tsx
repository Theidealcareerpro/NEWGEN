// components/cv/CVBuilderPage.tsx
"use client"

import { useEffect, useState } from "react"
import CVForm from "@/components/builder/CVForm"
import CVPreview from "@/components/preview/CVPreview"
import CVDownloadWrapper from "@/components/pdf/CVDownloadWrapper"
import { CVData } from "@/lib/types"
import { sampleCV } from "@/lib/sampleData"

export default function CVBuilderPage() {
  const [cvData, setCVData] = useState<CVData>(sampleCV)

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cvData")
    if (saved) {
      try {
        setCVData(JSON.parse(saved))
      } catch {
        setCVData(sampleCV)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData))
  }, [cvData])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 bg-clip-text text-transparent">
          Build Your Professional CV
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form side */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 overflow-y-auto max-h-[80vh]">
            <CVForm cvData={cvData} setCVData={setCVData} />
          </div>

          {/* Preview + Download side */}
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 overflow-y-auto max-h-[70vh]">
              <CVPreview data={cvData} />
            </div>
            <CVDownloadWrapper data={cvData} />
          </div>
        </div>
      </div>
    </div>
  )
}
