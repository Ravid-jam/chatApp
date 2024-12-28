"use client";

import { Dispatch, SetStateAction } from "react";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";

interface IMainLayoutProps {
  children: React.ReactNode;
  onlineUser?: any;
  setRoomData: Dispatch<SetStateAction<any>>;
  roomData: any;
  setAllMessage: Dispatch<SetStateAction<any[]>>;
}
export default function MainLayout(props: IMainLayoutProps) {
  return (
    <div className="grid min-h-screen w-full  md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
      <Sidebar
        onlineUser={props.onlineUser}
        setRoomData={props.setRoomData}
        setAllMessage={props.setAllMessage}
      />
      <div className="flex flex-col">
        {props.roomData !== undefined && (
          <Header
            onlineUser={props.onlineUser}
            roomData={props.roomData}
            setRoomData={props.setRoomData}
          />
        )}
        <main className="flex flex-1 flex-col  bg-white  bg-muted/50 gap-4 lg:gap-6">
          {props.children}
        </main>
      </div>
    </div>
  );
}
