// components/portfolio/PortfolioTemplateModern.tsx
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

export default function PortfolioTemplateModern({ data }: { data: PortfolioData }) {
  return (
    <div className="font-serif bg-gradient-to-b from-[#1c2526] to-[#2e3b3e] text-gray-100 min-h-screen">
      {/* ===== NAVIGATION ===== */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0a1c3a] to-[#2b3a5c] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-400">{data.fullName || "Your Name"}</div>
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#home" className="hover:text-yellow-400">Home</a>
            <a href="#about" className="hover:text-yellow-400">About</a>
            <a href="#skills" className="hover:text-yellow-400">Skills</a>
            <a href="#projects" className="hover:text-yellow-400">Projects</a>
            <a href="#resume" className="hover:text-yellow-400">Resume</a>
            <a href="#contact" className="hover:text-yellow-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden 
                   bg-gradient-to-r from-[#0a1c3a] via-[#2b3a5c] to-[#c9982f] bg-[length:400%_400%] animate-[gradientShift_12s_ease_infinite]"
      >
        {data.photoDataUrl ? (
          <Image
            src={data.photoDataUrl}
            alt={data.fullName}
            width={200}
            height={200}
            unoptimized
            className="w-48 h-48 rounded-full object-cover mb-6
                       ring-4 ring-yellow-400 ring-offset-4 ring-offset-[#1c2526]
                       hover:ring-[#c9982f] transition duration-500 shadow-2xl"
          />
        ) : (
          <div className="w-48 h-48 mb-6 rounded-full bg-gray-600 ring-4 ring-yellow-400 ring-offset-4 ring-offset-[#1c2526]" />
        )}
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          {data.fullName || "Your Name"} {data.role ? `| ${data.role}` : ""}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-200">
          {data.tagline || "Delivering expertise with precision and insight"}
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          {data.cvFileDataUrl && (
            <a
              href={data.cvFileDataUrl}
              download={data.cvFileName ?? "cv.pdf"}
              className="px-6 py-3 rounded-full bg-yellow-400 text-[#0a1c3a] font-semibold shadow-lg 
                         hover:bg-[#c9982f] hover:text-white transition"
            >
              <Download className="inline w-4 h-4 mr-2" /> Download CV
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-yellow-400 text-yellow-400 font-semibold shadow-lg
                         hover:bg-yellow-400 hover:text-[#0a1c3a] transition"
            >
              <Linkedin className="inline w-4 h-4 mr-2" /> LinkedIn
            </a>
          )}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      {data.about && (
        <section id="about" className="max-w-5xl mx-auto py-20 px-6">
          <h2 className="text-3xl font-bold mb-6 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-24 after:h-1 after:bg-gradient-to-r from-yellow-400 to-[#c9982f]">
            About Me
          </h2>
          <p className="text-lg leading-relaxed text-justify">{data.about}</p>
        </section>
      )}

      {/* ===== SKILLS ===== */}
      {data.skills.filter(Boolean).length > 0 && (
        <section id="skills" className="bg-[#2e3b3e] py-20 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Expertise</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
            {data.skills.map((s, i) => {
              if (!s) return null
              const Icon = defaultSkillIcons[i % defaultSkillIcons.length]
              return (
                <div
                  key={`${s}-${i}`}
                  className="p-6 rounded-lg bg-[#4a5568] text-center shadow-md hover:scale-105 transform transition"
                >
                  <Icon className="w-8 h-8 mb-3 text-yellow-400 mx-auto" />
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
          <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {data.projects.map((p, i) => {
              if (!p.name.trim() && !p.description.trim()) return null
              const Icon = defaultProjectIcons[i % defaultProjectIcons.length]
              return (
                <div
                  key={i}
                  className="p-6 rounded-lg bg-[#4a5568] shadow-lg hover:scale-[1.02] transform transition"
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-10 h-10 text-yellow-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      {p.description && (
                        <p className="mt-2 text-justify text-gray-200">{p.description}</p>
                      )}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-yellow-400 hover:underline mt-2"
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
      <section id="contact" className="bg-[#2e3b3e] py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
        <div className="flex justify-center gap-6 flex-wrap text-lg">
          {data.email && (
            <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-yellow-400">
              <Mail className="w-5 h-5" /> {data.email}
            </a>
          )}
          {data.phone && (
            <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-yellow-400">
              <Phone className="w-5 h-5" /> {data.phone}
            </a>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0a1c3a] text-gray-400 text-center py-6">
        <p>© {new Date().getFullYear()} {data.fullName || "Your Name"} | Professional Portfolio</p>
      </footer>
    </div>
  )
}

/* ===== Animations ===== */
declare global {
  interface CSSStyleDeclaration {
    ["@keyframes gradientShift"]: string
  }
}
