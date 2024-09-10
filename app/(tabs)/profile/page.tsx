import Button from "@/components/common/button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache as NextCache } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser(id: number) {
  const user = db.user.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          products: true,
          productLikes: true,
        },
      },
    },
  });
  if (user) return user;
  return notFound();
}

const getCachedUser = NextCache(getUser, ["user-profile"], {
  tags: ["user-profile", "products"],
});

export const metadata = {
  title: "유저정보",
};

export default async function Profile() {
  const session = await getSession();
  if (!session) return notFound();

  const user = await getCachedUser(+session.id!);

  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-3">
      <Suspense fallback={"Hello"}>
        <div className="flex items-center gap-3 p-2 w-full justify-start">
          {user?.avatar ? (
            <div
              className="w-24 h-24 rounded-full m-2 overflow-hidden bg-center bg-cover"
              style={{ backgroundImage: `url(${user?.avatar}/avatar)` }}
            />
          ) : (
            <UserIcon className="size-16" />
          )}
          <div className="text-2xl font-semibold">{user?.username}</div>
        </div>
      </Suspense>
      <Link
        href="/profile/edit"
        className="bg-neutral-500 text-white w-full h-10 
        rounded-lg flex justify-center items-center text-lg font-semibold"
      >
        프로필 수정
      </Link>
      <Link
        href={`/profile/products`}
        className="flex justify-between items-center p-3 w-full 
      border-b border-neutral-500 text-neutral-300 text-lg"
      >
        <div>판매물품 {user?._count.products}개</div>
        <ChevronRightIcon className="size-10" />
      </Link>
      <Link
        href={`/profile/likes`}
        className="flex justify-between items-center p-3 w-full 
      border-b border-neutral-500 text-neutral-300 text-lg"
      >
        <div>관심목록 {user?._count.productLikes}개</div>
        <ChevronRightIcon className="size-10" />
      </Link>
      <form action={logOut} className="w-full">
        <Button text="로그아웃" />
      </form>
    </div>
  );
}
