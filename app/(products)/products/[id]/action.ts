"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export const createChatRoom = async (userId: number) => {
  const session = await getSession();
  const room = await db.chatRoom.create({
    data: {
      users: {
        connect: [{ id: userId }, { id: session.id }],
      },
    },
  });
  redirect(`/chats/${room.id}`);
};
