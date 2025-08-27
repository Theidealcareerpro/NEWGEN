import { TESTIMONIALS } from "@/lib/stats"

export default function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-zinc-900/50 border-t border-gray-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-bold text-center">What Our Users Say</h3>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-700 dark:text-gray-300 italic">“{t.text}”</p>
              <div className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                {t.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
