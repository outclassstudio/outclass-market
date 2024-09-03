"use server";

import db from "./db";
import getSession from "./session";

export const getUserProfile = async () => {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
};
