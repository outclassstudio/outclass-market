import { formatToWon } from "@/lib/utils";
import ProductLikeButton from "./product-like-button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductType } from "@/app/(products)/products/[id]/actions";
import Button from "../common/button";
import ProductButton from "./product-button";

interface ProductFootbarProps {
  isLiked: boolean;
  product: ProductType;
  isOwner: boolean;
  createChatRoom: () => Promise<never>;
}

export default function ProductFootbar({
  isLiked,
  product,
  isOwner,
  createChatRoom,
}: ProductFootbarProps) {
  if (!product) return notFound();

  return (
    <div
      className="fixed left-0 bottom-0 w-full p-5 bg-neutral-800 
      flex justify-between items-center"
    >
      <div className="flex items-center gap-3">
        <ProductLikeButton isLiked={isLiked} productId={product.id} />
        <span className="font-semibold text-lg sm:text-xl">
          {formatToWon(product.price)}원
        </span>
      </div>

      <div className="flex gap-2 sm:gap-3.5">
        {isOwner ? (
          <>
            <Link
              href={`/delete/${product.id}`}
              className="bg-red-500 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md 
        text-white font-semibold"
            >
              삭제하기
            </Link>
            <Link
              href={`/edit/product/${product.id}`}
              className="bg-orange-500 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md 
        text-white font-semibold"
            >
              수정하기
            </Link>
          </>
        ) : null}
        {isOwner ? null : (
          <form action={createChatRoom}>
            {/* <button
              className="bg-orange-500 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md 
        text-white font-semibold"
            >
              채팅하기
            </button> */}
            <ProductButton text="채팅하기" />
          </form>
        )}
      </div>
    </div>
  );
}
