"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFormState } from "react-dom";
// import { uploadPost } from "./action";
import Textarea from "@/components/common/textarea";
import { InitialPostType } from "@/app/posts/edit/[id]/page";
import { notFound } from "next/navigation";

interface PostEditProps {
  initialPost: InitialPostType;
}

export default function PostEditForm({ initialPost }: PostEditProps) {
  if (!initialPost) return notFound();

  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.description);
  const [preview, setPreview] = useState("");
  // const [state, dispatch] = useFormState(uploadPost, null);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <form className="flex flex-col gap-5 p-5" onSubmit={onSubmit}>
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
          type="text"
          name="title"
          value={title}
          required
          placeholder="제목"
          onChange={onTitleChange}
          // errors={state?.fieldErrors.title}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-neutral-200">내용</div>
        <Textarea
          name="content"
          value={content!}
          required
          placeholder="내용"
          onChange={onContentChange}
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
