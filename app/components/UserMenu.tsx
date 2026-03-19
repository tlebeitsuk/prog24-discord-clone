import Avatar from "./Avatar";

export default function UserMenu() {
  return (
    <div>
      <button popoverTarget="user-menu" className="[anchor-name:--user-menu]">
        <Avatar name="Tobias Lebeitsuk" />
      </button>
      <div popover="auto" id="user-menu"
        className="[position-anchor:--user-menu] left-[anchor(100%)] top-[anchor(bottom)] -translate-y-full translate-x-2 rounded-md p-2 w-42"
      >
        <ul className="space-y-1">
          <li>Log out</li>
          <li>Log out</li>
          <li>Log out</li>
        </ul>
      </div>
    </div>
  )
}
