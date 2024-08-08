"use client";

import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { onSubmit } from "./actions";
import { useFormState } from "react-dom";

export default function LogIn() {
  const [state, action] = useFormState(onSubmit, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요"
          required
          errors={state?.errors ?? []}
        />
        <FormButton text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
