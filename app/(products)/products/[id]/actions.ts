"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const likeProduct = async (productId: number) => {
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
};

export const dislikeProduct = async (productId: number) => {
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
};
