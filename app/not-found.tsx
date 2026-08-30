import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-6 text-center text-white">
      <div className="max-w-md space-y-5">
        <p className="text-sm uppercase tracking-[0.28em] text-[#ff6b9d]">404</p>
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="text-white/70">
          The page you are looking for doesn’t exist or may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] px-5 py-3 font-medium text-black shadow-[0_0_20px_rgba(255,45,120,0.35)] transition hover:brightness-110"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
