import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

interface PostProps {
  post: {
    id: number;
    title: string;
    description: string | null;
    created_at: Date;
    _count: {
      likes: number;
      comments: number;
    };
    views: number;
  };
}

export default function SinglePostBox({ post }: PostProps) {
  return (
    <Link
      key={post.id}
      href={`/posts/${post.id}`}
      className="pb-5 mb-5 border-b border-neutral-700 text-neutral-400
  flex gap-5 last:pb-0 last:border-b-0 items-center"
    >
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-white text-xl font-semibold">{post.title}</h2>
        <p>{post.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-4 items-center">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
            <span>.</span>
            <span>조회 {post.views}</span>
          </div>
          <div
            className="flex gap-4 items-center 
    *:flex *:items-center *:gap-1"
          >
            <span>
              <HandThumbUpIcon className="size-4" />
              {post._count.likes}
            </span>
            <span>
              <ChatBubbleBottomCenterIcon className="size-4" />
              {post._count.comments}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
