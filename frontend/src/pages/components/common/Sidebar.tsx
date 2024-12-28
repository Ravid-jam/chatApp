"use client";
import { Dispatch, SetStateAction } from "react";
import AllUserList from "./AllUserList";
import Profile from "./Profile";

export default function Sidebar({
  onlineUser,
  setRoomData,
  setAllMessage,
}: {
  onlineUser: any;
  setRoomData: any;
  setAllMessage: Dispatch<SetStateAction<any[]>>;
}) {
  return (
    <div className="hidden border-r bg-white h-full  md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Profile />
        </div>
        <AllUserList
          onlineUser={onlineUser}
          setRoomData={setRoomData}
          setAllMessage={setAllMessage}
        />
      </div>
    </div>
  );
}
