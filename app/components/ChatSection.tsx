"use client"

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ChatSection({ channelId }: { channelId: string }) {
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    async function getMessages() {
      const response = await fetch("/api/messages?channelId=" + channelId, {
        method: "GET",
      })

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        return;
      }

      setMessages(data);
    }

    getMessages();
  }, [channelId]);

useEffect(() => {
  const channel = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `channel_id=eq.${channelId}`
      },
      (payload) => {
        setMessages((current) => [...current, payload.new])
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [channelId])

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    if (message.trim() === "") return

    const response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        channelId: channelId,
        text: message,
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error(data.error)
      alert("Failed to create server")
      return
    }
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-600 p-4 h-full">
      <p className="text-white">Chat</p>

      <div className="mt-4 space-y-1 w-full text-white">
        {messages.map((message, index) => (
          <div key={message.id} className="bg-gray-700 p-2 rounded-md">
            <p className="text-xs">
              {new Date(message.created_at).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs">{message.user_id}</p>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="w-full mt-4 border rounded-md">
        <input type="text" name="message" className="w-full p-2 rounded-md" placeholder="Type your message..." />
      </form>
    </div>
  );
}
