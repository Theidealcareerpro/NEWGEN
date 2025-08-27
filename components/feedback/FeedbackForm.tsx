"use client"

import { useState } from "react"

export default function FeedbackForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle")
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    setError(null)
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus("ok")
      setName(""); setEmail(""); setMessage("")
    } catch (err) {
      setStatus("err")
      setError(err instanceof Error ? err.message : "Failed to send")
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Your name"
          className="px-3 py-2 rounded border dark:bg-zinc-900"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Your email"
          className="px-3 py-2 rounded border dark:bg-zinc-900"
        />
      </div>
      <textarea
        required
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Your message"
        rows={5}
        className="w-full px-3 py-2 rounded border dark:bg-zinc-900"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full sm:w-auto"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {status === "ok" && (
        <p className="text-green-600 dark:text-green-400 text-sm">Thanks! We’ll reply soon.</p>
      )}
      {status === "err" && (
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      )}
    </form>
  )
}
