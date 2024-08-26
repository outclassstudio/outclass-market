"use server";

import { notFound, redirect } from "next/navigation";
import { postSchema } from "./schema";
import db from "@/lib/db";
import getSession from "@/lib/session";

export async function uploadPost(prev: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    post: formData.get("post"),
  };

  const session = await getSession();

  const result = postSchema.safeParse(data);
  if (!result.success) return notFound();

  if (session.id) {
    const post = await db.post.create({
      data: {
        title: result.data.title,
        description: result.data.post,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    redirect(`/posts/${post.id}`);
  }
}
