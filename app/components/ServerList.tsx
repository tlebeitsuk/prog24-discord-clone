import Avatar from "./Avatar";
import UserMenu from "./UserMenu";

export default function ServerList() {
  return (
    <div className="w-16 flex flex-col gap-4 justify-between items-center bg-gray-800 p-4 h-full">
      <div className="space-y-4">
        <Avatar name="Lorem ipsum" />
        <Avatar name="Ipsumlorem awd aw" />
        <Avatar name="jee jee" />
      </div>
      <UserMenu />
    </div>
  );
}
