// lib/portfolio-types.ts
export type Theme = "blue" | "emerald" | "rose"
export type FontChoice = "inter" | "lora" | "roboto"
export type TemplateId = "modern" | "classic" | "minimal"

export type PortfolioProject = {
  name: string
  link?: string
  description: string
}

export type PortfolioSocial = {
  label: string
  url: string
}

export interface PortfolioData {
  fullName: string
  role: string
  tagline: string
  location: string
  email: string
  phone: string
  linkedin: string
  about: string
  skills: string[]
  projects: PortfolioProject[]
  socials: PortfolioSocial[]
  theme: Theme
  font: FontChoice
  templateId: TemplateId
  photoDataUrl?: string
  cvUrl?: string
  cvFileDataUrl?: string
  cvFileName?: string
}

export const EMPTY_PORTFOLIO: PortfolioData = {
  fullName: "",
  role: "",
  tagline: "",
  location: "",
  email: "",
  phone: "",
  linkedin: "",
  about: "",
  skills: [""],
  projects: [{ name: "", link: "", description: "" }],
  socials: [{ label: "", url: "" }],
  theme: "blue",
  font: "inter",
  templateId: "modern",
  photoDataUrl: "",
  cvUrl: "",
  cvFileDataUrl: undefined,
  cvFileName: undefined,
}

// --- sanitizers ---
function asString(x: unknown, fallback = ""): string {
  return typeof x === "string" ? x : fallback
}

function sanitizeSkills(x: unknown): string[] {
  if (!Array.isArray(x)) return [""]
  return x.map((s) => (typeof s === "string" ? s : ""))
}

function sanitizeProjects(x: unknown): PortfolioProject[] {
  if (!Array.isArray(x)) return [{ name: "", link: "", description: "" }]
  return x.map((p) => {
    const o = (typeof p === "object" && p !== null) ? (p as Record<string, unknown>) : {}
    return {
      name: asString(o.name),
      link: asString(o.link, ""),
      description: asString(o.description),
    }
  })
}

function sanitizeSocials(x: unknown): PortfolioSocial[] {
  if (!Array.isArray(x)) return [{ label: "", url: "" }]
  return x.map((s) => {
    const o = (typeof s === "object" && s !== null) ? (s as Record<string, unknown>) : {}
    return {
      label: asString(o.label),
      url: asString(o.url),
    }
  })
}

function sanitizeTheme(x: unknown): Theme {
  return x === "emerald" || x === "rose" ? x : "blue"
}

function sanitizeFont(x: unknown): FontChoice {
  return x === "lora" || x === "roboto" ? x : "inter"
}

function sanitizeTemplate(x: unknown): TemplateId {
  return x === "classic" || x === "minimal" ? x : "modern"
}

export function sanitizePortfolio(raw: unknown): PortfolioData {
  if (typeof raw !== "object" || raw === null) return { ...EMPTY_PORTFOLIO }
  const o = raw as Record<string, unknown>

  return {
    fullName: asString(o.fullName),
    role: asString(o.role),
    tagline: asString(o.tagline),
    location: asString(o.location),
    email: asString(o.email),
    phone: asString(o.phone),
    linkedin: asString(o.linkedin),
    about: asString(o.about),
    skills: sanitizeSkills(o.skills),
    projects: sanitizeProjects(o.projects),
    socials: sanitizeSocials(o.socials),
    theme: sanitizeTheme(o.theme),
    font: sanitizeFont(o.font),
    templateId: sanitizeTemplate(o.templateId),
    photoDataUrl: asString(o.photoDataUrl, ""),
    cvUrl: asString(o.cvUrl, ""),
    cvFileDataUrl: asString(o.cvFileDataUrl, "") || undefined,
    cvFileName: asString(o.cvFileName, "") || undefined,
  }
}
