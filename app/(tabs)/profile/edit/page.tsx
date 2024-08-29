import ProfileEditInput from "@/components/profile/profile-edit-input";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getUserData() {
  const session = await getSession();
  const user = db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
}

export type GetUserData = Prisma.PromiseReturnType<typeof getUserData>;

export default async function EditProfile() {
  const user = await getUserData();
  if (!user) return notFound();

  return (
    <div>
      <ProfileEditInput user={user} />
    </div>
  );
}
