import db from "@/lib/db";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.pathname.split("/")[2];
  if (!params) {
    return new Response(null, {
      status: 400,
    });
  }

  const result = await db.product.delete({
    where: {
      id: +params,
    },
    select: {
      id: true,
    },
  });

  if (result.id) {
    revalidateTag("products");
    redirect("/home");
  }
}
