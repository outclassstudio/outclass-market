import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PostHeader({ url }: { url: string }) {
  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center
  bg-neutral-900 w-full"
    >
      <div
        className="flex gap-3 items-center w-full sm:w-[640px] justify-between
      py-4 px-3"
      >
        <Link href={`/${url}`} className="text-white">
          <ChevronLeftIcon className="size-6" />
        </Link>
      </div>
    </div>
  );
}
