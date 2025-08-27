"use client"

import { useEffect } from "react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { useSpring, animated } from "@react-spring/web"
import {
  ArrowRightIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  HeartIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CloudArrowUpIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
  PencilSquareIcon,
  EyeIcon,
  CloudIcon,
} from "@heroicons/react/24/outline"
import FeedbackForm from "@/components/feedback/FeedbackForm"
import { STATS } from "@/lib/stats"
import AnimatedCounter from "@/components/common/AnimatedCounter"
import Testimonials from "@/components/common/Testimonials"
import Footer from "@/components/Layout/Footer"

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true })
  }, [])

  // Floating animation for the hero mockup
  const floating = useSpring({
    loop: true,
    from: { y: 0 },
    to: [{ y: -10 }, { y: 0 }],
    config: { duration: 4000 },
  })

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border-b border-gray-200/60 dark:border-white/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <UserCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold tracking-tight">
              TheIdealProGen — E-Portfolio Builder
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#features" className="hover:opacity-80 transition">Features</Link>
            <Link href="#how" className="hover:opacity-80 transition">How it works</Link>
            <Link href="#pricing" className="hover:opacity-80 transition">Pricing</Link>
            <Link href="/sample-cv.pdf" target="_blank" className="hover:opacity-80 transition">Sample CV</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cv"
              className="hidden sm:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium border border-gray-300 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              Build CV
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md transition"
            >
              Create Portfolio
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.2),transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1
            className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            Generate a Professional CV, Cover Letter & Portfolio
          </h1>

          <p
            className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Beautiful templates. Real-time preview. One-click deploy under your GitHub organization.  
            Keep it free for everyone with community support — or unlock business-grade features when you’re ready.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium shadow-lg hover:shadow-blue-400/40 transition-all"
            >
              Create Portfolio <ArrowRightIcon className="h-5 w-5 inline-block ml-1" />
            </Link>
            <Link
              href="/cv"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 font-medium transition-all"
            >
              Build CV
            </Link>
            <Link
              href="/cover-letter"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 font-medium transition-all"
            >
              Cover Letter
            </Link>
          </div>

          {/* Floating animated mockup */}
          <animated.div
            style={floating}
            className="mt-14 mx-auto max-w-xl rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur shadow-lg p-6"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <div className="h-4 w-32 bg-blue-500/80 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </animated.div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="mt-20 max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-center">
        <AnimatedCounter value={STATS.cv} label="CVs Generated" />
        <AnimatedCounter value={STATS.coverLetter} label="Cover Letters Built" />
        <AnimatedCounter value={STATS.portfolio} label="Portfolios Published" />
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FEATURES */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center" data-aos="fade-up">
            Why People Love TheIdealProGen
          </h2>
          <p
            className="mt-3 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Ship a professional presence fast — with zero fuss and total control.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "No Sign-up", desc: "Start instantly, no account required.", icon: RocketLaunchIcon },
              { title: "Free & Open", desc: "Community-supported, transparent model.", icon: HeartIcon },
              { title: "GitHub Pages", desc: "Deploy your portfolio in one click.", icon: GlobeAltIcon },
              { title: "Privacy-First", desc: "We don’t store your CVs or data.", icon: ShieldCheckIcon },
              { title: "Modern Templates", desc: "Clean, responsive, and customizable.", icon: DocumentDuplicateIcon },
              { title: "Reliable & Fast", desc: "Minimal dependencies, blazing speed.", icon: CloudArrowUpIcon },
            ].map((f, i) => (
              <div
                key={f.title}
                className="p-6 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg transition-all"
                data-aos="fade-up"
                data-aos-delay={200 * (i + 1)}
              >
                <f.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 bg-white dark:bg-zinc-900/40 border-y border-gray-200/70 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center" data-aos="fade-up">
            From Idea to Live in Minutes
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Pick a Template", desc: "Choose a modern template and customize colors & fonts.", icon: PencilSquareIcon },
              { step: "2", title: "Edit with Live Preview", desc: "Fill guided forms — see changes instantly.", icon: EyeIcon },
              { step: "3", title: "Deploy to GitHub Pages", desc: "One click to publish under your org. Share your link.", icon: CloudIcon },
            ].map((s, i) => (
              <div
                key={s.step}
                className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg transition"
                data-aos="fade-up"
                data-aos-delay={200 * (i + 1)}
              >
                <s.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">Step {s.step}</div>
                <h3 className="mt-1 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center" data-aos="fade-up">
            Flexible and Transparent
          </h2>
          <p
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Free by default. Support the mission or upgrade when you need more.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                tagline: "1 portfolio / 3 months, 21-day hosting",
                cta: { label: "Start free", href: "/portfolio" },
                features: [
                  "3–5 portfolio templates",
                  "Live preview & deploy",
                  "21-day GitHub hosting",
                  "CV & Cover Letter PDF",
                  "No registration",
                ],
              },
              {
                name: "Supporter",
                price: "from $5",
                tagline: "Extend hosting by 1 month",
                cta: { label: "Keep it free", href: "/support" },
                features: ["Supporter badge", "Funds free student access", "Priority roadmap input"],
              },
              {
                name: "Business",
                price: "$10 / $20",
                tagline: "Longer hosting + premium templates",
                cta: { label: "Upgrade", href: "/upgrade" },
                highlight: true,
                features: [
                  "Premium templates & analytics",
                  "$10 → +3 months hosting",
                  "$20 → +6 months + priority support",
                  "Up to 3 portfolios / 6 months",
                  "Custom domain support",
                ],
              },
            ].map((t, i) => (
              <div
                key={t.name}
                className={`p-6 rounded-2xl bg-white dark:bg-zinc-900 border shadow-sm transition hover:shadow-lg ${
                  t.highlight
                    ? "border-blue-400 dark:border-blue-500"
                    : "border-gray-200 dark:border-white/10"
                }`}
                data-aos="fade-up"
                data-aos-delay={200 * (i + 1)}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold">{t.name}</h3>
                  {t.highlight && (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="mt-2 text-3xl font-bold">{t.price}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{t.tagline}</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={t.cta.href}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${
                    t.highlight
                      ? "text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      : "border border-gray-300 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {t.cta.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white dark:bg-zinc-900/40 border-t border-gray-200/70 dark:border-white/10">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center" data-aos="fade-up">
            Questions? Feedback?
          </h2>
          <p
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We read every message. No bots, no vendors — just us.
          </p>
          <div className="mt-8" data-aos="fade-up" data-aos-delay="400">
            <FeedbackForm />
          </div>
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <Footer />
    </main>
  )
}
