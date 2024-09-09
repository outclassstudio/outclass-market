"use client";

import { getUploadUrl } from "@/app/(products)/add/actions";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";

interface EditPhotoProps {
  url: string;
  name: string;
}

export default function EditPhoto({ url, name }: EditPhotoProps) {
  const [preview, setPreview] = useState(url);

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
  };

  return (
    <>
      <label
        htmlFor="photo"
        className="mt-[30px] border-2 aspect-square flex flex-col items-center justify-center 
  text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer
  bg-center bg-cover m-5"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <PhotoIcon className="w-20" />
        <div className="text-white text-sm">
          사진 수정을 원하시면 여기를 눌러주세요
          {/* {state?.fieldErrors.photo} */}
        </div>
      </label>
      <input
        onChange={onImageChange}
        type="file"
        id="photo"
        name={name}
        className="hidden"
      />
    </>
  );
}
