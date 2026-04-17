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

  if (!body.text || !body.channelId) {
    return NextResponse.json({ error: "Missing text or channelId" }, { status: 400 })
  }

  // Add to database
  const { error } = await supabase.from("messages").insert({
    channel_id: body.channelId,
    user_id: user.id,
    text: body.text
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Message created successfully" })
}

export async function GET(req: Request) {
  // Get channelId from query params
  const { searchParams } = new URL(req.url)
  const channelId = searchParams.get("channelId")

  if (!channelId) {
    return NextResponse.json({ error: "Missing channelId" }, { status: 400 })
  }

  // Get messages from database
  const supabase = await supabaseServer()

  const { data: { user } } = await supabase.auth.getUser()

  // Check if user exists
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase.from("messages").select('*').eq('channel_id', channelId).order('created_at', { ascending: true }).limit(100)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}