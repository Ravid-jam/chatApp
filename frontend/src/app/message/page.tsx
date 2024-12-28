"use client";
import MainLayout from "@/pages/components/MainLayout";
import TextEditer from "@/pages/components/TextEditer";
import socket from "@/pages/components/utils/socket";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
export default function Page() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<any>();
  const [onlineUser, setOnlineUser] = useState<any[]>([]);
  const [allMessage, setAllMessage] = useState<any[]>([]);
  const [base64Files, setBase64Files] = useState<any[]>([]);

  const user = JSON.parse(Cookie.get("user") || "null");
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connection open");
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      console.log("Connection closed");
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      socket.emit("ADD_USER", user);
      socket.on("USER_ADDED", (data: any) => {
        setOnlineUser(data);
      });

      socket.on("RECEIVED_MSG", (data: any) => {
        setAllMessage((prev: any) => [...prev, data]);
      });
      socket.on("DELETED_MSG", (msg: any) => {
        setAllMessage((prev: any) =>
          prev.filter((data: any) => data._id !== msg.msg._id)
        );
      });
      socket.on("IS_DOWNLOADED_RESPONSE", (data: any) => {
        setAllMessage(data);
      });
    }
  }, [isConnected]);

  const handleSendMsg = (msg: string) => {
    if (isConnected) {
      const sender = user;
      user.socketId = socket.id;
      const data = {
        msg,
        sender,
        receiver: roomData,
      };
      socket.emit("SEND_MSG", data);
      setBase64Files([]);
    }
  };
  const handleDownloadImage = (data: any) => {
    if (isConnected) {
      socket.emit("IS_DOWNLOADED", data);
    }
  };

  const handleDeleteMsg = (messageId: string) => {
    try {
      axios
        .delete(`http://localhost:5000/api/deleteMsg/${messageId}`)
        .then((response) => {
          if (isConnected) {
            const data = {
              msg: response.data.data,
              receiver: roomData,
            };
            socket.emit("DELETE_MSG", data);
            setAllMessage((prev) =>
              prev.filter((item) => item._id !== response?.data?.data?._id)
            );
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <MainLayout
        onlineUser={onlineUser}
        roomData={roomData}
        setRoomData={setRoomData}
        setAllMessage={setAllMessage}
      >
        <TextEditer
          roomData={roomData}
          handleSendMsg={handleSendMsg}
          allMessage={allMessage}
          handleDeleteMsg={handleDeleteMsg}
          setBase64Files={setBase64Files}
          base64Files={base64Files}
          handleDownloadImage={handleDownloadImage}
        />
      </MainLayout>
    </div>
  );
}
