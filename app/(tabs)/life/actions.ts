"use server";

import db from "@/lib/db";

export async function getMorePosts(page: number) {
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
    skip: 6 * page,
    take: 6,
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}

export async function getPosts() {
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
    take: 6,
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}
