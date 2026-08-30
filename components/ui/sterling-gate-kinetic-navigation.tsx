"use client"

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(CustomEase);
  } catch (e) {
    // plugin may already be registered
  }
}

export default function SterlingGateKineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      // fallback
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
      // eslint-disable-next-line no-console
      console.warn("CustomEase failed to load, falling back to default.", e);
    }

    const ctx = gsap.context(() => {
      // Hover shape interactions
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // open/close animation
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
      const menuButton = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        if (navWrap) navWrap.setAttribute("data-nav", "open");
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
        }
      } else {
        if (navWrap) navWrap.setAttribute("data-nav", "closed");
        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<")
          .to(menuButtonTexts, { yPercent: 0 }, "<")
          .to(menuButtonIcon, { rotate: 0 }, "<")
          .set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((p) => !p);
  const closeMenu = () => setIsMenuOpen(false);

  // menu links for the portfolio
  const links = [
    { name: "Home", href: "#home" },
    { name: "Profile", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Work", href: "#work" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  const socials = [
    { name: "GitHub", href: "https://github.com/aimanshahid800", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/aiman-shahid-b49035320", icon: Linkedin },
    { name: "Email", href: "mailto:aimanshahid800@gmail.com", icon: Mail },
    { name: "Resume", href: "/resume", icon: FileText },
  ];

  return (
    <div className="md:hidden">
      {/* Fixed toggle button top-right for mobile (min 40x40 tappable) */}
      <div className="fixed top-4 right-4 z-50">
        <button
          aria-label="Open menu"
          onClick={toggleMenu}
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full footer-glass-pill flex items-center justify-center text-white shadow-lg"
        >
          {/* simple hamburger / close icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Fullscreen overlay/menu */}
      <div ref={containerRef}>
        <section className={`fullscreen-menu-container ${isMenuOpen ? "" : "pointer-events-none"}`}>
          <div data-nav="closed" className="nav-overlay-wrapper fixed inset-0 z-40">
            <div
              className="overlay fixed inset-0 bg-black/80"
              style={{ backdropFilter: "blur(8px)" }}
              onClick={closeMenu}
            ></div>

            <nav className="menu-content fixed inset-0 flex items-center justify-center z-50 pointer-events-auto">
              <div className="menu-bg absolute inset-0 bg-[#060607]">
                <div className="backdrop-layer first absolute inset-0"></div>
                <div className="backdrop-layer second absolute inset-0"></div>

                {/* ambient shapes */}
                <div className="ambient-background-shapes absolute inset-0 overflow-hidden">
                  {/* Shape 1 - magenta blobs */}
                  <svg className="bg-shape bg-shape-1 absolute -left-10 -top-10 w-[60vw] h-[60vw] opacity-80" viewBox="0 0 400 400" fill="none">
                    <circle className="shape-element" cx="80" cy="120" r="40" fill="#ff2d78" opacity="0.12" />
                    <circle className="shape-element" cx="300" cy="80" r="60" fill="#ff6b9d" opacity="0.08" />
                    <circle className="shape-element" cx="200" cy="300" r="80" fill="#ff2d78" opacity="0.06" />
                  </svg>

                  {/* Shape 2 - diagonal lines */}
                  <svg className="bg-shape bg-shape-2 absolute right-0 top-8 w-[50vw] h-[50vw] opacity-60" viewBox="0 0 400 400" fill="none">
                    <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="#ff2d78" strokeWidth="30" opacity="0.08" />
                    <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="#ff6b9d" strokeWidth="25" opacity="0.06" />
                  </svg>

                  {/* Shape 3 - subtle grid dots */}
                  <svg className="bg-shape bg-shape-3 absolute left-1/2 top-1/3 w-[40vw] h-[40vw] opacity-50" viewBox="0 0 400 400" fill="none">
                    <circle className="shape-element" cx="50" cy="50" r="8" fill="#ff6b9d" opacity="0.08" />
                    <circle className="shape-element" cx="150" cy="50" r="8" fill="#ff2d78" opacity="0.06" />
                    <circle className="shape-element" cx="250" cy="50" r="8" fill="#ff9ec6" opacity="0.04" />
                  </svg>
                </div>
              </div>

              <div className="menu-content-wrapper relative z-50 w-full max-w-md mx-auto px-6">
                <ul className="menu-list grid gap-4">
                  {links.map((l, i) => (
                    <li key={l.name} className="menu-list-item" data-shape={Math.min(i + 1, 3)}>
                      <a
                        href={l.href}
                        onClick={(e) => {
                          // allow normal anchor behavior (in-page anchors). Close the menu and smooth scroll if possible
                          closeMenu();
                          const el = document.querySelector(l.href);
                          if (el) {
                            e.preventDefault();
                            (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="nav-link w-full block text-white text-2xl font-bold py-4 px-6 rounded-xl bg-transparent hover:bg-white/5 transition"
                      >
                        <p className="nav-link-text">{l.name}</p>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Social row at bottom */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="footer-glass-pill px-4 py-2 rounded-full text-white font-semibold text-sm flex items-center gap-2"
                        onClick={() => closeMenu()}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{s.name}</span>
                      </a>
                    );
                  })}
                </div>

              </div>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
}
