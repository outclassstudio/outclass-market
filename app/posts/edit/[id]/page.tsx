import PostEditForm from "@/components/life/post-edit-form";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getPost(id: number) {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
  return post;
}

export type InitialPostType = Prisma.PromiseReturnType<typeof getPost>;

export default async function EditPost({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getPost(+id);
  return <PostEditForm initialPost={post} />;
}
