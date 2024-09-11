"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { RefObject } from "react";

interface CommentInputProps {
  comment: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  textarea: RefObject<HTMLTextAreaElement>;
}

export default function CommentInput({
  comment,
  onChange,
  onSubmit,
  textarea,
}: CommentInputProps) {
  //todo 엔터로 제출하기 구현
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {};

  return (
    <div
      className="fixed bottom-0 left-0 w-full px-4 py-3 border-t
border-neutral-800 bg-neutral-900 z-10 flex justify-center"
    >
      <form
        onSubmit={onSubmit}
        className="flex justify-center gap-4 items-end w-full sm:w-[640px]"
      >
        <textarea
          required
          onKeyDown={onKeyDown}
          onChange={onChange}
          value={comment}
          rows={1}
          name="message"
          placeholder="댓글을 입력해주세요"
          autoComplete="off"
          ref={textarea}
          className="bg-neutral-800 rounded-2xl w-full h-[40px]
    focus:outline-none px-5 ring-1 transition border-none
    ring-neutral-800 focus:ring-neutral-700 placeholder:text-neutral-300"
        />
        <button>
          <PaperAirplaneIcon
            className={`size-10 ${
              comment.length === 0 ? "text-neutral-400" : "text-orange-500"
            } transition-colors hover:text-orange-400`}
          />
        </button>
      </form>
    </div>
  );
}
