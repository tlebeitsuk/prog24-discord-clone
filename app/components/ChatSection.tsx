import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ChatSection({ toggleUsers, toggleServers }: { toggleUsers: () => void, toggleServers: () => void }) {

  const [messages, setMessages] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        setUser(data.user.user_metadata.name || data.user.email)
      }
    }

    getUser();
  }, []);

  const channel = supabase.channel('room:lobby:messages', {
    config: { private: true }, // Recommended for production
  })

  useEffect(() => {
    channel
      .on('broadcast', { event: 'message' }, (payload: { payload: any }) => {
        setMessages((current: any) => [...current, payload.payload])
      })
      .subscribe()
  }, [])

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    if (message.trim() === "") return

    const data = {
      id: Math.random().toString(36).substring(2, 9),
      user: {
        name: user
      },
      content: message,
      createdAt: new Date().toISOString(),
    }

    setMessages((current) => [...current, data])

    await channel.send({
      type: 'broadcast',
      event: 'message',
      payload: data,
    });
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-600 p-4 h-full">
      <button onClick={toggleServers} className="md:hidden">Channels</button>
      <p className="text-white">Chat</p>
      <button onClick={toggleUsers} className="md:hidden">Users</button>

      <div className="mt-4 space-y-1 w-full text-white">
        {messages.map((message, index) => (
          <div key={message.id} className="bg-gray-700 p-2 rounded-md">
            <p className="text-xs">
              {new Date(message.createdAt).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs">{message.user.name}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="w-full mt-4 border rounded-md">
        <input type="text" name="message" className="w-full p-2 rounded-md" placeholder="Type your message..." />
      </form>
    </div>
  );
}
