"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

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
