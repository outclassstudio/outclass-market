import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PostHeader({ url }: { url: string }) {
  return (
    <div
      className="fixed top-0 left-0 flex justify-between items-center
    w-full p-4 bg-neutral-900"
    >
      <div className="flex gap-3 items-center">
        <Link href={`/${url}`} className="text-white">
          <ChevronLeftIcon className="size-6" />
        </Link>
      </div>
    </div>
  );
}
