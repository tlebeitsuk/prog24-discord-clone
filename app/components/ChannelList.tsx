"use client"

import { useEffect, useState } from "react";
import Link from 'next/link'

export default function ChannelList({ serverId }: { serverId: string }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    async function getChannels() {
      const response = await fetch("/api/channels?serverId=" + serverId, {
        method: "GET",
      })

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        return;
      }

      setChannels(data);
    }

    getChannels();
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-700 p-4 w-full">
      <div className="space-y-2 text-white">
        <h2 className="uppercase font-bold">Channels</h2>
        {channels.map((channel) => (
          <Link
            key={channel.id}
            href={`/servers/${serverId}/channels/${channel.id}`}
            className="block"
          >
            {channel.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
