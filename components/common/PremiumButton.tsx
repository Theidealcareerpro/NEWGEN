"use client"

import { ReactNode, ButtonHTMLAttributes } from "react"
import clsx from "clsx"

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary"
}

export default function PremiumButton({
  children,
  variant = "primary",
  type = "button",
  className,
  ...props
}: PremiumButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all shadow-sm"
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed",
  }

  return (
    <button
      type={type}
      className={clsx(base, variants[variant], className)}
      {...props} // ✅ now supports disabled, onClick, etc.
    >
      {children}
    </button>
  )
}
