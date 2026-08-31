import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import ChatWidget from "@/components/chat-widget"
import { Analytics } from "@vercel/analytics/react"

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
  title: "aimTECH - Portfolio",
  description: "Modern portfolio showcasing innovative tech solutions",
  generator: "v0.app",
  verification: {
    google: "pDu0XBNSEcdbnGDVta2tjVBxiw0w9KoNb5bWba6Q3gQ",
  },
  openGraph: {
    title: "aimTECH - Portfolio",
    description: "Agentic AI systems — RAG pipelines & multi-agent orchestration",
    url: "https://aimans-portfolio.vercel.app",
    siteName: "aimiTECH",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "aimTECH - Portfolio",
    description: "Agentic AI systems — RAG pipelines & multi-agent orchestration",
    images: ["/og-image.png"],
  },
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
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
