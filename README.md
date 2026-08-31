# Aiman Shahid | Personal Portfolio 🚀 — aimans-portfolio.vercel.app

A modern, highly interactive, futuristic personal portfolio built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, **GSAP**, and **Framer Motion**. Designed for smooth user experience, glassmorphic UI, dynamic WebGL shader background (Soft Aurora), and interactive UI animations.

![Portfolio Banner](projects/placeholder-4.png) 

## What it does & who it's for
A personal portfolio site built to show recruiters, hiring managers, and university reviewers that I build **agentic AI systems** — not just web apps. It leads with two AI projects (Nyra, a RAG chatbot, and AI Task Teller, a multi-agent system), includes a working contact form, and a live AI-powered chatbot ("Ask about Aiman") so visitors can interact with the site itself.

## Setup a stranger could follow
```bash
git clone https://github.com/<your-username>/Aimans-Portfolio.git
cd Aimans-Portfolio
npm install
```
Create a `.env.local` file with:
```
RESEND_API_KEY=your_resend_key
GEMINI_API_KEY=your_gemini_key
```
Run locally:
```bash
npm run dev
```
Open `http://localhost:3000`.

Live version: **https://aimans-portfolio.vercel.app**

## Usage examples
- Visit `/` → hero section states "I build agentic AI systems — RAG pipelines & multi-agent orchestration"
- Scroll to Projects → Nyra and AI Task Teller are shown first (reordered above older web projects)
- Click the email icon → smooth-scrolls to `#contact` instead of opening a mail client
- Fill the contact form → sends a real email via Resend to my inbox
- Click "Ask about Aiman" chatbot → ask it a question about my background, powered by Gemini 2.5 Flash

## Architecture (simple sketch)
```
Next.js frontend (Vercel)
 ├── ProjectCarousel component → Nyra, AI Task Teller, FYP Idea Scout, Classroom Clone
 ├── contact-form.tsx → CinematicFooter → POST /api/contact → Resend API → my Gmail
 ├── /api/chat route → Gemini 2.5 Flash → chatbot widget
 ├── app/sitemap.ts → submitted to Google Search Console
 └── Vercel Analytics → live visitor/page tracking
```

## v2 Eval results
- **Break-testing:** empty form submissions correctly blocked with validation errors; garbage data rejected; rapid double-clicks on submit tested — no duplicate sends or crashes
- **SEO/discoverability:** sitemap + site verification live in Google Search Console; social-share preview (custom OG image, title, description) verified across Google/X/Facebook/LinkedIn/Pinterest/Slack via metatags.io
- **Analytics:** Vercel Analytics confirms real traffic (pages `/` and `/resume`, device breakdown, country data)
- **Contact form fix:** resolved an env var mismatch (`RESEND_API_KEY` vs `PORTFOLIO_CHATBOT_KEY`) — confirmed with a real test submission reaching my inbox
- **Chatbot fix:** caught and fixed a deprecated model reference (`gemini-1.5-flash` → `gemini-2.5-flash`)

## Limitations (known, not hidden)
- **Mobile view has a known layout bug** — deliberately deferred since FlyRank reviewers use desktop; documented, not fixed yet
- **No personal domain** — running on the free `aimans-portfolio.vercel.app` subdomain due to budget constraints (HTTPS still fully working)
- **Chatbot is a bonus feature**, not the graded submission — kept separate to satisfy the "exactly one feature" pass criteria
- **One unreviewed branch** (`folder-contents-overview-26f7e`, PR #1) still open in the repo, not yet cleaned up

## Built with AI — transparency note
I built this with Claude as a coding/debugging partner: it helped me trace the Resend env-var mismatch, catch the deprecated Gemini model name, and structure this README. Every fix was tested live by me (real form submission reaching my inbox, manual break-testing, manual chatbot Q&A) before I called it done — I didn't just trust that the AI-suggested fix worked.

---

## ✨ Features & Highlights

- 🌌 **Interactive WebGL Background (`SoftAurora`)**: Custom Canvas WebGL shader background with mouse interaction support.
- 🎨 **Futuristic Design System**: Glassmorphism, neon gradient accents (`#FF6B9D`, `#FF2D78`), clean typography, and sleek dark mode.
- ⚡ **Interactive Components**:
  - **Dynamic Blur & Typing Text**: Powered by custom animated text components.
  - **Magnetic Elements**: Smooth cursor attraction effects on profile image and interactive elements.
  - **Interactive Projects Carousel**: Showcase of AI agents and web apps with custom controls.
  - **Scroll Timeline**: Animated journey tracking Computer Science and Agentic AI milestones.
- 📱 **Fully Responsive Layout**: Built mobile-first with desktop sidebar navigation and an interactive mobile drawer menu.
- 📧 **Interactive Contact Form**: Integrated with custom toast notifications (`Sonner`) and form validation (`Zod` + `React Hook Form`).

---

## 💻 Featured Projects

1. 🤖 **AI Task Teller**: Intelligent task automation agent leveraging OpenAI SDK and agentic workflows.
2. 🎓 **Nyra Chatbot**: Personalized AI assistant designed for study management, learning assistance, and interactive Q&A.

---

## 🛠️ Tech Stack & Dependencies

### **Core Frameworks & Tools**
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### **Animations & Graphics**
- **Framer Motion (`motion`)** & **GSAP**: High-performance UI micro-animations and scroll progress tracking.
- **OGL**: Light-weight WebGL library for shader effects (`SoftAurora`).
- **Lenis**: Smooth scrolling engine.

### **UI Components & Icons**
- **Radix UI Primitives**: Accessible UI components (`@radix-ui/*`).
- **Lucide React**: Modern icon set.
- **Sonner**: Toast notification library.

---

## 🎓 Education & Background

- 🎓 **BS Computer Science (2023 – 2027)** – Lahore College for Women University (LCWU)
- 🤖 **Agentic & Robotic AI Engineering (2024 – Present)** – PIAIC (Batch 57)
- 📜 **Fundamentals of Agentic AI Level 1 & Level 2 Certifications**

---

*Designed & Developed with ❤️ by Aiman Shahid.*
