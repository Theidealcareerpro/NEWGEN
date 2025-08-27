// lib/cld-types.ts
import { Theme, FontChoice } from "./types"

export type CLDData = {
  // Applicant
  applicantName: string
  applicantLocation: string
  applicantEmail: string
  applicantPhone: string
  applicantLinkedIn: string
  applicantPortfolio: string

  // Recipient / Meta
  recipientName: string
  recipientTitle: string
  company: string
  companyLocation: string
  roleTitle: string
  date: string

  // Letter content
  salutation: string
  intro: string
  body: string[]
  closing: string
  signOff: string
  signatureName: string

  // UI
  theme: Theme
  font: FontChoice
}

export const EMPTY_CLD: CLDData = {
  applicantName: "",
  applicantLocation: "",
  applicantEmail: "",
  applicantPhone: "",
  applicantLinkedIn: "",
  applicantPortfolio: "",

  recipientName: "",
  recipientTitle: "",
  company: "",
  companyLocation: "",
  roleTitle: "",
  date: "",

  salutation: "Dear Hiring Manager,",
  intro: "",
  body: [""],
  closing: "",
  signOff: "Sincerely,",
  signatureName: "",

  theme: "blue",
  font: "inter",
}

export function sanitizeCLDData(raw: unknown): CLDData {
  if (typeof raw !== "object" || raw === null) return EMPTY_CLD
  const data = raw as Partial<CLDData>

  return {
    ...EMPTY_CLD,
    ...data,
    body: Array.isArray(data.body) ? data.body : EMPTY_CLD.body,
    theme: (["blue", "emerald", "rose"] as const).includes(data.theme as Theme)
      ? (data.theme as Theme)
      : EMPTY_CLD.theme,
    font: (["inter", "lora", "roboto"] as const).includes(data.font as FontChoice)
      ? (data.font as FontChoice)
      : EMPTY_CLD.font,
  }
}
