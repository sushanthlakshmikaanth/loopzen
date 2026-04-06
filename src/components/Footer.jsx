import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-muted/20 px-8 md:px-16 py-8 bg-bg">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <span className="font-body text-xs text-muted tracking-widest uppercase">
          © 2025 LoopZen
        </span>

        {/* Center */}
        <Link
          to="/"
          className="font-display text-lg font-light tracking-[0.3em] text-text uppercase"
        >
          Loop<span className="text-accent">Zen</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/loopzen.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-muted hover:text-text transition-colors duration-200 tracking-widest uppercase"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/loopzen/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-muted hover:text-text transition-colors duration-200 tracking-widest uppercase"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  )
}
