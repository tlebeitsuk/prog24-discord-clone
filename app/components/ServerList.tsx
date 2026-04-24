"use client"

import Avatar from "./Avatar";
import UserMenu from "./UserMenu";
import NewServer from "./NewServer";
import { useEffect, useState } from "react";
import Link from 'next/link'

export default function ServerList() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    async function getSession() {
      const response = await fetch("/api/servers", {
        method: "GET",
      })

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        return;
      }

      setServers(data);
    }

    getSession();
  }, []);

  return (
    <div className="w-16 flex flex-col gap-4 justify-between items-center bg-gray-800 p-2 h-full">
      <div className="space-y-2">
        {servers.map((server) => (
          <Link
            key={server.id}
            href={`/servers/${server.id}`}
            className="block"
          >
            <Avatar key={server.id} name={server.name} />
          </Link>
        ))}
        <NewServer />
      </div>
      <UserMenu />
    </div>
  );
}
