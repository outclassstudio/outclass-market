import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SimpleHeader {
  url: string;
  text: string;
}

export default function SimpleHeader({ url, text }: SimpleHeader) {
  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center
  bg-neutral-900 w-full z-10 shadow-md"
    >
      <div
        className="flex gap-3 items-center w-full sm:w-[640px] justify-between
      py-4 px-3"
      >
        <div className="flex items-center gap-3">
          <Link href={`/${url}`} className="text-white">
            <ChevronLeftIcon className="size-6" />
          </Link>
          <span className="font-semibold text-lg">{text}</span>
        </div>
      </div>
    </div>
  );
}
