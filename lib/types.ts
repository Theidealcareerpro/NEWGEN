// lib/types.ts
export type Theme = "blue" | "emerald" | "rose"
export type FontChoice = "inter" | "lora" | "roboto"

export type ExperienceEntry = {
  company: string
  location: string
  date: string
  role: string
  description: string
  achievements: string[]
}

export type EducationEntry = {
  school: string
  degree: string
  location: string
  date: string
  details: string
}

export type CVData = {
  name: string
  location: string
  email: string
  phone: string
  linkedin: string
  portfolio: string
  summary: string
  education: EducationEntry[]
  skills: string[]
  certifications: string[]
  projects: string[]
  experience: ExperienceEntry[]
  theme: Theme
  font: FontChoice
}
