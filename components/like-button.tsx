"use client";

import { HandThumbUpIcon as HandThumbUpSolid } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpOutline } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/posts/[id]/actions";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prev, payload) => ({
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    })
  );

  const onClick = async () => {
    reducerFn(null);
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400
    text-sm border border-neutral-400 rounded-full p-2
    ${
      state.isLiked
        ? "bg-orange-500 text-white border-orange-500"
        : "hover:bg-neutral-800 transition-colors"
    }`}
    >
      {state.isLiked ? (
        <HandThumbUpSolid className="size-5" />
      ) : (
        <HandThumbUpOutline className="size-5" />
      )}
      {isLiked ? (
        <span>{state.likeCount}</span>
      ) : (
        <span>좋아요 ({state.likeCount})</span>
      )}
    </button>
  );
}
