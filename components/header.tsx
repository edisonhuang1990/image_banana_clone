"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BananaIcon } from "./banana-icon"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export function Header() {
  const router = useRouter()
  const [supabaseReady, setSupabaseReady] = useState(false)
  const [supabaseError, setSupabaseError] = useState<string | null>(null)
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    try {
      setSupabase(createClient())
    } catch (e) {
      setSupabaseError(e instanceof Error ? e.message : "Failed to init Supabase client")
    } finally {
      setSupabaseReady(true)
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true)
      return
    }

    let unsub: (() => void) | undefined

    ;(async () => {
      const { data, error } = await supabase.auth.getUser()
      if (!error) setUserEmail(data.user?.email ?? null)
      setAuthReady(true)

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUserEmail(session?.user?.email ?? null)
      })

      unsub = () => listener.subscription.unsubscribe()
    })()

    return () => unsub?.()
  }, [supabase])

  async function onGoogleLogin() {
    if (!supabase) return

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Must match your Supabase project's redirect allow list.
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  async function onLogout() {
    await fetch("/auth/signout", { method: "POST" })
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BananaIcon className="w-8 h-8" />
          <span className="text-xl font-bold">Nano Banana</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/#showcase" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Showcase
          </Link>
          <Link href="/#reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Reviews
          </Link>
          <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {authReady && userEmail ? (
            <Button variant="ghost" size="sm" onClick={onLogout}>
              Log out
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onGoogleLogin}
              disabled={!supabaseReady || !authReady || !supabase}
              title={supabaseError ?? undefined}
            >
              Continue with Google
            </Button>
          )}
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/#editor">Try Free</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
