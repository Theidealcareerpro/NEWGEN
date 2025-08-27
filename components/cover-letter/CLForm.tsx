// components/cover-letter/CLForm.tsx
"use client"

import { ChangeEvent } from "react"
import { CLDData } from "@/lib/cld-types"

type Props = {
  data: CLDData
  setData: (data: CLDData) => void
}

export default function CLForm({ data, setData }: Props) {
  const setField = (field: keyof CLDData, value: string) => {
    setData({ ...data, [field]: value })
  }

  const onInput = (e: ChangeEvent<HTMLInputElement>, field: keyof CLDData) =>
    setField(field, e.target.value)

  const onText = (e: ChangeEvent<HTMLTextAreaElement>, field: keyof CLDData) =>
    setField(field, e.target.value)

  // Body paragraphs (array)
  const setBodyAt = (index: number, value: string) => {
    const updated = [...data.body]
    updated[index] = value
    setData({ ...data, body: updated })
  }

  const addBody = () => setData({ ...data, body: [...data.body, ""] })

  const removeBody = (index: number) => {
    const updated = [...data.body]
    updated.splice(index, 1)
    setData({ ...data, body: updated.length ? updated : [""] })
  }

  const handleReset = () => {
    localStorage.removeItem("cldData")
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-600 text-center">Cover Letter</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Fill in your details. The preview updates in real time.
      </p>

      {/* Applicant */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-blue-600">Your Details</h3>
        <Input placeholder="Full Name" value={data.applicantName} onChange={(e) => onInput(e, "applicantName")} />
        <Input placeholder="Location" value={data.applicantLocation} onChange={(e) => onInput(e, "applicantLocation")} />
        <Input placeholder="Email" value={data.applicantEmail} onChange={(e) => onInput(e, "applicantEmail")} />
        <Input placeholder="Phone" value={data.applicantPhone} onChange={(e) => onInput(e, "applicantPhone")} />
        <Input placeholder="LinkedIn (https://...)" value={data.applicantLinkedIn} onChange={(e) => onInput(e, "applicantLinkedIn")} />
        <Input placeholder="E-portfolio (https://...)" value={data.applicantPortfolio} onChange={(e) => onInput(e, "applicantPortfolio")} />
      </div>

      {/* Recipient */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-blue-600">Recipient</h3>
        <Input placeholder="Recipient Name" value={data.recipientName} onChange={(e) => onInput(e, "recipientName")} />
        <Input placeholder="Recipient Title" value={data.recipientTitle} onChange={(e) => onInput(e, "recipientTitle")} />
        <Input placeholder="Company" value={data.company} onChange={(e) => onInput(e, "company")} />
        <Input placeholder="Company Location" value={data.companyLocation} onChange={(e) => onInput(e, "companyLocation")} />
      </div>

      {/* Meta */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-blue-600">Role & Date</h3>
        <Input placeholder="Role Title (e.g., Business Analyst)" value={data.roleTitle} onChange={(e) => onInput(e, "roleTitle")} />
        <Input placeholder="Date (e.g., 03/2025)" value={data.date} onChange={(e) => onInput(e, "date")} />
      </div>

      {/* Letter */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-blue-600">Letter Content</h3>
        <Input placeholder="Salutation" value={data.salutation} onChange={(e) => onInput(e, "salutation")} />
        <Textarea placeholder="Intro paragraph" value={data.intro} onChange={(e) => onText(e, "intro")} />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Body paragraphs</label>
          {data.body.map((p, i) => (
            <div key={i} className="flex gap-2">
              <Textarea
                placeholder={`Paragraph ${i + 1}`}
                value={p}
                onChange={(e) => setBodyAt(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeBody(i)}
                className="rounded px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white"
                aria-label={`Remove paragraph ${i + 1}`}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addBody}
            className="rounded px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Add paragraph
          </button>
        </div>

        <Textarea placeholder="Closing paragraph" value={data.closing} onChange={(e) => onText(e, "closing")} />
        <Input placeholder='Sign-off (e.g., "Sincerely,")' value={data.signOff} onChange={(e) => onInput(e, "signOff")} />
        <Input placeholder="Signature name" value={data.signatureName} onChange={(e) => onInput(e, "signatureName")} />
      </div>

      {/* Theme + Font */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color Theme</label>
          <select
            className="mt-1 w-full border rounded p-2 dark:bg-zinc-800"
            value={data.theme}
            onChange={(e) => setField("theme", e.target.value as CLDData["theme"])}
          >
            <option value="blue">Blue</option>
            <option value="emerald">Emerald</option>
            <option value="rose">Rose</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Font</label>
          <select
            className="mt-1 w-full border rounded p-2 dark:bg-zinc-800"
            value={data.font}
            onChange={(e) => setField("font", e.target.value as CLDData["font"])}
          >
            <option value="inter">Inter</option>
            <option value="lora">Lora</option>
            <option value="roboto">Roboto</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        className="w-full mt-2 rounded px-4 py-2 text-sm border border-gray-300 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/5"
        onClick={handleReset}
      >
        Reset Cover Letter
      </button>
    </div>
  )
}

/* --- tiny inputs --- */
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 rounded border dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={4}
      {...props}
      className="w-full px-3 py-2 rounded border dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}
