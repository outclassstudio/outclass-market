import ModalCloseButton from "@/components/modal-close-button";
import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
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
      <div
        className="bg-neutral-800 shadow-2xl w-[60%] h-[60%]
      flex gap-5 justify-center rounded-r-md md:max-w-screen-md"
      >
        <div
          className="aspect-square md:size-[150px] bg-neutral-700 text-neutral-200 bg-center bg-cover
          flex justify-center items-center "
          style={{
            backgroundImage: `url(${product.photo})`,
          }}
        >
          {product!.photo ? null : <PhotoIcon className="h-28" />}
        </div>
        <div className="flex flex-col gap-3 m-5 max-w-40">
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
              <h3>{product.user.username}</h3>
            </div>
          </div>
          <div>{product.title}</div>
          <div>{formatToTimeAgo(product.created_at.toString())}</div>
          <div>{product.price}</div>
          <div>{product.description}</div>
        </div>
      </div>
    </div>
  );
}
