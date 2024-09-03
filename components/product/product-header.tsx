import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProductHeader() {
  return (
    <div
      className="fixed w-full top-0 left-0 py-3 px-7 text-white
    bg-neutral-800 flex justify-between items-center z-10 shadow-2xl"
    >
      <Link href="/home" className="size-[40px] text-3xl">
        🥕
      </Link>
      <span>
        <Bars3Icon className="w-10" />
      </span>
    </div>
  );
}
