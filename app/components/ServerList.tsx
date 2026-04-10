import Avatar from "./Avatar";
import UserMenu from "./UserMenu";
import NewServer from "./NewServer";
import { useEffect, useState } from "react";

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
    <div className="w-16 flex flex-col gap-4 justify-between items-center bg-gray-800 p-4 h-full">
      <div className="space-y-4">
        {servers.map((server) => (
          <Avatar key={server.id} name={server.name} />
        ))}
        <NewServer />
      </div>
      <UserMenu />
    </div>
  );
}
