import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface SingleRoomProps {
  id: string;
  users: {
    id: number;
    username: string;
    avatar: string | null;
  }[];
  Message: {
    created_at: Date;
    payload: string;
    chatRoomId: string;
    userId: number;
  }[];
}

export default async function SingleRoom({
  id,
  users,
  Message,
}: SingleRoomProps) {
  const session = await getSession();
  const [avatarUser] = users.filter((user) => user.id !== session.id);
  const [lastMessage] = Message.slice(-1);

  return (
    <Link
      href={`/chats/${id}`}
      className="text-white flex items-center gap-5 py-3 h-20 px-1 w-full
    border-b border-neutral-500 last:pb-0 last:border-b-0"
    >
      {avatarUser.avatar ? (
        <Image
          src={avatarUser.avatar}
          alt=""
          width={40}
          height={40}
          className="rounded-full overflow-hidden"
        />
      ) : (
        <UserIcon className="size-10" />
      )}

      <div className="flex flex-col gap-1 text-lg">
        <div className="flex gap-3 items-end">
          {users.map((user, idx) => (
            <span key={idx}>
              {user.username}
              {idx === users.length - 1 ? "" : ","}
            </span>
          ))}
          <div className="text-xs text-neutral-500 flex pb-1">
            {lastMessage
              ? formatToTimeAgo(lastMessage.created_at.toString())
              : ""}
          </div>
        </div>
        <div className="text-sm text-neutral-400">
          {lastMessage ? lastMessage.payload : "아직 채팅이 없어요"}
        </div>
      </div>
    </Link>
  );
}
