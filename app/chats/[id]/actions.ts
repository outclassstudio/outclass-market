"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";

export async function saveMessage(payload: string, chatRoomId: string) {
  const session = await getSession();

  await db.message.create({
    data: {
      payload,
      userId: session.id!,
      chatRoomId,
    },
    select: {
      id: true,
    },
  });
}

export async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });

  if (room) {
    const session = await getSession();
    const canSee = Boolean(room.users.find((user) => user.id === session.id));
    if (!canSee) return null;
  }
  return room;
}

export async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

export type InitialMessages = Prisma.PromiseReturnType<typeof getMessages>;
