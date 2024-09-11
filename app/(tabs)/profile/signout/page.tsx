"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import ProfileHeader from "@/components/profile/profile-header";
import { useFormState } from "react-dom";
import { CheckPassword } from "./actions";
import Link from "next/link";

const signoutState = false;

export default function Signout() {
  const [state, dispatch] = useFormState(CheckPassword, signoutState);
  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader title="계정삭제" />
      <form action={dispatch} className="flex flex-col gap-4 p-2">
        {state ? (
          <>
            <div className="text-red-500 flex justify-center">
              한번 삭제된 계정은 복구할 수 없어요
            </div>
            <Button text="계정을 삭제합니다." />
            <Link
              href="/profile/edit"
              className="bg-neutral-500 text-white w-full h-10 
        rounded-lg flex justify-center items-center text-lg font-semibold"
            >
              돌아가기
            </Link>
          </>
        ) : (
          <>
            <span>암호입력</span>
            <Input autoComplete="off" name="password" />
            <Button text="비밀번호확인" />
          </>
        )}
      </form>
    </div>
  );
}
