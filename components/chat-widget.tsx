"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "model";
  text: string;
};

const CHAT_STYLES = `
.chat-widget-glass-popup {
  background: linear-gradient(145deg, rgba(255, 45, 120, 0.04) 0%, rgba(255, 107, 157, 0.01) 100%) !important;
  background-color: rgba(10, 10, 15, 0.65) !important;
  box-shadow: 
      0 20px 40px -15px rgba(10, 10, 15, 0.7), 
      inset 0 1px 1px rgba(255, 45, 120, 0.12), 
      inset 0 -1px 2px rgba(10, 10, 15, 0.9) !important;
  border: 1px solid rgba(255, 45, 120, 0.15) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
}
`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! Ask me anything about Aiman's skills, projects, or background.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Auto scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Hide widget when scrolling to #contact section (footer)
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // If contact section is entering viewport (near or in the bottom 90% of screen height)
        const isNearContact = rect.top < window.innerHeight * 0.9;
        setIsVisible(!isNearContact);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to state
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      // Build history (excluding the default greeting from history)
      const chatHistory = messages
        .filter((_, i) => i > 0)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: chatHistory,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.reply || "I encountered an error. Please try again." }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Sorry, I am having trouble connecting right now. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CHAT_STYLES }} />
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-50 font-sans transition-all duration-300 ease-in-out",
          isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        {/* Floating Action Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d78] to-[#ff6b9d] text-white shadow-[0_0_15px_rgba(255,45,120,0.5)] transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <MessageSquare className="h-6 w-6 text-black" />
          </button>
        )}
  
        {/* Chat Popup */}
        {isOpen && (
          <div 
            className={cn(
              "flex w-[90vw] sm:w-[360px] h-[500px] max-h-[80vh] flex-col rounded-2xl text-white overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 chat-widget-glass-popup"
            )}
          >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#ff2d78]/10 to-[#ff6b9d]/10 px-5 py-4 border-b border-[#ff2d78]/20">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#ff2d78] animate-pulse" />
              <span className="font-bold text-sm md:text-base tracking-wide text-white/90">Ask about Aiman</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex w-full",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-xs md:text-sm font-medium leading-relaxed",
                    m.role === "user"
                      ? "bg-gradient-to-r from-[#ff2d78] to-[#ff6b9d] text-black shadow-[0_4px_12px_rgba(255,45,120,0.15)] rounded-tr-none"
                      : "bg-white/5 backdrop-blur-md border border-[#ff2d78]/15 text-white/95 rounded-tl-none"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="flex items-center gap-2 max-w-[80%] rounded-2xl rounded-tl-none bg-white/5 backdrop-blur-md border border-[#ff2d78]/15 px-4 py-2.5 text-xs md:text-sm text-white/70">
                  <Loader2 className="h-4 w-4 animate-spin text-[#ff2d78]" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-[#ff2d78]/20 bg-black/40 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              disabled={isLoading}
              className="flex-1 bg-black border border-[#ff2d78]/40 focus:border-[#ff6b9d] focus:ring-[#ff6b9d]/60 focus:ring-2 focus:shadow-[0_0_15px_rgba(255,45,120,0.4)] text-white placeholder:text-white/40 rounded-full px-4 py-2 text-xs md:text-sm outline-none transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d78] to-[#ff6b9d] text-white shadow-[0_0_10px_rgba(255,45,120,0.3)] transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  );
}
