import Button from "@/components/button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

async function Username() {
  const user = await getUser();
  return <div>{user?.username}님 Outclass Market에 오신 것을 환영합니다</div>;
}

export default async function Profile() {
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Suspense fallback={"Hello"}>
        <Username />
      </Suspense>
      <form action={logOut} className="w-full">
        <Button text="로그아웃" />
      </form>
    </div>
  );
}
