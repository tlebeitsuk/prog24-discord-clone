import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabasessr"

export async function POST(req: Request) {
  const supabase = await supabaseServer()

  const { data: { user } } = await supabase.auth.getUser()

  // Check if user exists
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  // Add to database
  const { data, error } = await supabase.from("servers").insert({ name: body.name, owner_id: user.id, is_public: true }).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function GET(req: Request) {
  const supabase = await supabaseServer()

  const { data: { user } } = await supabase.auth.getUser()

  // Check if user exists
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase.from("servers").select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}