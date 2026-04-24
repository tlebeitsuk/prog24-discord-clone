
import ServerList from "@/app/components/ServerList";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-screen w-screen">
      <ServerList className="w-76" />

      {children}
    </div>
  );
}
