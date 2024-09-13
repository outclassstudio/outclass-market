"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function editPost(id: number, title: string, content: string) {
  try {
    const result = await db.post.update({
      where: {
        id,
      },
      data: {
        title,
        description: content,
      },
      select: {
        id: true,
      },
    });
    revalidateTag("posts");
    return result;
  } catch (e) {}
}

export async function deletePost(id: number) {
  try {
    const result = await db.post.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    return result;
  } catch (e) {}
  revalidateTag("posts");
}
