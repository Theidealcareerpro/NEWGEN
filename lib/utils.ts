// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple soft fingerprint (browser + screen info)
// Used to enforce quotas in Supabase and deployments
export function getFingerprint(): string {
  if (typeof window === "undefined") return "server"
  const str = `${navigator.userAgent}-${navigator.language}-${screen.width}x${screen.height}`
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return `fp-${Math.abs(hash)}`
}
