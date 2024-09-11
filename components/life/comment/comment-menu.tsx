"use client";

import { deleteComment } from "@/app/posts/[id]/actions";
import { Dispatch, SetStateAction, useState } from "react";

interface CommentMenuProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  commentId: number;
  handleEditModalOpen: () => void;
  onDelete: (id: number) => void;
}

export default function CommentMenu({
  setIsEdit,
  commentId,
  onDelete,
  handleEditModalOpen,
}: CommentMenuProps) {
  const [checkDelete, setCheckDelete] = useState(false);

  const handleModalOpen = () => {
    setIsEdit(false);
  };

  const handleCheckDelete = () => {
    setCheckDelete((prev) => !prev);
  };

  const handleCommentDelete = async () => {
    onDelete(commentId);
    await deleteComment(commentId);
    handleModalOpen();
  };

  return (
    <div className="flex flex-col h-screen w-full z-20 fixed top-0 left-0 justify-end items-center">
      <div
        onClick={handleModalOpen}
        className="bg-neutral-700 opacity-40 h-full w-full"
      />
      <div
        className="fixed bottom-0 flex flex-col bg-white shadow-lg rounded-t-xl w-full sm:w-[640px]
         *:text-center  *:border-b *:border-neutral-100 *:cursor-pointer"
      >
        <div className="text-neutral-800 py-4" onClick={handleEditModalOpen}>
          수정
        </div>
        {checkDelete ? (
          <div className="flex gap-3 justify-center items-center *:text-white py-3">
            <span
              className="px-3 py-1 bg-red-500"
              onClick={handleCommentDelete}
            >
              확인
            </span>
            <span
              className="px-3 py-1 bg-neutral-800"
              onClick={handleCheckDelete}
            >
              취소
            </span>
          </div>
        ) : (
          <div className="text-red-500 py-4" onClick={handleCheckDelete}>
            삭제
          </div>
        )}
        <div onClick={handleModalOpen} className="text-neutral-800 py-4">
          닫기
        </div>
      </div>
    </div>
  );
}
