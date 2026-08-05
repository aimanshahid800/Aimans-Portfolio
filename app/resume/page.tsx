"use client";

import React from "react";
import { Download, ArrowLeft, Printer, Mail, Phone, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Top action bar - Hidden when printing */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-sm bg-[#ff2d78] hover:bg-[#ff4d90] text-white font-medium px-5 py-2 rounded-full transition-all shadow-lg shadow-[#ff2d78]/30"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Resume Document */}
      <div className="max-w-4xl mx-auto bg-[#12121a] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* Header */}
        <header className="border-b border-white/10 print:border-black/20 pb-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black mb-2">
            Aiman Shahid
          </h1>
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-white/70 print:text-black/80">
            <a href="tel:+923234945568" className="flex items-center gap-1.5 hover:text-[#ff6b9d] print:hover:text-black">
              <Phone className="w-3.5 h-3.5" /> (+92) 3234945568
            </a>
            <span>•</span>
            <a href="mailto:aimanshahid800@gmail.com" className="flex items-center gap-1.5 hover:text-[#ff6b9d] print:hover:text-black">
              <Mail className="w-3.5 h-3.5" /> aimanshahid800@gmail.com
            </a>
            <span>•</span>
            <a href="https://github.com/aimanshahid800" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#ff6b9d] print:hover:text-black">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/aiman-shahid-b49035320" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#ff6b9d] print:hover:text-black">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#ff2d78] print:text-black border-b border-[#ff2d78]/30 print:border-black pb-1 mb-2">
            Summary
          </h2>
          <p className="text-sm text-white/80 print:text-black leading-relaxed">
            Final-year Computer Science student with hands-on experience in agentic AI, RAG systems, and full-stack development using React, FastAPI, and PHP. Eager to apply strong OOP, data structures, and teamwork skills in a real-world AI engineering environment.
          </p>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#ff2d78] print:text-black border-b border-[#ff2d78]/30 print:border-black pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white print:text-black">
                  PIAIC – University of Management & Technology (UMT)
                </h3>
                <p className="text-xs text-white/70 print:text-black/80 italic">Agentic AI Specialization</p>
              </div>
              <div className="text-right text-xs text-white/60 print:text-black/70">
                <span>Lahore, Pakistan</span>
                <p>03/2024 – 06/2026</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white print:text-black">
                  Lahore College for Women University
                </h3>
                <p className="text-xs text-white/70 print:text-black/80 italic">BS Computer Science</p>
              </div>
              <div className="text-right text-xs text-white/60 print:text-black/70">
                <span>Lahore, Pakistan</span>
                <p>10/2023 – Present</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#ff2d78] print:text-black border-b border-[#ff2d78]/30 print:border-black pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold text-white print:text-black">
                  Google Classroom Clone <span className="font-normal text-xs text-white/60 print:text-black/70">— PHP, MySQL, CSS, XAMPP, Git</span>
                </h3>
                <span className="text-xs text-white/60 print:text-black/70">2026</span>
              </div>
              <ul className="list-disc list-inside text-xs text-white/80 print:text-black space-y-1 pl-1">
                <li>Coordinated a 4-member team, manually resolving Git integration issues while structuring role-based access (Teacher/Student).</li>
                <li>Built and debugged a comment system, dark mode, and AJAX-based join-class modal, testing each feature across both user roles before merge.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold text-white print:text-black">
                  Mood-Sync Task Filter <span className="font-normal text-xs text-white/60 print:text-black/70">— Python, FastAPI, React, Supabase</span>
                </h3>
                <span className="text-xs text-white/60 print:text-black/70">2026</span>
              </div>
              <ul className="list-disc list-inside text-xs text-white/80 print:text-black space-y-1 pl-1">
                <li>Researched mood-analysis approaches and implemented agent-based logic to dynamically filter and reprioritize task workflows in an ambiguous problem space.</li>
                <li>Designed task-state data structures to support real-time reprioritization across a 2-tier architecture.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold text-white print:text-black">
                  Nyra Chatbot <span className="font-normal text-xs text-white/60 print:text-black/70">— Python, FastAPI, Chainlit, Qdrant</span>
                </h3>
                <span className="text-xs text-white/60 print:text-black/70">06/2026</span>
              </div>
              <ul className="list-disc list-inside text-xs text-white/80 print:text-black space-y-1 pl-1">
                <li>Evaluated and integrated Qdrant vector database for semantic memory, building a RAG pipeline with persistent conversation history.</li>
                <li>Debugged and tested retrieval accuracy iteratively, documenting pipeline behavior for a glassmorphic UI.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold text-white print:text-black">
                  AI Task Teller <span className="font-normal text-xs text-white/60 print:text-black/70">— Python, OpenAI Agents SDK</span>
                </h3>
                <span className="text-xs text-white/60 print:text-black/70">2025</span>
              </div>
              <ul className="list-disc list-inside text-xs text-white/80 print:text-black space-y-1 pl-1">
                <li>Architected a 2-agent handoff system (greeting agent, task-management agent) using OOP-based agent design and OpenAI Agents SDK.</li>
                <li>Tested handoff reliability across multiple conversation scenarios to ensure modular, decoupled logic between agents.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#ff2d78] print:text-black border-b border-[#ff2d78]/30 print:border-black pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 print:text-black">
            <div><strong className="text-white print:text-black">Languages:</strong> Python, PHP, JavaScript, TypeScript</div>
            <div><strong className="text-white print:text-black">Core CS:</strong> Data Structures, Algorithms, OOP</div>
            <div><strong className="text-white print:text-black">Frontend:</strong> React, Next.js, HTML5, CSS3, Tailwind CSS</div>
            <div><strong className="text-white print:text-black">Backend/APIs:</strong> FastAPI, PHP, Node.js (coursework), REST API design</div>
            <div><strong className="text-white print:text-black">Databases:</strong> MySQL, Supabase (Postgres), Qdrant, MongoDB</div>
            <div><strong className="text-white print:text-black">AI/Generative AI:</strong> Agentic AI, RAG, OpenAI Agents SDK, Prompt Engineering, Vector Search</div>
            <div className="sm:col-span-2"><strong className="text-white print:text-black">Dev Tools & Practices:</strong> Git, Docker, Vercel, Postman, debugging, testing, technical documentation</div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#ff2d78] print:text-black border-b border-[#ff2d78]/30 print:border-black pb-1 mb-3">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-xs text-white/80 print:text-black space-y-1 pl-1">
            <li>Fundamentals of Agentic AI – 88% – PIAIC</li>
            <li>Level 2 Fundamentals of Agentic AI Professional – 77% – PIAIC</li>
            <li>Prompt & Context Engineering – 80% – PIAIC</li>
            <li>Model Context Protocol (MCP) Level 2 – 70% – PIAIC</li>
            <li>AI Fluency, Claude 101 – Anthropic</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
