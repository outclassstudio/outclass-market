"use client";

import { editComment } from "@/app/posts/[id]/actions";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

interface EditModalProps {
  handleEditModalClose: () => void;
  commentId: number;
  payload: string;
  postId: number;
}

export default function EditCommentModal({
  handleEditModalClose,
  commentId,
  payload,
  postId,
}: EditModalProps) {
  const [comment, setComment] = useState(payload);

  const handleEditComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSaveComment = async () => {
    await editComment(commentId, comment, postId);
    window.location.reload();
  };

  return (
    <div
      className="fixed h-screen w-full top-0 left-0 flex flex-col z-20
    animate-slideinY"
    >
      <div
        className="flex justify-between items-center
    w-full p-4 bg-neutral-900 border-b border-neutral-700"
      >
        <div className="flex items-center" onClick={handleEditModalClose}>
          <ChevronLeftIcon className="size-6 cursor-pointer" />
        </div>
        <div className="font-semibold">댓글 수정</div>
        <div className="cursor-pointer" onClick={handleSaveComment}>
          완료
        </div>
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
