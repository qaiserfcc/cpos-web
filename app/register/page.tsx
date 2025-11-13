"use client"

import { useState, useRef, useEffect } from "react"
import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { MagneticButton } from "@/components/magnetic-button"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import Link from "next/link"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    setIsLoading(true)

    // Simulate signup API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // For demo purposes, redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Shader Background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" } as React.CSSProperties}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.svg"
              alt="CloudPOS Logo"
              className="h-6 w-6 drop-shadow-sm"
            />
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">CloudPOS</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login" className="font-mono text-sm text-foreground/80 hover:text-foreground transition-colors">
            Sign In
          </Link>
          <MagneticButton variant="secondary">
            <Link href="/">Back to Home</Link>
          </MagneticButton>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground">
              Get Started
            </h1>
            <p className="font-mono text-sm text-foreground/60">
              Create your CloudPOS account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block font-mono text-xs text-foreground/80">
                Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
                className="w-full border-b-2 border-foreground/60 bg-transparent py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus:outline-none transition-colors"
                placeholder="Your business name"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs text-foreground/80">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border-b-2 border-foreground/60 bg-transparent py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs text-foreground/80">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full border-b-2 border-foreground/60 bg-transparent py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus:outline-none transition-colors"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs text-foreground/80">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full border-b-2 border-foreground/60 bg-transparent py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus:outline-none transition-colors"
                placeholder="Confirm your password"
              />
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" required className="rounded border-foreground/30" />
              <span className="font-mono text-xs text-foreground/60">
                I agree to the{" "}
                <a href="#" className="text-foreground hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-foreground hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <MagneticButton
              variant="primary"
              size="lg"
              className="w-full"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </MagneticButton>
          </form>

          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-foreground/60">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}