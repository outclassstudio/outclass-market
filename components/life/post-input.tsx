import { TextareaHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function PostInput({
  name,
  errors = [],
  ...rest
}: InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-2">
      <textarea
        name={name}
        className="bg-transparent rounded-md w-full transition
        h-32 focus:outline-none ring-2 focus:ring-4 ring-neutral-200
      focus:ring-orange-500 border-none placeholder:text-neutral-400
      pt-2 pl-3 pb-[95px]"
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
