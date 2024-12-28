import { EllipsisVertical, Menu, Phone, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dispatch, SetStateAction } from "react";
import AllUserList from "./AllUserList";
import Profile from "./Profile";
export default function Header({
  onlineUser,
  roomData,
  setRoomData,
}: {
  onlineUser: any;
  roomData: any;
  setRoomData: Dispatch<SetStateAction<any>>;
}) {
  return (
    <div>
      <header className="flex h-14 items-center gap-4 border-b bg-[#f0f2f5] px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-4">
            <SheetHeader>
              <div className="p-2 border-b border-b-black">
                <Profile />
              </div>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              <AllUserList
                onlineUser={onlineUser}
                setRoomData={setRoomData}
                setAllMessage={() => null}
              />
            </div>
          </SheetContent>
        </Sheet>
        {roomData !== undefined && (
          <div className="opacity-100 z-50 px-3 w-full flex justify-between cursor-pointer items-center gap-x-3 p-2">
            <div key={roomData?._id} className="flex gap-x-5 items-center">
              <img
                className="h-10 w-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png"
                alt=""
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {roomData?.name}
                </h3>
                <p className="text-xs font-semibold leading-3 text-indigo-600">
                  {roomData?.name ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <Phone />
              <Video />
              <EllipsisVertical />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
