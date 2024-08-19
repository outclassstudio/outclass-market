"use client";

import {
  HomeIcon as SoildHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SoildVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div
      className="fixed bottom-0 left-0 right-0 mx-auto max-w-screen-md w-full grid grid-cols-5 
    border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800"
    >
      <Link className="flex flex-col items-center gap-px" href="/products">
        {pathname === "/products" ? (
          <SoildHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}

        <span>홈</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/life">
        {pathname === "/life" ? (
          <SolidNewspaperIcon className="w-7 h-7" />
        ) : (
          <OutlineNewspaperIcon className="w-7 h-7" />
        )}

        <span>동네생활</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/chat">
        {pathname === "/chat" ? (
          <SolidChatIcon className="w-7 h-7" />
        ) : (
          <OutlineChatIcon className="w-7 h-7" />
        )}

        <span>채팅</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/live">
        {pathname === "/live" ? (
          <SoildVideoCameraIcon className="w-7 h-7" />
        ) : (
          <OutlineVideoCameraIcon className="w-7 h-7" />
        )}

        <span>쇼핑</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/profile">
        {pathname === "/profile" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}

        <span>나의 당근</span>
      </Link>
    </div>
  );
}
