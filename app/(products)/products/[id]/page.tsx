import ProductFootbar from "@/components/product/product-footbar";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getIsOwner, getLikeStatus, getProduct } from "./actions";

//todo 캐싱전략 고민
// const getCashedProduct = nextCache(getProduct, ["product-detail"], {
//   tags: ["products"],
// });

function getCachedLikeStatus(productId: number, userId: number) {
  const getCached = nextCache(getLikeStatus, ["product-like-status"], {
    tags: [`product-like-status-${productId}`],
  });
  return getCached(productId, userId);
}

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

  // const product = await getCashedProduct(id);
  const product = await getProduct(id);
  if (!product) return notFound();

  const isOwner = await getIsOwner(product.userId);

  const session = await getSession();
  const existRoom = product.ChatRoom.filter(
    (room) => room.users[1].id === session.id
  );

  const createChatRoom = async () => {
    "use server";
    const session = await getSession();

    if (existRoom.length) {
      redirect(`/chats/${existRoom[0].id}`);
    } else {
      const room = await db.chatRoom.create({
        data: {
          productId: product.id,
          users: {
            connect: [{ id: product.userId }, { id: session.id }],
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/chats/${room.id}`);
    }
  };

  const { isLiked } = await getCachedLikeStatus(id, session.id!);

  return (
    <div className="h-screen my-auto mb-8">
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
        <div
          className="flex gap-2 
          *:flex *:gap-1 *:text-neutral-400 *:text-sm"
        >
          <div>
            <span>채팅</span>
            <span>{product.ChatRoom.length}</span>
          </div>
          <div>
            <span>관심</span>
            <span>{product._count.ProductLike}</span>
          </div>
        </div>
      </div>
      <ProductFootbar
        isLiked={isLiked}
        product={product}
        isOwner={isOwner}
        createChatRoom={createChatRoom}
      />
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
