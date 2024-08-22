import ModalCloseButton from "@/components/modal-close-button";
import db from "@/lib/db";
import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
  new Promise((resolove) => setTimeout(resolove, 5000));

  const result = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return result;
}

export default async function ProductModal({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(+params.id);
  if (!product) return notFound();

  return (
    <div
      className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-60 z-50
    flex justify-center items-center"
    >
      <ModalCloseButton />
      {/* 일정 화면까지는 고정 크기를 갖고, 그 이하로 내려갔을시 상대적인 크기로 변경 */}
      <div className="flex flex-col items-center justify-center shadow-2xl">
        <div
          className="bg-neutral-800 max-w-screen-sm w-full
      flex gap-5 justify-center rounded-tr-md mx-5"
        >
          <div
            className="aspect-ratio size-[340px] bg-neutral-700 text-neutral-200 bg-center bg-cover
          flex justify-center items-center "
            style={{
              backgroundImage: `url(${product.photo})`,
            }}
          >
            {product!.photo ? null : <PhotoIcon className="h-28" />}
          </div>
          <div className="flex flex-col gap-3 w-[280px] py-3 pr-3">
            <div className="pb-4 flex justify-start items-center gap-3 border-b border-neutral-600">
              <div className="size-10 overflow-hidden rounded-full">
                {product.user.avatar ? (
                  <Image
                    width={40}
                    height={40}
                    src={product.user.avatar}
                    alt={product.user.username}
                  />
                ) : (
                  <UserIcon />
                )}
              </div>
              <div>
                <h3 className="font-bold">{product.user.username}</h3>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">{product.title}</div>
              <div className="text-sm font-thin text-neutral-400">
                {formatToTimeAgo(product.created_at.toString())}
              </div>
            </div>
            <div>{product.description}</div>
          </div>
        </div>
        <div
          className="p-5 bg-neutral-700 rounded-br-md
      flex justify-between items-center w-[640px] mx-5"
        >
          <span className="font-semibold text-xl">
            {formatToWon(product.price)}원
          </span>
          <div className="flex gap-3.5">
            {/* {isOwner ? (
              <Link
                href={`/products/delete/${product.id}`}
                className="bg-red-500 px-5 py-2.5 rounded-md 
        text-white font-semibold"
              >
                삭제하기
              </Link>
            ) : null} */}
            <Link
              className="bg-orange-500 px-5 py-2.5 rounded-md 
        text-white font-semibold"
              href={``}
            >
              채팅하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
