"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function ProductButton({ text }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-orange-500 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md 
        text-white font-semibold disabled:bg-neutral-400 disabled:text-neutral-300
    disabled:cursor-not-allowed"
    >
      {pending ? "로딩중..." : text}
    </button>
  );
}
