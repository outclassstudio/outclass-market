"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      chatrooms: {
        include: {
          users: true,
        },
      },
      _count: {
        select: {
          productLikes: true,
        },
      },
    },
  });

  return product;
}

export async function getLikeStatus(productId: number, userId: number) {
  const isLiked = await db.productLike.findUnique({
    where: {
      id: {
        productId,
        userId,
      },
    },
  });
  return {
    isLiked: Boolean(isLiked),
  };
}

export async function likeProduct(productId: number) {
  const session = await getSession();
  try {
    await db.productLike.create({
      data: {
        productId,
        userId: session.id!,
      },
    });
    revalidateTag(`product-like-status-${productId}`);
  } catch (e) {}
}

export async function dislikeProduct(productId: number) {
  const session = await getSession();
  try {
    await db.productLike.delete({
      where: {
        id: {
          productId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`product-like-status-${productId}`);
  } catch (e) {}
}

export type ProductType = Prisma.PromiseReturnType<typeof getProduct>;
