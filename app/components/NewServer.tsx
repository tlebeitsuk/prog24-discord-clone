import React from 'react';
import { SubmitEvent } from "react";
import Avatar from "./Avatar";

export default function NewServer() {
  async function handleCreateServer(event: SubmitEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const serverName = formData.get("servername") as string;

    const response = await fetch("/api/servers", {
      method: "POST",
      body: JSON.stringify({
        name: serverName
      })
    })
  }

  return (
    <>
      <button popoverTarget="newserver-dialog">
        <Avatar name="+" />
      </button>

      <dialog id="newserver-dialog" popover="auto" className="m-auto h-fit w-full max-w-sm rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/25 backdrop:backdrop-blur-xs">
        <div className="p-6">
          <form onSubmit={handleCreateServer} method="dialog" className="space-y-4">
            <h3 className="font-bold text-lg">Create a new server</h3>
            <input id="servername" name="servername" required type="text" className="w-full border border-gray-300 rounded-md px-1" />
            <button type="submit" className="float-right bg-blue-900 text-white p-1 font-bold rounded-md mb-4">Create</button>
          </form>
        </div>
      </dialog>
    </>
  )
}
