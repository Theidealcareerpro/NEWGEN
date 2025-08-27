// components/portfolio/PortfolioBuilderPage.tsx
"use client"

import { useEffect, useState } from "react"
import {
  EMPTY_PORTFOLIO,
  sanitizePortfolio,
  type PortfolioData,
} from "@/lib/portfolio-types"
import PortfolioForm from "@/components/portfolio/PortfolioForm"
import DeployButton from "@/components/portfolio/DeployButton"
import TemplateGallery from "@/components/portfolio/TemplateGallery"
import Header from "@/components/Layout/Header"
import Footer from "@/components/Layout/Footer"

import { STATS } from "@/lib/stats"
import AnimatedCounter from "@/components/common/AnimatedCounter"
import Testimonials from "@/components/common/Testimonials"
import PremiumButton from "@/components/common/PremiumButton"
import Skeleton from "@/components/common/Skeleton"

import { ArrowPathIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"

const STORAGE_KEY = "portfolioData"

export default function PortfolioBuilderPage() {
  const [data, setData] = useState<PortfolioData>(EMPTY_PORTFOLIO)
  const [loading, setLoading] = useState(true)

  // Load saved portfolio from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setData(sanitizePortfolio(JSON.parse(saved)))
      } catch {
        console.error("Invalid saved portfolio data")
      }
    }
    const t = setTimeout(() => setLoading(false), 600) // simulate loading delay
    return () => clearTimeout(t)
  }, [])

  // Persist portfolio changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-white py-10">
        <div className="mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-6">
          {/* === FORM PANEL === */}
          <div className="lg:w-1/3 bg-white dark:bg-zinc-800 rounded-xl shadow-md flex flex-col">
            <div className="p-4 text-sm text-gray-600 dark:text-gray-300 border-b">
              Fill in your details — changes update instantly.
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <PortfolioForm data={data} setData={setData} />
            </div>
            <div className="p-4 border-t flex gap-2">
              {/* 🔹 DeployButton handles fingerprint + calls /api/deploy */}
              <PremiumButton variant="primary">
                <CloudArrowUpIcon className="h-5 w-5" />
                <DeployButton data={data} />
              </PremiumButton>
              <PremiumButton
                variant="secondary"
                onClick={() => setData(EMPTY_PORTFOLIO)}
              >
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
                  <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-gray-400 text-sm">Portfolio Preview</span>
                <div />
              </div>

              {/* Preview window */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-b-xl h-[80vh] overflow-y-auto">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                ) : (
                  <TemplateGallery data={data} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* === COUNTERS === */}
        <section className="mt-20">
          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-center">
            <AnimatedCounter value={STATS.cv} label="CVs Generated" />
            <AnimatedCounter
              value={STATS.coverLetter}
              label="Cover Letters Built"
            />
            <AnimatedCounter
              value={STATS.portfolio}
              label="Portfolios Published"
            />
          </div>
        </section>

        {/* === TESTIMONIALS === */}
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
