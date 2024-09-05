import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  id: number;
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  _count: {
    ProductLike: number;
    ChatRoom: number;
  };
}

export default function ListProduct({
  id,
  title,
  price,
  created_at,
  photo,
  _count,
}: ListProductProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="flex gap-5 pb-5 border-b border-neutral-700 
      last:border-none w-full"
    >
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image
          fill
          src={`${photo}/width=150,height=150`}
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 w-[75%] *:text-white">
        <div className="text-lg">{title}</div>
        <div className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </div>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
        <div
          className="w-full flex justify-end items-center gap-3 *:text-neutral-400
        *:flex *:gap-1 *:items-center"
        >
          <div>
            <HeartIcon className="size-4" />
            <span>{_count.ProductLike}</span>
          </div>
          {_count.ChatRoom ? (
            <div>
              <ChatBubbleLeftRightIcon className="size-4" />
              <span>{_count.ChatRoom}</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
}
