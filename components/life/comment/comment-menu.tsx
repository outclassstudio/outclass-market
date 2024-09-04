"use client";

import { deleteComment } from "@/app/posts/[id]/actions";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface CommentMenuProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  commentId: number;
  postId: number;
  handleEditModalOpen: () => void;
}

export default function CommentMenu({
  setIsEdit,
  commentId,
  postId,
  handleEditModalOpen,
}: CommentMenuProps) {
  const router = useRouter();
  const handleModalOpen = () => {
    setIsEdit(false);
  };
  const handleCommentEdit = () => {};
  // const handleEditModalOpen = () => {
  //   console.log("흠?");
  //   // redirect(`/posts/${postId}/edit`);
  //   router.push(`/posts/${postId}/edit`);
  // };
  const handleCommentDelete = async () => {
    // console.log("작동");
    await deleteComment(commentId);
  };

  return (
    <div className="flex flex-col h-screen w-full z-20 fixed top-0 left-0 justify-end">
      <div
        onClick={handleModalOpen}
        className="bg-neutral-700 opacity-40 h-full"
      />
      <div
        className="flex flex-col bg-white shadow-lg rounded-t-xl
         *:text-center *:py-4 *:border-b *:border-neutral-100 *:cursor-pointer"
      >
        <div className="text-neutral-800" onClick={handleEditModalOpen}>
          수정
        </div>
        <div className="text-red-500" onClick={handleCommentDelete}>
          삭제
        </div>

        <div onClick={handleModalOpen} className="text-neutral-800">
          닫기
        </div>
      </div>
    </div>
  );
}
