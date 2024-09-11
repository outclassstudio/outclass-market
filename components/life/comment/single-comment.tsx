"use client";

import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import CommentMenu from "./comment-menu";
import EditCommentModal from "./edit-comment-modal";

interface SingleCommentProps {
  comment: {
    id: number;
    payload: string;
    created_at: Date;
    userId: number;
    postId: number;
    user: {
      username: string;
      avatar: string | null;
    };
  };
  userId: number;
  postUserId: number;
  onDelete: (id: number) => void;
}

export default function SingleComment({
  comment,
  userId,
  postUserId,
  onDelete,
}: SingleCommentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleEditModalOpen = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex gap-3">
      <div className="pt-1">
        {comment.user.avatar ? (
          <Image
            src={`${comment.user.avatar}/avatar`}
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full"
          />
        ) : (
          <UserCircleIcon className="size-8" />
        )}
      </div>
      <div className="flex flex-col gap-1 w-full relative">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span className="font-semibold">{comment.user.username}</span>
            {comment.userId === postUserId ? (
              <span className="text-xs bg-neutral-600 p-1 rounded-sm">
                작성자
              </span>
            ) : null}
          </div>
          {comment.userId === userId ? (
            <div className="*:text-neutral-400 flex gap-1 items-center *:cursor-pointer">
              <EllipsisVerticalIcon
                onClick={handleModalOpen}
                className="size-5"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="text-xs text-neutral-400">
          {formatToTimeAgo(comment.created_at.toString())}
        </div>
        <div className="text-lg">{comment.payload}</div>
        <div className="flex gap-4 mt-1.5">
          <span className="flex gap-1.5 items-center text-neutral-400">
            <HandThumbUpIcon className="size-4" />
            <span>좋아요 {}</span>
          </span>
          <span className={`flex gap-1.5 items-center text-neutral-400`}>
            <ChatBubbleOvalLeftIcon className="size-4" />
            <span>답글쓰기 {}</span>
          </span>
        </div>
      </div>
      {isModalOpen ? (
        <CommentMenu
          onDelete={onDelete}
          setIsEdit={setIsModalOpen}
          commentId={comment.id}
          handleEditModalOpen={handleEditModalOpen}
        />
      ) : (
        ""
      )}
      {isEditModalOpen ? (
        <EditCommentModal
          handleEditModalClose={handleEditModalClose}
          commentId={comment.id}
          payload={comment.payload}
          postId={comment.postId}
        />
      ) : (
        ""
      )}
    </div>
  );
}
