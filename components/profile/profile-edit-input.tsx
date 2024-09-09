"use client";

import { saveProfile } from "@/app/(tabs)/profile/edit/actions";
import { GetUserData } from "@/app/(tabs)/profile/edit/page";
import { CameraIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ProfileHeader from "./profile-header";
import { getUploadUrl } from "@/app/(products)/add/actions";
import { USER_ICON_ID, USER_ICON_URL } from "@/lib/constants";

interface ProfileEditInputProps {
  user: GetUserData;
}

export default function ProfileEditInput({ user }: ProfileEditInputProps) {
  const [username, setUsername] = useState(user?.username);
  const [preview, setPreview] = useState(`${user?.avatar}/avatar`);
  const [avatarURL, setAvatarURL] = useState("");
  const [avatarID, setAvatarID] = useState(`${user?.avatar?.split("/")[4]}`);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      if (avatarID !== USER_ICON_ID) {
        const cloudflareForm = new FormData();
        cloudflareForm.append("file", file!);
        const response = await fetch(avatarURL, {
          method: "post",
          body: cloudflareForm,
        });
        if (response.status !== 200) {
          return;
        }
      }

      const photoUrl = `https://imagedelivery.net/BeIKmnUeqh2uGk7c6NSanA/${avatarID}`;
      const result = await saveProfile(username, photoUrl);
      if (result) {
        setErrors(result.formErrors);
      }
    } else {
      setErrors(["빈칸이에요"]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setAvatarURL(uploadURL);
      setAvatarID(id);
    }
  };

  const changeToUserIcon = () => {
    if (preview === USER_ICON_URL) return;
    setAvatarID(USER_ICON_ID);
    setPreview(`${USER_ICON_URL}/width=150,height=150`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-full px-3"
    >
      <div className="w-full relative">
        <ProfileHeader title="프로필 수정" />
        <button className="text-neutral-300 absolute top-[19px] right-2">
          완료
        </button>
      </div>
      <label htmlFor="avatar" className="relative pt-6 pb-4 cursor-pointer">
        {preview ? (
          <div
            className="w-24 h-24 rounded-full m-2 overflow-hidden bg-center bg-cover"
            style={{ backgroundImage: `url(${preview})` }}
          />
        ) : (
          <UserCircleIcon className="size-28 text-neutral-300" />
        )}
        <CameraIcon
          className="bg-white p-[2px] size-6 absolute right-4 bottom-6 
      text-neutral-800 rounded-full border-[1px] border-neutral-400"
        />
        <input
          id="avatar"
          type="file"
          onChange={onImageChange}
          className="hidden"
        />
      </label>
      {/* 삭제 로직 정비 */}
      <div
        className="mb-5 cursor-pointer text-neutral-300
      text-sm hover:text-neutral-100"
        onClick={changeToUserIcon}
      >
        이미지 삭제
      </div>
      <div className="w-full flex flex-col gap-2">
        <div>닉네임</div>
        <input
          onChange={onChange}
          type="text"
          value={username}
          className="w-full bg-transparent rounded-md ring-2 ring-neutral-500
    border-none outline-none focus:ring-2 focus:ring-neutral-400"
        />
        {errors.map((error, index) => (
          <span key={index} className="text-red-500 font-medium">
            {error}
          </span>
        ))}
      </div>
    </form>
  );
}
