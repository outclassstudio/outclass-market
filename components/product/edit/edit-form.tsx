"use client";

import EditInput from "@/components/product/edit/edit-input";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useFormState } from "react-dom";
import {
  editProduct,
  EditProductType,
} from "@/app/(products)/edit/product/[id]/action";
import EditPhoto from "@/components/product/edit/edit-photo";
import ProductButton from "../product-button";

export default function EditForm({
  product,
  id,
}: {
  product: EditProductType;
  id: number;
}) {
  const [state, dispatch] = useFormState(editProduct, id);
  if (!product) return notFound();

  return (
    <form action={dispatch} className="h-screen my-auto">
      <EditPhoto name="photo" url={`${product.photo}/avatar`} />
      <div className="flex flex-col px-5 pb-[90px]">
        <div className="pb-5 px-1.5 flex items-center gap-3 border-b border-e-neutral-700">
          <div className="size-10 overflow-hidden rounded-full">
            {product.user.avatar ? (
              <Image
                width={40}
                height={40}
                src={`${product.user.avatar}/avatar`}
                alt={product.user.username}
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <div>
            <h3>{product.user.username} (수정중)</h3>
          </div>
        </div>
        <div className="py-5 px-1.5 flex flex-col">
          <span className="*:text-2xl *:font-semibold">
            <EditInput name={"title"} value={product.title} />
          </span>
          <EditInput name={"description"} value={product.description} />
        </div>
      </div>
      <div
        className="fixed left-0 bottom-0 w-full p-5 bg-neutral-800 
  flex justify-between items-center"
      >
        <span className="*:font-semibold *:text-lg *:sm:text-xl flex">
          <EditInput name={"price"} value={product.price.toString()} />
        </span>
        <div className="flex gap-2 sm:gap-3.5">
          <ProductButton text="수정완료" color="orange-500" />
        </div>
      </div>
    </form>
  );
}
