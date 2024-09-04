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
  return (
    <div
      className="fixed bottom-0 left-0 w-full px-4 py-3 border-t
border-neutral-800 bg-neutral-900 z-10"
    >
      <form onSubmit={onSubmit} className="flex gap-4 items-end">
        <textarea
          required
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
              comment.length === 0 ? "text-neutral-400" : "text-orange-400"
            } transition-colors hover:text-orange-300`}
          />
        </button>
      </form>
    </div>
  );
}
