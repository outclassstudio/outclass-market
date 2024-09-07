"use client";

import { editComment } from "@/app/posts/[id]/actions";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditComment({
  commentId,
  payload,
  postId,
}: {
  commentId: number;
  payload: string;
  postId: number;
}) {
  const [comment, setComment] = useState(payload);
  const router = useRouter();

  const handleEditComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleEditModalClose = () => {
    router.back();
  };

  const handleSaveComment = async () => {
    await editComment(commentId, comment, postId);
  };

  return (
    <div className="fixed h-screen w-full top-0 left-0 flex flex-col z-20">
      <div
        className="flex justify-between items-center
    w-full p-4 bg-neutral-900 border-b border-neutral-700"
      >
        <div className="flex items-center" onClick={handleEditModalClose}>
          <ChevronLeftIcon className="size-6 cursor-pointer" />
        </div>
        <div className="font-semibold">댓글 수정</div>
        <button onClick={handleSaveComment}>완료</button>
      </div>
      <textarea
        value={comment}
        onChange={handleEditComment}
        className="h-full bg-neutral-900 p-4
        border-none focus:border-none focus:ring-0"
      />
    </div>
  );
}
