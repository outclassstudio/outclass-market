"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const payloadSchema = z.string().max(140, "댓글은 140자까지 가능해요");
export const saveComment = async (
  payload: string,
  userId: number,
  postId: number
) => {
  const result = payloadSchema.safeParse(payload);
  if (result.success) {
    await db.comment.create({
      data: {
        payload: result.data,
        userId,
        postId,
      },
    });
  } else {
    return result.error.flatten();
  }
};

//? function을 못쓰나?
export const getPost = async (id: number) => {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
};

export const getComments = async (postId: number, sort = true) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      postId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    // orderBy: {
    //   created_at: sort ? "desc" : "asc",
    // },
  });
  return comments;
};

// const sortDesc = async () => {
//   "use server";
//   comments = await getComments(id, true);
// };
// const sortAsc = async () => {
//   "use server";
//   comments = await getComments(id, false);
// };

export const getLikeStatus = async (postId: number, userId: number) => {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
};

export const likePost = async (postId: number) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
};

export const dislikePost = async (postId: number) => {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
};

export const editComment = async (
  commentId: number,
  payload: string,
  postId: number
) => {
  try {
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        payload,
      },
    });
  } catch (e) {}
  // redirect(`/posts/${postId}`);
};

export const deleteComment = async (commentId: number) => {
  try {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (e) {}
};

export type InitialComments = Prisma.PromiseReturnType<typeof getComments>;
