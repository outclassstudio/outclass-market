import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/life/like-button";
import { getComments, getLikeStatus, getPost } from "./actions";
import { getUserProfile } from "@/lib/user";
import CommentsList from "@/components/life/comment/comments-list";
import Link from "next/link";

export const metadata = {
  title: "포스트",
};

//todo 고쳐야함
// const getCachedPost = nextCache(getPost, ["post-detail"], {
//   tags: ["post-detail"],
//   revalidate: 60,
// });

function getCachedLikeStatus(postId: number, userId: number) {
  const getCached = nextCache(getLikeStatus, ["post-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return getCached(postId, userId);
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

  return (
    <div className="text-white px-5 py-3 sm:px-3">
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="flex items-center gap-2">
          {post.user.avatar ? (
            <Image
              width={28}
              height={28}
              src={`${post.user.avatar!}/avatar`}
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
        {/* <EllipsisVerticalIcon
            onClick={handleModalOpen}
            className="size-5"
          /> */}
        {post.userId === session.id ? (
          <div className="*:text-neutral-400 flex gap-2 items-center *:cursor-pointer">
            <Link
              href={`/posts/edit/${post.id}`}
              className="hover:text-neutral-200"
            >
              수정
            </Link>
            <span className="hover:text-red-500">삭제</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="mb-6">{post.description}</p>
      <div className="flex flex-col gap-5 items-start mb-5">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
      <div className="border-2 border-neutral-700 my-6" />
      <CommentsList
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
