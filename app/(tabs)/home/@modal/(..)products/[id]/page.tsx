"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Modal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  return (
    <div
      className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-60 z-50
    flex justify-center items-center"
    >
      <button
        onClick={onCloseClick}
        className="absolute right-5 top-5 text-neutral-200"
      >
        <XMarkIcon className="size-10" />
      </button>
      <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
        <div
          className="aspect-square bg-neutral-700 border-4 rounded-md
 flex justify-center items-center text-neutral-200"
        >
          <PhotoIcon className="h-28" />
        </div>
      </div>
    </div>
  );
}
