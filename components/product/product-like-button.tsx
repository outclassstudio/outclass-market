"use client";

import {
  dislikeProduct,
  likeProduct,
} from "@/app/(products)/products/[id]/actions";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  productId: number;
}

export default function ProductLikeButton({
  isLiked,
  productId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic({ isLiked }, (prev, payload) => ({
    isLiked: !prev.isLiked,
  }));

  const onClick = async () => {
    reducerFn(null);
    if (isLiked) {
      await dislikeProduct(productId);
    } else {
      await likeProduct(productId);
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 transition-colors`}
    >
      {state.isLiked ? (
        <HeartIconSolid className="size-6 text-red-400" />
      ) : (
        <HeartIconOutline className="size-6 text-neutral-400" />
      )}
    </button>
  );
}
