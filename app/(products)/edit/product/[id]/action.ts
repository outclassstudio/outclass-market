"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import fs from "fs/promises";
import { productSchema } from "@/app/(products)/add/schema";

export async function editProduct(prevState: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
    photo: formData.get("photo"),
  };

  //! 이미지 파일을 로컬에 저장
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }

  const result = productSchema.safeParse(data);

  if (!result.success) {
    return notFound();
  } else {
    const { id } = await db.product.update({
      where: {
        id: prevState,
      },
      data: {
        title: result.data.title,
        description: result.data.description,
        price: result.data.price,
        photo:
          result.data.photo === "/undefined" ? undefined : result.data.photo,
      },
      select: {
        id: true,
      },
    });
    revalidateTag("products");
    redirect(`/products/${id}`);
  }
}
