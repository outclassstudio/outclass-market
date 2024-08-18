"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function deleteProduct(prevState: any, formData: FormData) {
  const id = await formData.get("delete");
  await db.product.delete({
    where: {
      id: +id!,
    },
  });
  redirect("/product");
}
