import Link from "next/link"
import { UserCircleIcon } from "@heroicons/react/24/outline"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/70 dark:border-white/10 py-10 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <UserCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            TheIdealProGen
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Generate & ship a professional presence — CV, Cover Letter, and GitHub-hosted portfolio — in minutes.
          </p>
        </div>

        {/* Build */}
        <div>
          <h4 className="font-semibold">Build</h4>
          <ul className="mt-2 space-y-1">
            <li><Link href="/cv" className="hover:underline">CV Builder</Link></li>
            <li><Link href="/cover-letter" className="hover:underline">Cover Letter</Link></li>
            <li><Link href="/portfolio" className="hover:underline">E-Portfolio</Link></li>
            <li><Link href="/sample-cv.pdf" target="_blank" className="hover:underline">Sample CV</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-2 space-y-1">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/support" className="hover:underline">Support</Link></li>
            <li><Link href="/upgrade" className="hover:underline">Upgrade</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold">Legal</h4>
          <ul className="mt-2 space-y-1">
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} TheIdealProGen. All rights reserved.
      </div>
    </footer>
  )
}
