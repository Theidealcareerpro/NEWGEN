// components/portfolio/PortfolioForm.tsx
"use client"

import { useState, ChangeEvent } from "react"
import type { PortfolioData, PortfolioProject, PortfolioSocial } from "@/lib/portfolio-types"

interface Props {
  data: PortfolioData
  setData: (data: PortfolioData) => void
}

export default function PortfolioForm({ data, setData }: Props) {
  const [skillInput, setSkillInput] = useState("")

  // --- Handlers ---
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>, field: "photoDataUrl" | "cvFileDataUrl") {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      if (field === "photoDataUrl") {
        setData({ ...data, photoDataUrl: reader.result as string })
      } else if (field === "cvFileDataUrl") {
        setData({
          ...data,
          cvFileDataUrl: reader.result as string,
          cvFileName: file.name,
        })
      }
    }
    reader.readAsDataURL(file)
  }

  function addSkill() {
    const v = skillInput.trim()
    if (!v) return
    setData({ ...data, skills: [...data.skills, v] })
    setSkillInput("")
  }

  function removeSkill(i: number) {
    const newSkills = data.skills.filter((_, idx) => idx !== i)
    setData({ ...data, skills: newSkills })
  }

  function updateProject(i: number, key: keyof PortfolioProject, value: string) {
    const newProjects = [...data.projects]
    newProjects[i] = { ...newProjects[i], [key]: value }
    setData({ ...data, projects: newProjects })
  }

  function addProject() {
    setData({
      ...data,
      projects: [...data.projects, { name: "", description: "", link: "" }],
    })
  }

  function removeProject(i: number) {
    const newProjects = data.projects.filter((_, idx) => idx !== i)
    setData({ ...data, projects: newProjects })
  }

  function updateSocial(i: number, key: keyof PortfolioSocial, value: string) {
    const newSocials = [...data.socials]
    newSocials[i] = { ...newSocials[i], [key]: value }
    setData({ ...data, socials: newSocials })
  }

  function addSocial() {
    setData({
      ...data,
      socials: [...data.socials, { label: "", url: "" }],
    })
  }

  function removeSocial(i: number) {
    const newSocials = data.socials.filter((_, idx) => idx !== i)
    setData({ ...data, socials: newSocials })
  }

  // --- Render ---
  return (
    <form className="space-y-8">
      {/* Personal Info */}
      <Section title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="fullName" label="Full Name" value={data.fullName} onChange={handleChange} />
          <Input name="role" label="Professional Title" value={data.role} onChange={handleChange} />
          {/* ✅ New tagline field */}
          <Input name="tagline" label="Tagline" value={data.tagline} onChange={handleChange} />
          <Input name="location" label="Location" value={data.location} onChange={handleChange} />
          <Input name="email" label="Email" type="email" value={data.email} onChange={handleChange} />
          <Input name="phone" label="Phone" value={data.phone} onChange={handleChange} />
          <Input name="linkedin" label="LinkedIn URL" value={data.linkedin} onChange={handleChange} />
        </div>

        {/* Uploads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <FileInput
            label="Upload Headshot"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "photoDataUrl")}
          />
          <FileInput
            label="Upload Resume (PDF)"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e, "cvFileDataUrl")}
          />
        </div>
      </Section>

      {/* About */}
      <Section title="About Me">
        <Textarea name="about" label="Your Bio" value={data.about} onChange={handleChange} />
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. Financial Modeling"
            className="flex-grow px-3 py-2 rounded border dark:bg-zinc-900"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {data.skills.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded-full text-sm flex items-center gap-2"
            >
              {s}
              <button type="button" onClick={() => removeSkill(i)} className="text-red-500">
                ×
              </button>
            </span>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section title="Projects">
        {data.projects.map((p, i) => (
          <div key={i} className="border rounded p-4 mb-4 space-y-2">
            <Input
              label="Project Name"
              value={p.name}
              onChange={(e) => updateProject(i, "name", e.target.value)}
            />
            <Input
              label="Link"
              value={p.link ?? ""}
              onChange={(e) => updateProject(i, "link", e.target.value)}
            />
            <Textarea
              label="Description"
              value={p.description}
              onChange={(e) => updateProject(i, "description", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeProject(i)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
        >
          + Add Project
        </button>
      </Section>

      {/* Socials */}
      <Section title="Social Links">
        {data.socials.map((s, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 mb-3">
            <Input
              label="Label (e.g. Twitter, GitHub)"
              value={s.label}
              onChange={(e) => updateSocial(i, "label", e.target.value)}
            />
            <Input
              label="URL"
              value={s.url}
              onChange={(e) => updateSocial(i, "url", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeSocial(i)}
              className="text-sm text-red-500 hover:underline col-span-2 text-left"
            >
              Remove Social
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSocial}
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          + Add Social
        </button>
      </Section>
    </form>
  )
}

// --- UI Helpers ---
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  )
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{label}</label>
      <input
        {...props}
        className="px-3 py-2 rounded border dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="px-3 py-2 rounded border dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function FileInput({
  label,
  accept,
  onChange,
}: {
  label: string
  accept: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  )
}
