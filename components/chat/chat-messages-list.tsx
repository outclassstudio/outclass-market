"use client";

import { InitialMessages, saveMessage } from "@/app/chats/[id]/actions";
import { formatToTimeAgo } from "@/lib/utils";
import { ArrowUpCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZGx0ZnR3Z2JkbnNwdmVwaW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2NjM2NjksImV4cCI6MjA0MDIzOTY2OX0.sS5aU00T5Q3noVU6-kzfoefm81JjS1PAh0CsH4VZ9Ks";
const SUPABASE_URL = "https://qndltftwgbdnspvepioy.supabase.co";

interface ChatMessagesListProps {
  initialMessages: InitialMessages;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar?: string;
}

export default function ChatMessagesList({
  initialMessages,
  userId,
  chatRoomId,
  username,
  avatar,
}: ChatMessagesListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages((prevMsg) => [
      ...prevMsg,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username: "ss",
          avatar: "xx",
        },
      },
    ]);
    await saveMessage(message, chatRoomId);
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
    });
    setMessage("");
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prev) => [...prev, payload.payload]);
      })
      .subscribe();

    // clean-up function
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 items-start ${
            userId === message.userId ? "justify-end" : ""
          }`}
        >
          {userId === message.userId ? null : message.user.avatar ? (
            <Image
              src={`${message.user.avatar!}/avatar`}
              alt={message.user.username}
              width={40}
              height={40}
              className="rounded-full size-10 overflow-hidden"
            />
          ) : (
            <UserIcon className="size-10" />
          )}
          <div
            className={`flex flex-col gap-1 ${
              userId === message.userId ? "items-end" : ""
            }`}
          >
            <span
              className={`${
                userId === message.userId ? "bg-orange-500" : "bg-neutral-500"
              } p-2.5 rounded-md`}
            >
              {message.payload}
            </span>
            <span className="text-xs flex">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
      <form onSubmit={onSubmit} className="flex relative items-center">
        <input
          required
          onChange={onChange}
          value={message}
          type="text"
          name="message"
          placeholder="채팅을 입력해주세요"
          autoComplete="off"
          className="bg-transparent rounded-2xl w-full h-12 
          focus:outline-none px-5 ring-2 focus:ring-4 transition 
          ring-neutral-200 focus:ring-neutral-50  border-none 
          placeholder:text-neutral-400"
        />
        <button className="absolute right-2">
          <ArrowUpCircleIcon className="size-10 text-orange-600 transition-colors hover:text-orange-400" />
        </button>
      </form>
    </div>
  );
}
