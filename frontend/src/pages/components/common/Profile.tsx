"use client";
import { Button } from "@/components/ui/button";
import Cookie from "js-cookie";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [loginUser, setLoginUser] = useState<any>(null);
  useEffect(() => {
    const user = JSON.parse(Cookie.get("user") || "null");
    setLoginUser(user);
  }, []);
  return (
    <div className="flex items-center w-full gap-4">
      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <img
          src={loginUser?.profile_pic?.url}
          className="h-12 w-12 rounded-full"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h1 className="text-md font-bold">{loginUser?.name}</h1>
        <h1 className="text-xs">{loginUser?.email}</h1>
      </div>
      <div>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto h-8 w-8"
          onClick={() => {
            Cookie.remove("user");
            Cookie.remove("token");
            router.push("/login");
          }}
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
