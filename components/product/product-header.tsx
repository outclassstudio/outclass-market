import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProfileHeader({ title }: { title: string }) {
  return (
    <div
      className="flex justify-between items-center w-full py-4 border-b
border-neutral-600"
    >
      <div className="flex gap-3 items-center">
        <Link href="/home" className="text-white">
          <ChevronLeftIcon className="size-6" />
        </Link>
        <span className="flex items-center font-bold text-lg">{title}</span>
      </div>
    </div>
  );
}
