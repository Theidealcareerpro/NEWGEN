// components/builder/CVForm.tsx
"use client"

import { ChangeEvent } from "react"
import { CVData, EducationEntry, ExperienceEntry } from "@/lib/types"

// --- UI Helpers ---
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-zinc-900 w-full">
      <h3 className="text-lg font-semibold mb-3 text-blue-600">{title}</h3>
      {children}
    </div>
  )
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm mb-1">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 rounded border dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm mb-1">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full px-3 py-2 rounded border dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm ${props.className || ""}`}
    >
      {children}
    </button>
  )
}

// --- CV Form ---
type Props = {
  cvData: CVData
  setCVData: (data: CVData) => void
}

export default function CVForm({ cvData, setCVData }: Props) {
  // --- Generic Handlers ---
  const handleChange = (field: keyof CVData, value: string) => {
    setCVData({ ...cvData, [field]: value })
  }

  const handleEducationChange = (i: number, field: keyof EducationEntry, value: string) => {
    const updated = [...cvData.education]
    updated[i] = { ...updated[i], [field]: value }
    setCVData({ ...cvData, education: updated })
  }

  const handleExperienceChange = (i: number, field: keyof ExperienceEntry, value: string) => {
    const updated = [...cvData.experience]
    updated[i] = { ...updated[i], [field]: value }
    setCVData({ ...cvData, experience: updated })
  }

  const handleAchievementChange = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...cvData.experience]
    const exp = updated[expIndex]
    const achievements = [...exp.achievements]
    achievements[achIndex] = value
    updated[expIndex] = { ...exp, achievements }
    setCVData({ ...cvData, experience: updated })
  }

  // --- Lists ---
  const handleListChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "skills" | "certifications" | "projects",
    index: number
  ) => {
    const updatedList: string[] = [...cvData[field]]
    updatedList[index] = e.target.value
    setCVData({ ...cvData, [field]: updatedList })
  }

  const addListItem = (field: "skills" | "certifications" | "projects") => {
    setCVData({ ...cvData, [field]: [...cvData[field], ""] })
  }

  const removeListItem = (field: "skills" | "certifications" | "projects", index: number) => {
    const updatedList = [...cvData[field]]
    updatedList.splice(index, 1)
    setCVData({ ...cvData, [field]: updatedList })
  }

  const handleReset = () => {
    localStorage.removeItem("cvData")
    window.location.reload()
  }

  return (
    <form className="space-y-8 w-full">
      {/* Personal Info */}
      <Section title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Name" value={cvData.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Input label="Location" value={cvData.location} onChange={(e) => handleChange("location", e.target.value)} />
          <Input label="Email" type="email" value={cvData.email} onChange={(e) => handleChange("email", e.target.value)} />
          <Input label="Phone" value={cvData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          <Input label="LinkedIn" value={cvData.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} />
          <Input label="E-portfolio" value={cvData.portfolio} onChange={(e) => handleChange("portfolio", e.target.value)} />
        </div>
        <Textarea label="Professional Summary" value={cvData.summary} onChange={(e) => handleChange("summary", e.target.value)} />
      </Section>

      {/* Education */}
      <Section title="Education">
        {cvData.education.map((edu, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded p-4 mb-4">
            <Input label="School" value={edu.school} onChange={(e) => handleEducationChange(i, "school", e.target.value)} />
            <Input label="Degree" value={edu.degree} onChange={(e) => handleEducationChange(i, "degree", e.target.value)} />
            <Input label="Location" value={edu.location} onChange={(e) => handleEducationChange(i, "location", e.target.value)} />
            <Input label="Date" value={edu.date} onChange={(e) => handleEducationChange(i, "date", e.target.value)} />
            <div className="col-span-2">
              <Textarea label="Details" value={edu.details} onChange={(e) => handleEducationChange(i, "details", e.target.value)} />
            </div>
            <div className="col-span-2">
              <Button
                type="button"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  const updated = [...cvData.education]
                  updated.splice(i, 1)
                  setCVData({ ...cvData, education: updated })
                }}
              >
                Remove Education
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            setCVData({
              ...cvData,
              education: [...cvData.education, { school: "", degree: "", location: "", date: "", details: "" }],
            })
          }
        >
          + Add Education
        </Button>
      </Section>

      {/* Experience */}
      <Section title="Professional Experience">
        {cvData.experience.map((exp, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded p-4 mb-4">
            <Input label="Company" value={exp.company} onChange={(e) => handleExperienceChange(i, "company", e.target.value)} />
            <Input label="Location" value={exp.location} onChange={(e) => handleExperienceChange(i, "location", e.target.value)} />
            <Input label="Date" value={exp.date} onChange={(e) => handleExperienceChange(i, "date", e.target.value)} />
            <Input label="Role" value={exp.role} onChange={(e) => handleExperienceChange(i, "role", e.target.value)} />
            <div className="col-span-2">
              <Textarea label="Description" value={exp.description} onChange={(e) => handleExperienceChange(i, "description", e.target.value)} />
            </div>

            {/* Achievements */}
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Achievements</p>
              {exp.achievements.map((ach, j) => (
                <div key={j} className="flex gap-2 mt-1">
                  <Input label={`Achievement ${j + 1}`} value={ach} onChange={(e) => handleAchievementChange(i, j, e.target.value)} />
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      const updated = [...cvData.experience]
                      const achievements = [...updated[i].achievements]
                      achievements.splice(j, 1)
                      updated[i] = { ...updated[i], achievements }
                      setCVData({ ...cvData, experience: updated })
                    }}
                  >
                    -
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const updated = [...cvData.experience]
                  updated[i] = { ...updated[i], achievements: [...updated[i].achievements, ""] }
                  setCVData({ ...cvData, experience: updated })
                }}
              >
                + Add Achievement
              </Button>
            </div>

            <div className="col-span-2">
              <Button
                type="button"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  const updated = [...cvData.experience]
                  updated.splice(i, 1)
                  setCVData({ ...cvData, experience: updated })
                }}
              >
                Remove Experience
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            setCVData({
              ...cvData,
              experience: [
                ...cvData.experience,
                { company: "", location: "", date: "", role: "", description: "", achievements: [""] },
              ],
            })
          }
        >
          + Add Experience
        </Button>
      </Section>

      {/* Skills, Certifications, Projects */}
      {(["skills", "certifications", "projects"] as const).map((field) => (
        <Section key={field} title={field.charAt(0).toUpperCase() + field.slice(1)}>
          {(cvData[field] as string[]).map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input label={`${field.slice(0, -1)} ${i + 1}`} value={item} onChange={(e) => handleListChange(e, field, i)} />
              <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={() => removeListItem(field, i)}>
                -
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addListItem(field)}>
            + Add {field.slice(0, -1)}
          </Button>
        </Section>
      ))}

      <Button type="button" className="w-full mt-4 bg-gray-600 hover:bg-gray-700" onClick={handleReset}>
        Reset CV
      </Button>
    </form>
  )
}
