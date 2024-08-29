"use client";

import { SaveProfile } from "@/app/(tabs)/profile/edit/actions";
import { GetUserData } from "@/app/(tabs)/profile/edit/page";
import {
  CameraIcon,
  ChevronLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProfileHeader from "./profile-header";

interface ProfileEditInputProps {
  user: GetUserData;
}

export default function ProfileEditInput({ user }: ProfileEditInputProps) {
  const [username, setUsername] = useState(user?.username);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      await SaveProfile(username);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-full px-3"
    >
      {/* 이 짓을 꼭 해야하나 */}
      <div className="w-full relative">
        <ProfileHeader title="프로필 수정" />
        <button className="text-neutral-300 absolute top-[19px] right-2">
          완료
        </button>
      </div>
      <label htmlFor="avatar" className="relative pt-6 pb-4 cursor-pointer">
        {user?.avatar ? (
          <Image
            className="rounded-full overflow-hidden p-1.5"
            src={user.avatar}
            alt=""
            width={96}
            height={96}
          />
        ) : (
          <UserCircleIcon className="size-24 text-neutral-300" />
        )}
        <CameraIcon
          className="bg-white p-[2px] size-6 absolute right-4 bottom-6 
      text-neutral-800 rounded-full border-[1px] border-neutral-400"
        />
        <input id="avatar" type="file" className="hidden" />
      </label>
      <div className="w-full flex flex-col gap-2">
        <div>닉네임</div>
        <input
          onChange={onChange}
          type="text"
          value={username}
          className="w-full bg-transparent rounded-md ring-2 ring-neutral-500
    border-none outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </div>
    </form>
  );
}
