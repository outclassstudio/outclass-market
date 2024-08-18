import Button from "@/components/button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

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

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div>{user?.username}님 Outclass Market에 오신 것을 환영합니다</div>
      <form action={logOut} className="w-full">
        <Button text="로그아웃" />
      </form>
    </div>
  );
}
