import axios from "axios";
import Cookie from "js-cookie";
import { Dispatch, SetStateAction } from "react";

export default function AllUserList({
  onlineUser,
  setRoomData,
  setAllMessage,
}: {
  onlineUser: any;
  setRoomData: Dispatch<SetStateAction<any>>;
  setAllMessage: Dispatch<SetStateAction<any>>;
}) {
  const user = JSON.parse(Cookie.get("user") || "null");
  return (
    <div className="overflow-auto divide-y flex flex-col gap-1 divide-black/20">
      {onlineUser
        ?.filter((exits: any) => exits._id !== user._id)
        ?.map((items: any, index: number) => (
          <div
            key={index}
            onClick={async () => {
              setRoomData(items);
              try {
                const res = await axios.get(
                  `https://chat-app-indol-two-24.vercel.app/api/getMessage/${user._id}/${items._id}`
                );
                setAllMessage(res?.data?.data);
              } catch (err) {
                console.log("Error", err);
                alert("Failed to connect to the server");
              }
            }}
            className=" bg-white hover:hover:bg-[#f0f2f5] px-3 flex justify-between cursor-pointer items-center gap-x-3 p-2"
          >
            <div className="flex gap-x-5 items-center">
              <img
                className="h-10 w-10 rounded-full"
                src={items?.profile_pic?.url}
                alt=""
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {items.name}
                </h3>
                <p className="text-xs font-semibold leading-3 text-indigo-600">
                  {items.name ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <span className="text-sm text-white  text-center rounded-full bg-green-700 w-6 h-6   p-[2px]">
              3
            </span>
          </div>
        ))}
    </div>
  );
}
