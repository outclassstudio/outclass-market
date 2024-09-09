import Image from "next/image";
import Link from "next/link";
// import "@/lib/db";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto *:font-medium flex flex-col items-center gap-2">
        <Image
          src={`https://imagedelivery.net/BeIKmnUeqh2uGk7c6NSanA/bf65bae9-4102-4836-eb97-9a5841ebd700/avatar`}
          alt=""
          width={120}
          height={120}
          // className="size-20"
        />
        <h1 className="text-4xl">아웃클라스 마켓</h1>
        <h2 className="text-2xl">나를 발견하고 성장시키는 곳</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn py-2.5">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
