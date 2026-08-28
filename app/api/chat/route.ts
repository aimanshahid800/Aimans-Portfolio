import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.PORTFOLIO_CHATBOT_KEY;
    if (!apiKey) {
      console.error("PORTFOLIO_CHATBOT_KEY is not configured");
      return NextResponse.json({ error: "API configuration error" }, { status: 500 });
    }

    const systemInstructionText = `You are the portfolio assistant for Aiman Shahid (Aimi), a final-year BSCS student at Lahore College for Women University (LCWU), based in Lahore, Pakistan. Answer questions ONLY about her, her skills, and her projects, using this information:

- Tech stack: Python, FastAPI, OpenAI Agents SDK, RAG pipelines with Qdrant, Chainlit, React, Supabase, Next.js, Vercel
- Projects: 
  1. aimiTECH Portfolio — this very site, dark navy glassmorphic theme with pink/magenta accents
  2. Nyra — a RAG chatbot built with FastAPI and Qdrant
  3. MoodSync — a mood-aware agentic task scheduler with prayer-time scheduling and Ramadan Mode, built on FastAPI, React, and Supabase
  4. AI Task Teller — a multi-agent system built using the OpenAI Agents SDK
  5. Google Classroom Clone — a PHP/MySQL semester project where she was team lead of a 4-member group
- Currently working on her Final Year Project, exploring novel agentic AI concepts
- Long-term goal: pursuing a PhD in multimodal agentic systems research
- GitHub: github.com/aimanshahid800
- Contact: use the contact form on this site, or email aimanshahid800@gmail.com, or book a call via the Calendly link in the footer

Rules:
- Be friendly, concise, and professional — like you're representing her to a recruiter or collaborator
- If asked something unrelated to Aiman or her work, politely redirect: 'I'm here to answer questions about Aiman's work and background!'
- Never invent skills, projects, or experience not listed above
- Keep responses under 100 words unless more detail is genuinely needed`;

    // Map history to the format Gemini expects (contents array)
    const contents = [
      ...(Array.isArray(history) ? history : []).map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      })),
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({ error: "Failed to communicate with Gemini API" }, { status: response.status });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
