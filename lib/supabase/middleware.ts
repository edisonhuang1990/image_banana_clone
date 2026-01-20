import { createServerClient } from "@supabase/ssr"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error("Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  return { url, anonKey }
}

export async function updateSession(request: NextRequest) {
  const { url, anonKey } = getSupabaseEnv()

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // Keep the request cookie jar in sync so subsequent middleware reads see the latest values.
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }

        supabaseResponse = NextResponse.next({ request })

        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options)
        }
      },
    },
  })

  // Refresh the session if needed. This is important for server-side auth.
  await supabase.auth.getUser()

  return supabaseResponse
}

