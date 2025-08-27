// src/components/layout/Header.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 border-b border-gray-200/60 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <UserCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold tracking-tight">TheIdealProGen</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={`hover:opacity-80 ${pathname === "/" ? "text-blue-600 font-semibold" : ""}`}>Home</Link>
          <Link href="/cv" className={`hover:opacity-80 ${pathname === "/cv" ? "text-blue-600 font-semibold" : ""}`}>CV Builder</Link>
          <Link href="/cover-letter" className={`hover:opacity-80 ${pathname === "/cover-letter" ? "text-blue-600 font-semibold" : ""}`}>Cover Letter</Link>
          <Link href="/portfolio" className={`hover:opacity-80 ${pathname === "/portfolio" ? "text-blue-600 font-semibold" : ""}`}>Portfolio</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cv"
            className="hidden sm:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium border border-gray-300 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/5"
          >
            Build CV
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Create Portfolio
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
