import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";
import CommentInput from "@/components/comment-input";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

//todo 고쳐야함
// const getCachedPost = nextCache(getPost, ["post-detail"], {
//   tags: ["post-detail"],
//   revalidate: 60,
// });

async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

function getCachedLikeStatus(postId: number, userId: number) {
  const getCached = nextCache(getLikeStatus, ["post-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return getCached(postId, userId);
}

async function getComments(postId: number, sort = true) {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      postId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    // orderBy: {
    //   created_at: sort ? "desc" : "asc",
    // },
  });

  return comments;
}

export type InitialComments = Prisma.PromiseReturnType<typeof getComments>;

//todo 공용으로
async function getUserProfile() {
  const session = await getSession();
  const user = await db.user.findUnique({
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

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  //todo 세션 반복 호출에 대한 고민과 대책
  const session = await getSession();

  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const post = await getPost(id);
  if (!post) return notFound;

  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);
  const comments = await getComments(id);
  const user = await getUserProfile();
  if (!user) return notFound();

  // const sortDesc = async () => {
  //   "use server";
  //   comments = await getComments(id, true);
  // };
  // const sortAsc = async () => {
  //   "use server";
  //   comments = await getComments(id, false);
  // };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center w-full py-4">
        <div className="flex gap-3 items-center">
          <Link href="/life" className="text-white">
            <ChevronLeftIcon className="size-6" />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        {post.user.avatar ? (
          <Image
            width={28}
            height={28}
            src={post.user.avatar!}
            alt={post.user.username}
            className="size-7 rounded-full"
          />
        ) : (
          <UserIcon className="size-7" />
        )}
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span className="text-neutral-400">
              {formatToTimeAgo(post.created_at.toString())}
            </span>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start mb-5">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
      <div className="border-2 border-neutral-700 my-6" />
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold">
          댓글
          <span className="text-neutral-300 ml-1 font-normal">
            {comments.length}
          </span>
        </div>
        <div className="flex gap-3 *:cursor-pointer">
          <button className={`font-thin`}>등록순</button>
          <button className={`font-thin`}>최신순</button>
        </div>
      </div>
      <CommentInput
        initialComments={comments}
        userId={session.id!}
        postId={post.id}
        username={user.username!}
        avatar={user.avatar!}
        postUserId={post.userId}
      />
    </div>
  );
}
