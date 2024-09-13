"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { productSchema } from "@/app/(products)/add/schema";
import { Prisma } from "@prisma/client";
import { getUploadUrl } from "@/app/(products)/add/actions";

export async function editProduct(prevState: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
    photo: formData.get("photo"),
  };

  if (data.photo instanceof File) {
    if (data.photo.size) {
      const { success, result } = await getUploadUrl();
      if (success) {
        const { id, uploadURL } = result;
        const cloudflareForm = new FormData();
        cloudflareForm.append("file", data.photo!);
        const response = await fetch(uploadURL, {
          method: "post",
          body: cloudflareForm,
        });
        if (response.status !== 200) {
          return;
        }
        const photoUrl = `https://imagedelivery.net/BeIKmnUeqh2uGk7c6NSanA/${id}`;
        data.photo = photoUrl;
      }
    } else {
      data.photo = "/undefined";
    }
  }

  const parseResult = productSchema.safeParse(data);
  if (!parseResult.success) {
    return notFound();
  } else {
    const { id } = await db.product.update({
      where: {
        id: prevState,
      },
      data: {
        title: parseResult.data.title,
        description: parseResult.data.description,
        price: parseResult.data.price,
        photo:
          parseResult.data.photo === "/undefined"
            ? undefined
            : parseResult.data.photo,
      },
      select: {
        id: true,
      },
    });
    revalidateTag("products");
    redirect(`/products/${id}`);
  }
}

export async function getProduct(id: number) {
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

export async function deleteProduct(id: number) {
  try {
    const result = await db.product.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    revalidateTag("products");
    return result;
  } catch (e) {
    console.log(e);
  }
}

export type EditProductType = Prisma.PromiseReturnType<typeof getProduct>;
