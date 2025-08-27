// components/portfolio/PortfolioTemplateMinimal.tsx
"use client"

import Image from "next/image"
import {
  Briefcase,
  BarChart3,
  Code,
  BookOpen,
  Lightbulb,
  Users,
  Database,
  PieChart,
  Rocket,
  Laptop,
  TrendingUp,
  Link as LinkIcon,
  Mail,
  Phone,
  Linkedin,
  Download,
} from "lucide-react"
import type { PortfolioData } from "@/lib/portfolio-types"

const defaultSkillIcons = [Briefcase, BarChart3, Code, BookOpen, Lightbulb, Users]
const defaultProjectIcons = [Briefcase, Database, PieChart, Rocket, Laptop, TrendingUp]

export default function PortfolioTemplateMinimal({ data }: { data: PortfolioData }) {
  return (
    <div className="font-sans bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 min-h-screen">
      {/* ===== NAVIGATION ===== */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-950 to-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-300">{data.fullName || "Your Name"}</div>
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#home" className="hover:text-gray-100">Home</a>
            <a href="#about" className="hover:text-gray-100">About</a>
            <a href="#skills" className="hover:text-gray-100">Skills</a>
            <a href="#projects" className="hover:text-gray-100">Projects</a>
            <a href="#resume" className="hover:text-gray-100">Resume</a>
            <a href="#contact" className="hover:text-gray-100">Contact</a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="h-[85vh] flex flex-col items-center justify-center text-center px-6 
                   bg-gradient-to-r from-gray-950 via-gray-800 to-gray-700"
      >
        {data.photoDataUrl ? (
          <Image
            src={data.photoDataUrl}
            alt={data.fullName}
            width={180}
            height={180}
            unoptimized
            className="w-44 h-44 rounded-full object-cover mb-6
                       ring-4 ring-gray-500 shadow-lg hover:ring-gray-300 transition"
          />
        ) : (
          <div className="w-44 h-44 mb-6 rounded-full bg-gray-600 ring-4 ring-gray-500" />
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100">
          {data.fullName || "Your Name"} {data.role ? `| ${data.role}` : ""}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-400">
          {data.tagline || "Delivering expertise with simplicity and clarity"}
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          {data.cvFileDataUrl && (
            <a
              href={data.cvFileDataUrl}
              download={data.cvFileName ?? "cv.pdf"}
              className="px-6 py-3 rounded-full bg-gray-700 text-gray-100 font-medium shadow-md 
                         hover:bg-gray-600 transition"
            >
              <Download className="inline w-4 h-4 mr-2" /> Download CV
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-gray-500 text-gray-400 font-medium shadow-md
                         hover:bg-gray-600 hover:text-gray-100 transition"
            >
              <Linkedin className="inline w-4 h-4 mr-2" /> LinkedIn
            </a>
          )}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      {data.about && (
        <section id="about" className="max-w-5xl mx-auto py-20 px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-100 border-b border-gray-600 pb-2">
            About Me
          </h2>
          <p className="text-lg leading-relaxed text-justify text-gray-300">{data.about}</p>
        </section>
      )}

      {/* ===== SKILLS ===== */}
      {data.skills.filter(Boolean).length > 0 && (
        <section id="skills" className="bg-gray-850 py-20 px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Expertise</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
            {data.skills.map((s, i) => {
              if (!s) return null
              const Icon = defaultSkillIcons[i % defaultSkillIcons.length]
              return (
                <div
                  key={`${s}-${i}`}
                  className="p-6 rounded-lg bg-gray-700 text-center shadow-md hover:scale-105 transform transition"
                >
                  <Icon className="w-8 h-8 mb-3 text-gray-400 mx-auto" />
                  <p className="font-medium">{s}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ===== PROJECTS ===== */}
      {data.projects.filter((p) => p.name.trim() || p.description.trim()).length > 0 && (
        <section id="projects" className="max-w-6xl mx-auto py-20 px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {data.projects.map((p, i) => {
              if (!p.name.trim() && !p.description.trim()) return null
              const Icon = defaultProjectIcons[i % defaultProjectIcons.length]
              return (
                <div
                  key={i}
                  className="p-6 rounded-lg bg-gray-700 shadow-lg hover:scale-[1.02] transform transition"
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-10 h-10 text-gray-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      {p.description && (
                        <p className="mt-2 text-justify text-gray-300">{p.description}</p>
                      )}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-100 mt-2"
                        >
                          <LinkIcon size={16} /> Visit
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ===== CONTACT ===== */}
      <section id="contact" className="bg-gray-850 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">Contact</h2>
        <div className="flex justify-center gap-6 flex-wrap text-lg">
          {data.email && (
            <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-gray-100">
              <Mail className="w-5 h-5" /> {data.email}
            </a>
          )}
          {data.phone && (
            <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-gray-100">
              <Phone className="w-5 h-5" /> {data.phone}
            </a>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-950 text-gray-500 text-center py-6">
        <p>© {new Date().getFullYear()} {data.fullName || "Your Name"} | Professional Portfolio</p>
      </footer>
    </div>
  )
}
