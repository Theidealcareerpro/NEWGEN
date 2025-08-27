// components/cover-letter/CoverLetterPage.tsx
"use client"

import { useEffect, useState } from "react"
import { CLDData, EMPTY_CLD, sanitizeCLDData } from "@/lib/cld-types"
import CLForm from "@/components/cover-letter/CLForm"
import CLPreview from "@/components/cover-letter/CLPreview"
import CLDownloadWrapper from "@/components/pdf/CLDownloadWrapper"

import Header from "@/components/Layout/Header"
import Footer from "@/components/Layout/Footer"
import { STATS } from "@/lib/stats"
import AnimatedCounter from "@/components/common/AnimatedCounter"
import Testimonials from "@/components/common/Testimonials"
import PremiumButton from "@/components/common/PremiumButton"
import Skeleton from "@/components/common/Skeleton"

import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/24/outline"

const STORAGE_KEY = "cldData"

export default function CoverLetterPage() {
  const [data, setData] = useState<CLDData>(EMPTY_CLD)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setData(sanitizeCLDData(JSON.parse(saved)))
      } catch {
        console.error("Invalid saved cover letter data")
      }
    }
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-white py-10">
        <div className="mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-6">
          {/* === FORM PANEL === */}
          <div className="lg:w-1/3 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md sticky top-24 h-fit no-print">
            <a
              href="/sample-cover-letter.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-blue-600 hover:underline mb-4 text-center"
            >
              📄 View Sample Cover Letter (PDF)
            </a>

            <CLForm data={data} setData={setData} />

            <div className="mt-4 flex items-center gap-2">
              <PremiumButton variant="primary">
                <ArrowDownTrayIcon className="h-5 w-5" />
                <CLDownloadWrapper data={data} />
              </PremiumButton>
              <PremiumButton variant="secondary" onClick={() => setData(EMPTY_CLD)}>
                <ArrowPathIcon className="h-5 w-5" />
                Reset
              </PremiumButton>
            </div>
          </div>

          {/* === PREVIEW PANEL === */}
          <div className="lg:w-2/3">
            <div className="relative bg-gray-900 rounded-2xl p-2 shadow-xl">
              {/* MacBook top bar */}
              <div className="flex justify-between items-center px-4 py-1 bg-gray-800 rounded-t-xl">
                <div className="flex gap-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-gray-400 text-sm">Cover Letter Preview</span>
                <div />
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-b-xl p-6 h-[80vh] overflow-y-auto">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                ) : (
                  <CLPreview data={data} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* === COUNTERS === */}
        <section className="mt-20 max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-center">
          <AnimatedCounter value={STATS.cv} label="CVs Generated" />
          <AnimatedCounter value={STATS.coverLetter} label="Cover Letters Built" />
          <AnimatedCounter value={STATS.portfolio} label="Portfolios Published" />
        </section>

        {/* === TESTIMONIALS === */}
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
