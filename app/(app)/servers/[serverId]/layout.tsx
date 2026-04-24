import ChannelList from "@/app/components/ChannelList";
import UserList from "@/app/components/UserList";

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) {
  const {serverId} = await params 
  return (
    <div className="flex h-screen w-screen">
      <div className="w-64">
        <ChannelList serverId={serverId} />
      </div>
      
      <div className="flex-1">
        {children}
      </div>

      <div className="w-64">
        <UserList />
      </div>
    </div>
  );
}
