import ChatMessagesList from "@/components/chat/chat-messages-list";
import getSession from "@/lib/session";
import { getUserProfile } from "@/lib/user";
import { notFound } from "next/navigation";
import { getMessages, getRoom } from "./actions";
import PostHeader from "@/components/life/post-header";

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  if (!room) return notFound();

  const initialMessages = await getMessages(params.id);
  const session = await getSession();
  const user = await getUserProfile();
  if (!user) return notFound();

  return (
    <>
      {/* 임시 헤더 */}
      <PostHeader url={"chat"} />
      <ChatMessagesList
        chatRoomId={params.id}
        initialMessages={initialMessages}
        username={user.username}
        avatar={user.avatar!}
        userId={session.id!}
      />
    </>
  );
}
