import ProductList from "@/components/product/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Link from "next/link";

//cache 사용 -> 함수는 return이 반드시 있어야 함
const getCashedProducts = nextCache(getInitialProducts, ["home-products"], {
  tags: ["products"],
  revalidate: 60,
});

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
      _count: {
        select: {
          ProductLike: true,
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

export const metadata = {
  title: "home",
};

export default async function Products() {
  //todo 캐싱전략 수정 필요
  const initialProducts = await getCashedProducts();
  // const initialProducts = await getInitialProducts();

  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/add"
        className="bg-orange-500 flex items-center justify-center 
        rounded-full size-16 fixed bottom-24 right-8 text-white
        transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
