import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import ChatWidget from "@/components/chat-widget"
import SterlingGateKineticNavigation from "@/components/ui/sterling-gate-kinetic-navigation"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "aimiTECH - Portfolio",
  description: "Modern portfolio showcasing innovative tech solutions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        {children}
        {/* Mobile GSAP menu mounted at root so toggle is visible on mobile even without header */}
        <SterlingGateKineticNavigation />
        <ChatWidget />
      </body>
    </html>
  )
}
