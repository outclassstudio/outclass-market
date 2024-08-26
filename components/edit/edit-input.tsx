"use client";

import { useState } from "react";

export default function EditInput({
  value,
  name,
  ...rest
}: {
  value: string;
  name: string;
}) {
  const [content, setContent] = useState(value);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <input
      name={name}
      className="p-0 bg-inherit outline-none border-none w-full
      focus:outline-none focus:ring-2 focus:ring-orange-500"
      value={content}
      onChange={onChangeInput}
      {...rest}
    />
  );
}
