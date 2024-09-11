"use client";

import { InitialComments, saveComment } from "@/app/posts/[id]/actions";
import { useRef, useState } from "react";
import CommentInput from "./comment-input";
import SingleComment from "./single-comment";

interface CommentInputProps {
  initialComments: InitialComments;
  userId: number;
  postId: number;
  username: string;
  avatar: string;
  postUserId: number;
}

export default function CommentsList({
  initialComments,
  userId,
  postId,
  username,
  avatar,
  postUserId,
}: CommentInputProps) {
  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    const compare = Number(textarea!.current!.style.height.replace("px", ""));

    if (!textarea!.current!.value) {
      textarea!.current!.style.height = "40px";
    }

    if (compare < 70) {
      textarea!.current!.style.height = "auto";
      textarea!.current!.style.height = textarea!.current!.scrollHeight + "px";
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newId: number;

    if (comments.length !== 0) {
      newId = comments[comments.length - 1].id + 1;
    } else {
      newId = 1;
    }

    setComments((prevMsg) => [
      ...prevMsg,
      {
        id: newId,
        payload: comment,
        created_at: new Date(),
        userId,
        postId,
        user: {
          username,
          avatar,
        },
      },
    ]);
    await saveComment(comment, userId, postId);
    setComment("");
  };

  const onDelete = (id: number) => {
    const newComments = comments.filter((comment) => comment.id !== id);
    setComments(newComments);
  };

  return (
    <div className="flex flex-col gap-5 mb-[90px]">
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
      {comments.map((comment) => (
        <SingleComment
          key={comment.id}
          comment={comment}
          userId={userId}
          onDelete={onDelete}
          postUserId={postUserId}
        />
      ))}
      <CommentInput
        comment={comment}
        onChange={onChange}
        onSubmit={onSubmit}
        textarea={textarea}
      />
    </div>
  );
}
