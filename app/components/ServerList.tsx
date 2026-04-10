import Avatar from "./Avatar";
import UserMenu from "./UserMenu";

export default function ServerList() {
  return (
    <>
      <div className="w-16 flex flex-col gap-4 justify-between items-center bg-gray-800 p-4 h-full">
        <div className="space-y-4">
          <Avatar name="Lorem ipsum" />
          <Avatar name="Ipsumlorem awd aw" />
          <Avatar name="jee jee" />
          <button popoverTarget="newserver-dialog">
            <Avatar name="+" />
          </button>
        </div>
        <UserMenu />
      </div>

      <dialog id="newserver-dialog" popover="auto" className="m-auto h-fit w-full max-w-sm rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/25 backdrop:backdrop-blur-xs">
        <div className="p-6">
          <form method="dialog" className="space-y-4">
            <h3 className="font-bold text-lg">Create a new server</h3>
            <input type="text" className="w-full border border-gray-300 rounded-md px-1" />

            <button className="float-right bg-blue-900 text-white p-1 font-bold rounded-md mb-4">Create</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
