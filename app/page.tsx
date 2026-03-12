"use client";

import ServerList from "@/app/components/ServerList";
import ChannelList from "@/app/components/ChannelList";
import ChatSection from "@/app/components/ChatSection";
import UserList from "@/app/components/UserList";
import { useState } from "react";

export default function Home() {
  const [showUsers, setShowUsers] = useState(false);
  const [showServerChannel, setShowServerChannel] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <div className={`${showServerChannel ? "flex" : "hidden"} w-76 md:flex`}>
        <ServerList />
        <ChannelList />
      </div>

      <ChatSection
        toggleServers={() => {
          setShowServerChannel(!showServerChannel)
          setShowUsers(false)
        }}
        toggleUsers={() => {
          setShowUsers(!showUsers)
          setShowServerChannel(false)
        }}
      />

      <div className={`${showUsers ? "flex" : "hidden"} w-76 md:flex`}>
        <UserList />
      </div>
    </div>
  );
}
