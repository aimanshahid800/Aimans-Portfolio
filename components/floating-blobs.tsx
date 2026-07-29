"use client"

import { useEffect, useState } from "react"

export default function FloatingBlobs() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1 - Top right */}
      <div
        className="absolute w-80 h-80 bg-gradient-to-br from-[#ff2d78]/15 to-[#ff6b9d]/15 rounded-full blur-3xl"
        style={{
          top: `${-160 + scrollY * 0.15}px`,
          right: "-100px",
          animation: "float-slow 8s ease-in-out infinite",
        }}
      />

      {/* Blob 2 - Left */}
      <div
        className="absolute w-64 h-64 bg-gradient-to-br from-[#ff6b9d]/10 to-[#ff9ec6]/10 rounded-full blur-2xl"
        style={{
          top: `${33 + scrollY * 0.1}%`,
          left: "-80px",
          animation: "float-medium 15s ease-in-out infinite",
        }}
      />

      {/* Blob 3 - Bottom right */}
      <div
        className="absolute w-48 h-48 bg-gradient-to-br from-[#ff9ec6]/10 to-[#ff2d78]/10 rounded-full blur-xl"
        style={{
          bottom: `${80 - scrollY * 0.05}px`,
          right: "80px",
          animation: "float-fast 12s ease-in-out infinite",
        }}
      />

      {/* Blob 4 - Center */}
      <div
        className="absolute w-32 h-32 bg-gradient-to-br from-[#ff2d78]/8 to-[#ff6b9d]/8 rounded-full blur-lg"
        style={{
          top: `calc(50% - ${scrollY * 0.2}px)`,
          left: "50%",
          transform: "translateX(-50%)",
          animation: "float-reverse 6s ease-in-out infinite",
        }}
      />

      {/* Blob 5 - Bottom left */}
      <div
        className="absolute w-56 h-40 bg-gradient-to-r from-[#ff6b9d]/8 to-[#ff9ec6]/8 rounded-full blur-2xl"
        style={{
          bottom: `${160 - scrollY * 0.1}px`,
          left: "-80px",
          transform: "rotate(45deg)",
          animation: "float-slow 10s ease-in-out infinite",
        }}
      />
    </div>
  )
}
