export default function ChatSection({ toggleUsers, toggleServers }: { toggleUsers: () => void, toggleServers: () => void }) {
  return (
    <div className="w-full flex flex-col items-center bg-gray-600 p-4 h-full">
      <button onClick={toggleServers} className="md:hidden">Channels</button>
      <p className="text-white">Chat</p>
      <button onClick={toggleUsers} className="md:hidden">Users</button>
    </div>
  );
}
