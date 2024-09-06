"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const usernameSchema = z
  .string({
    invalid_type_error: "문자가 아니에요",
    required_error: "이름입력은 필수에요",
  })
  .min(3, "닉네임은 3글자 이상이어야 해요")
  .max(10, "닉네임은 10글자 이하여야 해요")
  .trim()
  .toLowerCase();

export async function saveProfile(username: string, avatar?: string) {
  const session = await getSession();

  const result = usernameSchema.safeParse(username);
  if (!result.success) {
    return result.error.flatten();
  } else {
    await db.user.update({
      where: { id: session.id },
      data: {
        username: result.data,
        avatar: avatar ? avatar : undefined,
      },
      select: { id: true },
    });
    revalidateTag("user-profile");
    redirect("/profile");
  }
}
