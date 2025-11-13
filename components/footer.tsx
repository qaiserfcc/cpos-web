"use client"

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground/10 backdrop-blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.svg"
                alt="CloudPOS Logo"
                className="h-5 w-5"
              />
            </div>
            <span className="font-sans text-lg font-semibold tracking-tight text-foreground">CloudPOS</span>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 text-center md:items-end md:text-right">
            <p className="font-mono text-xs text-foreground/60">
              © 2025 CloudPOS. All rights reserved.
            </p>
            <p className="font-mono text-xs text-foreground/40">
              Built for modern retail businesses
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}