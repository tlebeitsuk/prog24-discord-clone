import ServerList from "@/app/components/ServerList";
import ChannelList from "@/app/components/ChannelList";
import ChatSection from "@/app/components/ChatSection";
import UserList from "@/app/components/UserList";

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <div className="hidden md:flex ">
        <ServerList />
        <ChannelList />
      </div>
      <ChatSection />
      <UserList />
    </div>

  );
}
