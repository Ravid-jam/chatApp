"use client";
import MessageImages from "@/app/message/MessageImages";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import Cookie from "js-cookie";
import {
  CornerDownLeft,
  EllipsisVertical,
  Mic,
  Paperclip,
  Pause,
  Trash2,
  X,
} from "lucide-react";
import moment from "moment-timezone";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { fileToBase64 } from "../../utils/utils";
const schema = yup
  .object({
    message: yup.string(),
  })
  .required();
export default function TextEditor({
  roomData,
  allMessage,
  handleDeleteMsg,
  base64Files,
  setBase64Files,
  handleSendMsg,
  handleDownloadImage,
}: {
  roomData: any;
  allMessage: any[];
  handleDeleteMsg: any;
  base64Files: any[];
  setBase64Files: Dispatch<SetStateAction<any[]>>;
  handleSendMsg: (msg: string) => void;
  handleDownloadImage: (data: any) => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const messageEndRef = useRef<any>(null);
  const onSubmit = async (data: any) => {
    handleSendMsg({ ...data, image: base64Files });
    reset();
  };
  const user = JSON.parse(Cookie.get("user") || "null");
  const currentDy = (createdAt: any) => {
    const formattedDate = moment(createdAt)
      .tz("Asia/Kolkata")
      .format("D/M/YYYY");
    const isToday = moment(createdAt).isSame(moment(), "day");
    const day = isToday ? "Today" : formattedDate;
    return day;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: any = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob: any = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        setAudioURL(URL.createObjectURL(audioBlob));
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Unable to access the microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessage]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);

      try {
        const base64Array = await Promise.all(
          selectedFiles.map((file) => fileToBase64(file))
        );

        setBase64Files(base64Array);
      } catch (error) {
        console.error("Error converting files to Base64:", error);
      }
    }
  };
  return (
    <>
      {roomData === undefined ? (
        <div>
          <div className="p-4 h-screen flex flex-col gap-7 justify-center items-center">
            <h1 className="text-indigo-600 text-3xl font-extrabold">
              Welcome To Jam Chat App
            </h1>
            <img
              alt="logo"
              src="/assets/welcome.svg"
              className="h-[60%]  w-[70%]"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full bg-[url('/assets/sidebar.png')] overflow-hidden">
          <div className="h-[calc(100vh_-_190px)] overflow-y-auto flex flex-col p-4 gap-10">
            {allMessage &&
              allMessage?.map((message: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex justify-center">
                    <span className="bg-[#f0f2f5]  p-2 text-sm rounded-lg">
                      {currentDy(message.createdAt)}
                    </span>
                  </div>
                  <div
                    className={`${
                      message.sender._id === user._id
                        ? "flex justify-end"
                        : "flex justify-start"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <img
                        className="w-10 h-10 flex-shrink-0 rounded-full"
                        src="https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png"
                        alt="User image"
                      />

                      {message?.image?.length > 0 ? (
                        <div
                          className={`flex flex-col w-full max-w-[326px] leading-1.5 p-4 ${
                            message.sender._id === user._id
                              ? "bg-[#d9fdd3] border-black"
                              : "bg-white border border-gray-100 "
                          } 
                        rounded-e-xl rounded-es-xl`}
                        >
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {message.sender._id === user._id
                                ? "You"
                                : message.sender.name}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              11:46
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {message.msg}
                          </p>
                          <MessageImages
                            message={message}
                            handleDownloadImage={handleDownloadImage}
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              Delivered
                            </span>
                            <button className="text-sm text-blue-700 dark:text-blue-500 font-medium inline-flex items-center hover:underline">
                              <svg
                                className="w-3 h-3 me-1.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                />
                              </svg>
                              Save all
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`flex flex-col w-full min-w-max p-4  ${
                            message.sender._id === user._id
                              ? "bg-[#d9fdd3] border-black"
                              : "bg-white border border-gray-100 "
                          }  rounded-e-xl rounded-es-xl`}
                        >
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {message.sender._id === user._id
                                ? "You"
                                : message.sender.name}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {moment(message.createdAt)
                                .tz("Asia/Kolkata")
                                .format("hh:mm A")}
                            </span>
                          </div>
                          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                            {message.msg}
                          </p>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Delivered
                          </span>
                        </div>
                      )}
                      {message.sender._id === user._id && (
                        <div className="cursor-pointer">
                          <Popover>
                            <PopoverTrigger asChild>
                              <EllipsisVertical className="h-5 w-5" />
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                              <div className="flex flex-col gap-2">
                                <div className="flex gap-2.5 items-center cursor-pointer">
                                  <Mic className="h-5 w-5" />
                                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Mute
                                  </span>
                                </div>
                                <div
                                  className="flex gap-2.5 items-center cursor-pointer"
                                  onClick={() => {
                                    handleDeleteMsg(message._id);
                                  }}
                                >
                                  <Trash2 className="h-5 w-5 text-red-500" />
                                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                      <div ref={messageEndRef} />
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
          <div className="pb-2 px-3">
            {audioURL && (
              <div className="bg-white p-2 rounded-lg">
                <div>
                  <h2 className="text-base font-semibold">Recorded Audio</h2>
                  <audio controls src={audioURL} className="w-full" />
                </div>
              </div>
            )}
            {base64Files && base64Files.length > 0 && (
              <div className="w-full relative">
                <div className="fixed bottom-32 ">
                  <div className="bg-white w-full rounded-md mb-1 p-4 flex gap-4">
                    {base64Files.map((file, index) => (
                      <div key={index} className="h-20 w-20  relative group ">
                        <img
                          src={file}
                          alt={`Uploaded ${index}`}
                          className="rounded shadow object-cover h-full w-full"
                        />

                        <button
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center shadow hover:bg-red-600 focus:outline-none"
                          aria-label="Remove Image"
                          onClick={() => {
                            const updatedFiles = base64Files.filter(
                              (_, i) => i !== index
                            );
                            setBase64Files(updatedFiles);
                          }}
                        >
                          <X />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>

                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  {...register("message")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
                <div className="flex items-center p-3 pt-0">
                  <div className="space-y-4"></div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handleFileClick();
                        }}
                      >
                        <Paperclip className="size-4" />

                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {!isRecording ? (
                        <button
                          onClick={startRecording}
                          className="px-4 py-2  text-black rounded"
                        >
                          <Mic className="size-4" />
                        </button>
                      ) : (
                        <button
                          onClick={stopRecording}
                          className="px-4 py-2  text-black rounded"
                        >
                          <Pause className="size-4" />
                        </button>
                      )}
                    </TooltipTrigger>
                  </Tooltip>
                  <Button type="submit" size="sm" className="ml-auto gap-1.5">
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
