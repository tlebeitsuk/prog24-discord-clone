import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/login");
      }

      setName(data.user.user_metadata.name || data.user.email)
    }
    
    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div>
      <button popoverTarget="user-menu" className="[anchor-name:--user-menu]">
        <Avatar name={name} />
      </button>
      <div popover="auto" id="user-menu"
        className="[position-anchor:--user-menu] left-[anchor(100%)] top-[anchor(bottom)] -translate-y-full translate-x-2 rounded-md p-2 w-42"
      >
        <ul className="space-y-1">
          <li className="text-gray-600">{name}</li>
          <li onClick={handleLogout}>Log out</li>
        </ul>
      </div>
    </div>
  )
}
