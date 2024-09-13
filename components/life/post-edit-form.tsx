"use client";

import Input from "@/components/common/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Textarea from "@/components/common/textarea";
import { InitialPostType } from "@/app/posts/edit/[id]/page";
import { notFound } from "next/navigation";
import { editPost } from "@/app/posts/edit/[id]/actions";
import { useRouter } from "next/navigation";

interface PostEditProps {
  initialPost: InitialPostType;
}

export default function PostEditForm({ initialPost }: PostEditProps) {
  const [title, setTitle] = useState(initialPost?.title);
  const [content, setContent] = useState(initialPost?.description);
  const [preview, setPreview] = useState("");
  const [isTitleBlank, setIsTitleBlank] = useState(false);
  const [isContentBlank, setIsContentBlank] = useState(false);
  const [pending, setPendig] = useState(false);
  const router = useRouter();
  if (!initialPost) return notFound();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsTitleBlank(true);
    } else {
      setIsTitleBlank(false);
    }
    setTitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === "") {
      setIsContentBlank(true);
    } else {
      setIsContentBlank(false);
    }
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && content) {
      setPendig(true);
      const result = await editPost(initialPost.id, title, content);
      if (result) {
        router.push(`/posts/${initialPost.id}`);
      }
    }
  };

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
        <div className="flex gap-2 items-center">
          <div className="font-bold text-neutral-200">제목</div>
          {isTitleBlank ? (
            <div className="text-red-500 text-sm">제목은 필수에요</div>
          ) : (
            ""
          )}
        </div>
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
        <div className="flex gap-2 items-center">
          <div className="font-bold text-neutral-200">내용</div>
          {isContentBlank ? (
            <div className="text-red-500 text-sm">내용은 필수에요</div>
          ) : (
            ""
          )}
        </div>
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
      <button
        disabled={pending}
        className="primary-btn h-10 
    disabled:bg-neutral-400 disabled:text-neutral-300
    disabled:cursor-not-allowed"
      >
        {pending ? "로딩중..." : "수정 완료"}
      </button>
    </form>
  );
}
