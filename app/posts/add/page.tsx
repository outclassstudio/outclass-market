"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFormState } from "react-dom";
import { uploadPost } from "./action";
import PostInput from "@/components/life/post-input";

export default function AddPost() {
  const [preview, setPreview] = useState("");
  const [state, dispatch] = useFormState(uploadPost, null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <form action={dispatch} className="flex flex-col gap-5 p-5">
      <label
        htmlFor="photo"
        className="border-2 aspect-square flex flex-col items-center justify-center 
          text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer
          bg-center bg-cover"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        {preview ? null : (
          <>
            <PhotoIcon className="w-20" />
            <div className="text-neutral-400 text-sm r">
              사진을 추가해주세요
              {/* {state?.fieldErrors.photo} */}
            </div>
          </>
        )}
      </label>
      <input
        onChange={onImageChange}
        type="file"
        id="photo"
        name="photo"
        className="hidden"
      />
      <Input
        name="title"
        type="text"
        required
        placeholder="제목"
        // errors={state?.fieldErrors.title}
      />
      <PostInput
        name="post"
        required
        placeholder="내용"
        // errors={state?.fieldErrors.description}
      />
      <Button text="작성 완료" />
    </form>
  );
}
