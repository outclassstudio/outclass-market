"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
      _count: {
        select: {
          productLikes: true,
          chatrooms: true,
        },
      },
    },
    skip: 6 * page,
    take: 6,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
      _count: {
        select: {
          productLikes: true,
          chatrooms: true,
        },
      },
    },
    take: 6,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;
