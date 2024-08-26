import { InitialPosts } from "@/app/(tabs)/life/page";
import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface PostsListProps {
  posts: InitialPosts;
}

export default function PostList({ posts }: PostsListProps) {
  return (
    <div className="p-5 flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400
          flex gap-5 last:pb-0 last:border-b-0 items-center"
        >
          <div className="aspect-ratio border-2 p-4 border-neutral-500 border-dashed">
            <PhotoIcon className="w-16" />
          </div>
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
      ))}
    </div>
  );
}
