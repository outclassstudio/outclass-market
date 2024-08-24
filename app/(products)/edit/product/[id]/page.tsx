import EditInput from "@/components/edit-input";
import db from "@/lib/db";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditForm from "./edit-form";
import { Prisma } from "@prisma/client";

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

export type EditProductType = Prisma.PromiseReturnType<typeof getProduct>;

const getCashedProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["product-detail"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(+params.id);
  return {
    title: product?.title,
  };
}

export default async function EditProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await getCashedProduct(id);
  if (!product) return notFound();

  return <EditForm product={product} id={id} />;
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
