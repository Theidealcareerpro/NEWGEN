"use client"

import { useEffect, ReactNode } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Header from "./Header"
import Footer from "./Footer"

interface Props {
  title: string
  children: ReactNode
}

export default function LegalLayout({ title, children }: Props) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-800 dark:text-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1
            className="text-4xl font-extrabold mb-6 text-center"
            data-aos="fade-up"
          >
            {title}
          </h1>
          <p
            className="text-center text-gray-600 dark:text-gray-400 mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div
            className="prose dark:prose-invert max-w-none space-y-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
