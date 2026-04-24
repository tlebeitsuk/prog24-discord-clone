"use client";

import ServerList from "@/app/components/ServerList";
import ChannelList from "@/app/components/ChannelList";
import ChatSection from "@/app/components/ChatSection";
import UserList from "@/app/components/UserList";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showUsers, setShowUsers] = useState(false);
  const [showServerChannel, setShowServerChannel] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
      }
    }

    getSession();
  }, []);

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
