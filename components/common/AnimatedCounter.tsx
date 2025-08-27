"use client"

import { useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"

interface Props {
  value: number
  label: string
}

export default function AnimatedCounter({ value, label }: Props) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = document.getElementById(label.replace(/\s+/g, "-"))
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [label])

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: inView ? value : 0 },
    config: { duration: 2000 },
  })

  return (
    <div id={label.replace(/\s+/g, "-")} className="text-center">
      <animated.div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
        {number.to((n) => Math.floor(n).toLocaleString())}
      </animated.div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  )
}
