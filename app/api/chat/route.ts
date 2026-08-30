import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-3.5-flash-lite";
const TIMEOUT_MS = 10_000; // 10 seconds
const RETRY_DELAY_MS = 1_000; // 1 second

async function callGemini(
  apiKey: string,
  body: object,
  signal: AbortSignal
): Promise<Response> {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    }
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.PORTFOLIO_CHATBOT_KEY;
    if (!apiKey) {
      console.error("PORTFOLIO_CHATBOT_KEY is not configured");
      return NextResponse.json(
        { error: "The assistant is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
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
        parts: [{ text: h.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const geminiBody = {
      contents,
      systemInstruction: {
        parts: [{ text: systemInstructionText }],
      },
      generationConfig: {
        maxOutputTokens: 300,
      },
    };

    // Retry loop: try up to 2 times (1 attempt + 1 retry) on 503 / 429
    let response: Response | null = null;

    for (let attempt = 0; attempt < 2; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        response = await callGemini(apiKey, geminiBody, controller.signal);
        clearTimeout(timeoutId);
      } catch (err: any) {
        clearTimeout(timeoutId);

        // AbortController fired — request timed out
        if (err.name === "AbortError") {
          console.error(`Gemini request timed out on attempt ${attempt + 1}`);
          return NextResponse.json(
            { error: "I'm a bit busy right now, please try again in a moment." },
            { status: 503 }
          );
        }
        throw err; // unexpected network error — rethrow
      }

      // Success — exit retry loop
      if (response.ok) break;

      // Retryable errors: 503 (overloaded) or 429 (rate limited)
      if (response.status === 503 || response.status === 429) {
        const errorText = await response.text();
        console.warn(
          `Gemini returned ${response.status} on attempt ${attempt + 1}:`,
          errorText
        );

        if (attempt < 1) {
          // Wait 1 second then retry
          await sleep(RETRY_DELAY_MS);
          continue;
        }

        // Both attempts failed
        return NextResponse.json(
          { error: "I'm a bit busy right now, please try again in a moment." },
          { status: 503 }
        );
      }

      // Non-retryable error
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json(
        { error: "Failed to communicate with Gemini API" },
        { status: response.status }
      );
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        { error: "I'm a bit busy right now, please try again in a moment." },
        { status: 503 }
      );
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
