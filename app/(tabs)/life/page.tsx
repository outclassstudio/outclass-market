import PostList from "@/components/life/post-list";
import db from "@/lib/db";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}

export const metadata = {
  title: "동네생활",
};

export type InitialPosts = Prisma.PromiseReturnType<typeof getPosts>;

export default async function Life() {
  const posts = await getPosts();

  return (
    <div>
      <PostList posts={posts} />
      <Link
        href="/posts/add"
        className="bg-orange-500 flex items-center justify-center 
        rounded-full size-16 fixed bottom-24 right-8 text-white
        transition-colors hover:bg-orange-400 shadow-lg shadow-neutral-800"
      >
        <PencilSquareIcon className="size-9" />
      </Link>
    </div>
  );
}
