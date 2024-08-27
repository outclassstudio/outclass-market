import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createChatRoom } from "./actions";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
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
  return product;
}

const getCashedProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["products"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(+params.id);
  return {
    title: product?.title,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await getCashedProduct(id);
  if (!product) return notFound();

  const isOwner = await getIsOwner(product.userId);

  const createChatRoom = async () => {
    "use server";
    const session = await getSession();
    const room = await db.chatRoom.create({
      data: {
        users: {
          connect: [{ id: product.userId }, { id: session.id }],
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/chats/${room.id}`);
  };

  return (
    <div className="h-screen my-auto">
      <div className="relative aspect-square">
        <Image
          fill
          src={product.photo}
          alt={product.title}
          className="object-cover p-5"
        />
      </div>
      <div className="flex flex-col px-5 pb-[90px]">
        <div className="pb-5 px-1.5 flex items-center gap-3 border-b border-e-neutral-700">
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
            <h3>{product.user.username}</h3>
          </div>
        </div>
        <div className="py-5 px-1.5">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p>{product.description}</p>
        </div>
      </div>
      <div
        className="fixed left-0 bottom-0 w-full p-5 bg-neutral-800 
      flex justify-between items-center"
      >
        <span className="font-semibold text-lg sm:text-xl">
          {formatToWon(product.price)}원
        </span>
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
          <form action={createChatRoom}>
            <button
              className="bg-orange-500 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md 
        text-white font-semibold"
            >
              채팅하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
