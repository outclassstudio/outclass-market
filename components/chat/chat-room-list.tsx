import { ChatRoomType } from "@/app/(tabs)/chat/page";
import SingleRoom from "./single-room";

interface ChatRoomListProps {
  chatRooms: ChatRoomType;
}

export default function ChatRoomList({ chatRooms }: ChatRoomListProps) {
  return (
    <div className="flex flex-col gap-2 text-neutral-300">
      {chatRooms.map((room) => (
        <SingleRoom key={room.id} {...room} />
      ))}
    </div>
  );
}
