"use client";

import { TextareaHTMLAttributes, useRef, useState } from "react";

interface TeatareaProps {
  name: string;
  errors?: string[];
}

export default function Textarea({
  name,
  errors = [],
  ...rest
}: TeatareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [scrollHeight, setScrollHeigth] = useState(0);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScrollHeigth(textarea!.current!.scrollHeight);

    if (scrollHeight > 150) {
      textarea!.current!.style.height = "auto";
      textarea!.current!.style.height = textarea!.current!.scrollHeight + "px";
    }
    if (!textarea!.current!.value) {
      textarea!.current!.style.height = "150px";
      setScrollHeigth(0);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        onChange={onChange}
        rows={1}
        name={name}
        autoComplete="off"
        ref={textarea}
        className="bg-transparent rounded-md w-full transition h-[150px] 
        focus:outline-none ring-2 focus:ring-4 ring-neutral-200
      focus:ring-orange-500 border-none placeholder:text-neutral-400
      pt-2 pl-3"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
