"use client";

import { saveComment } from "@/app/posts/[id]/actions";
import { InitialComments } from "@/app/posts/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

interface CommentInputProps {
  initialComments: InitialComments;
  userId: number;
  postId: number;
  username: string;
  avatar: string;
  postUserId: number;
}

export default function CommentInput({
  initialComments,
  userId,
  postId,
  username,
  avatar,
  postUserId,
}: CommentInputProps) {
  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = comments[comments.length - 1].id + 1;
    setComments((prevMsg) => [
      ...prevMsg,
      {
        id: newId,
        payload: comment,
        created_at: new Date(),
        userId,
        postId,
        user: {
          username,
          avatar,
        },
      },
    ]);
    await saveComment(comment, userId, postId);
    setComment("");
  };

  return (
    <div className="flex flex-col gap-5 mb-[90px]">
      {comments.map((comment) => (
        <div className="flex gap-3" key={comment.id}>
          <div className="pt-1">
            {comment.user.avatar ? (
              <Image src={comment.user.avatar} alt="" width={28} height={28} />
            ) : (
              <UserCircleIcon className="size-8" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{comment.user.username}</span>
              {comment.userId === postUserId ? (
                <span className="text-xs bg-neutral-600 p-1 rounded-sm">
                  작성자
                </span>
              ) : null}
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
              <span className="flex gap-1.5 items-center text-neutral-400">
                <ChatBubbleOvalLeftIcon className="size-4" />
                <span>답글쓰기 {}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
      <div
        className="fixed bottom-0 left-0 w-full px-4 py-3 border-t
      border-neutral-800 bg-neutral-900 z-10"
      >
        <form onSubmit={onSubmit} className="flex gap-4 items-center">
          <input
            required
            onChange={onChange}
            value={comment}
            type="text"
            name="message"
            placeholder="댓글을 입력해주세요"
            autoComplete="off"
            maxLength={140}
            className="bg-neutral-800 rounded-full w-full h-12 
          focus:outline-none px-5 ring-1 transition border-none
          ring-neutral-800 focus:ring-neutral-700 placeholder:text-neutral-300"
          />
          <button>
            <PaperAirplaneIcon className="size-10 text-neutral-400 transition-colors hover:text-orange-300" />
          </button>
        </form>
      </div>
    </div>
  );
}
