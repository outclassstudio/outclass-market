"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function CheckPassword(signoutState: boolean, formData: FormData) {
  const session = await getSession();

  if (signoutState) {
    await db.user.delete({
      where: {
        id: session.id,
      },
    });
    session.destroy();
    redirect("/");
  } else {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        password: true,
      },
    });

    const password = formData.get("password");
    if (typeof password === "string" && user?.password) {
      const checkHash = await bcrypt.compare(password, user.password);
      return checkHash;
    }
  }

  return false;
}
