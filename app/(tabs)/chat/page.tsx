import ChatRoomList from "@/components/chat/chat-room-list";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export const metadata = {
  title: "채팅",
};

async function getChatRooms() {
  const session = await getSession();

  const rooms = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: session.id,
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      messages: {
        select: {
          payload: true,
          created_at: true,
          chatRoomId: true,
          userId: true,
        },
      },
      product: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return rooms;
}

export type ChatRoomType = Prisma.PromiseReturnType<typeof getChatRooms>;

export default async function Chats() {
  const chatRooms = await getChatRooms();
  if (!chatRooms) return notFound();
  return (
    <div className="p-2">
      <ChatRoomList chatRooms={chatRooms} />
    </div>
  );
}
