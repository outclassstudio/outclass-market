import ProductList from "@/components/product/product-list";
import ProfileHeader from "@/components/profile/profile-header";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getInitialProducts(userId: number) {
  const products = await db.product.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
      _count: {
        select: {
          ProductLike: true,
          ChatRoom: true,
        },
      },
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function UserProducts() {
  const session = await getSession();
  const id = session.id;
  if (!session.id) return notFound();
  const initialProducts = await getInitialProducts(id!);

  return (
    <div>
      <ProfileHeader title="나의 판매내역" />
      {/* <div
        className="flex w-full justify-center items-center pt-5 px-4 pb-4
      *:w-1/2 *:text-center *:text-lg *:text-neutral-300 border-b border-neutral-600
      mb-2"
      >
        <div>판매중</div>
        <div>판매완료</div>
      </div> */}
      {initialProducts ? (
        <ProductList initialProducts={initialProducts} />
      ) : (
        <div>판매중인 물품이 없어요</div>
      )}
    </div>
  );
}
