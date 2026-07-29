"use client"

import { useEffect, useState } from "react"

const letters = ["L", "A", "U", "N", "C", "H", "I", "N", "G"]

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 500)
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`loader-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-container">
        <span className="loader-hi">{"Hi, I'm"}</span>
        <div className="loader-launching">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="loader-letter"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
        <div className="loader-spinner" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
      </div>
    </div>
  )
}
