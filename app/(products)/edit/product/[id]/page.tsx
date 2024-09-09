// import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";
import { notFound } from "next/navigation";
import { getProduct } from "./action";
import EditForm from "@/components/product/edit/edit-form";

//todo 캐싱전략
// const getCashedProduct = nextCache(getProduct, ["product-detail"], {
//   tags: ["product-detail"],
// });

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

  const product = await getProduct(id);
  // const product = await getCashedProduct(id);
  if (!product) return notFound();

  return <EditForm product={product} id={id} />;
}

// export async function generateStaticParams() {
//   const products = await db.product.findMany({
//     select: {
//       id: true,
//     },
//   });

//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }
