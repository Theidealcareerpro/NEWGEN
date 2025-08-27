// components/portfolio/PortfolioTemplateClassic.tsx
"use client"

import Image from "next/image"
import {
  Mail,
  Phone,
  Download,
  Linkedin,
  Link as LinkIcon,
  Star,
  Briefcase,
  Cpu,
  Code,
  Globe,
  Database,
  Palette,
  BookOpen,
} from "lucide-react"
import type { PortfolioData } from "@/lib/portfolio-types"

interface PortfolioTemplateClassicProps {
  data: PortfolioData
}

const skillIcons = [Cpu, Code, Globe, Database, Palette, BookOpen]

export default function PortfolioTemplateClassic({ data }: PortfolioTemplateClassicProps) {
  return (
    <div className="font-lora bg-slate-950 text-slate-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-slate-900/80 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-xl font-semibold text-amber-400 tracking-wide">
            {data.fullName || "Your Name"}
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {["Home", "About", "Skills", "Projects", "Resume", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-amber-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col items-center text-center py-32 px-6 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/20 rounded-full blur-3xl opacity-40" />
        {data.photoDataUrl && (
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 blur-lg opacity-70 animate-pulse" />
            <Image
              src={data.photoDataUrl}
              alt={`${data.fullName}'s profile picture`}
              width={220}
              height={220}
              unoptimized
              className="relative h-56 w-56 rounded-full object-cover border-4 border-amber-400 shadow-xl transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <h1 className="mt-8 text-5xl font-semibold tracking-tight drop-shadow-sm">
          {data.fullName || "Your Name"}
        </h1>
        <p className="mt-2 text-xl text-slate-300">{data.role || "Your Role"}</p>
        {data.tagline && (
          <p className="mt-3 max-w-2xl text-slate-400 italic">{data.tagline}</p>
        )}
        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          {data.cvFileDataUrl && (
            <a
              href={data.cvFileDataUrl}
              download={data.cvFileName ?? "cv.pdf"}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 shadow-lg transition-transform hover:scale-105 duration-200"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold border border-slate-600 hover:border-amber-400 hover:text-amber-400 transition duration-200"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          )}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6">
        {/* About Section */}
        {data.about && (
          <section
            id="about"
            className="my-24 p-10 rounded-2xl bg-slate-900 shadow-xl border border-slate-800"
          >
            <h2 className="text-3xl font-semibold mb-6 text-amber-400 flex items-center gap-2">
              <Star className="w-6 h-6" /> About Me
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed text-justify">
              {data.about}
            </p>
          </section>
        )}

        {/* Skills Section */}
        {data.skills.filter(Boolean).length > 0 && (
          <section
            id="skills"
            className="my-24 py-16 bg-slate-900 rounded-2xl shadow-inner border border-slate-800"
          >
            <h2 className="text-3xl font-semibold mb-12 text-center text-amber-400 flex items-center justify-center gap-2">
              <Briefcase className="w-6 h-6" /> Expertise
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
              {data.skills.filter(Boolean).map((skill, i) => {
                const Icon = skillIcons[i % skillIcons.length]
                return (
                  <div
                    key={`${skill}-${i}`}
                    className="flex flex-col items-center p-8 rounded-xl border border-slate-700 bg-slate-800 shadow-lg hover:shadow-amber-400/30 hover:-translate-y-1 transition duration-200 group"
                  >
                    <div className="p-4 rounded-full bg-slate-700 text-amber-400 mb-4 group-hover:bg-amber-400 group-hover:text-slate-900 transition-transform group-hover:scale-110 duration-200">
                      <Icon className="w-7 h-7" />
                    </div>
                    <p className="font-semibold text-slate-200">{skill}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects.filter((p) => p.name.trim() || p.description.trim()).length > 0 && (
          <section
            id="projects"
            className="my-24 py-16 bg-slate-900 rounded-2xl shadow-xl border border-slate-800"
          >
            <h2 className="text-3xl font-semibold mb-12 text-center text-amber-400">
              Projects
            </h2>
            <div className="space-y-8 max-w-4xl mx-auto">
              {data.projects.map((p, i) => {
                const visible = p.name.trim() || p.description.trim()
                if (!visible) return null
                return (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-start gap-6 p-8 rounded-xl border border-slate-700 bg-slate-800 shadow-lg hover:shadow-amber-400/30 hover:-translate-y-1 transition duration-200"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-full bg-slate-700 text-amber-400 shadow-md">
                        <LinkIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-slate-100">
                        {p.name || "Untitled Project"}
                      </h3>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-amber-400 hover:underline inline-flex items-center gap-1 mt-1"
                        >
                          <LinkIcon className="w-3 h-3" /> Visit Project
                        </a>
                      )}
                      {p.description && (
                        <p className="mt-3 text-slate-300 text-justify">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Resume Section */}
        {(data.cvUrl || data.cvFileDataUrl) && (
          <section
            id="resume"
            className="my-24 text-center py-16 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-semibold mb-6">Resume</h2>
            <a
              href={data.cvUrl || data.cvFileDataUrl}
              download={data.cvFileName || "resume.pdf"}
              className="inline-block px-10 py-4 rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 font-semibold shadow-lg transition-transform hover:scale-105 duration-200"
            >
              Download Resume
            </a>
          </section>
        )}

        {/* Contact Section */}
        <section
          id="contact"
          className="my-24 py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl"
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-400">Get in Touch</h2>
          <div className="space-y-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center justify-center gap-2 hover:text-amber-400 transition duration-200"
              >
                <Mail className="w-4 h-4" /> {data.email}
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center justify-center gap-2 hover:text-amber-400 transition duration-200"
              >
                <Phone className="w-4 h-4" /> {data.phone}
              </a>
            )}
          </div>
          {data.socials.filter((s) => s.label.trim() && s.url.trim()).length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {data.socials.map((s, i) =>
                s.label.trim() && s.url.trim() ? (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md border border-slate-700 hover:border-amber-400 hover:text-amber-400 transition duration-200 text-sm shadow-sm"
                  >
                    {s.label}
                  </a>
                ) : null
              )}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-800">
        © {new Date().getFullYear()} {data.fullName || "Your Name"} — All Rights Reserved
      </footer>
    </div>
  )
}
