"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFormState } from "react-dom";
import { uploadPost } from "./action";
import Textarea from "@/components/common/textarea";

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
      <input
        onChange={onImageChange}
        type="file"
        id="photo"
        name="photo"
        className="hidden"
      />
      <div className="flex flex-col gap-3">
        <div className="font-bold text-neutral-200">제목</div>
        <Input
          name="title"
          type="text"
          required
          placeholder="제목"
          // errors={state?.fieldErrors.title}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-neutral-200">내용</div>
        <Textarea
          name="post"
          required
          placeholder="내용"
          // errors={state?.fieldErrors.description}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-neutral-200">사진첨부</div>
        <div className="flex gap-5">
          <label
            htmlFor="photo"
            className="border-2 size-16 sm:size-20 aspect-square flex flex-col items-center justify-center 
          text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer
          p-2"
          >
            <PhotoIcon />
          </label>
          {preview ? (
            <div
              className="bg-center bg-cover size-16 sm:size-20 rounded-md relative
              ring-[1px] ring-neutral-300"
              style={{
                backgroundImage: `url(${preview})`,
              }}
            >
              <div
                className="absolute bottom-0 bg-black opacity-70 w-16 h-6 sm:w-20 sm:h-8 rounded-b-md
              text-xs sm:text-sm flex justify-center items-center"
              >
                대표사진
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <div className="text-neutral-400 text-sm">
          {state?.fieldErrors.photo}
        </div> */}
      </div>
      <Button text="작성 완료" />
    </form>
  );
}
