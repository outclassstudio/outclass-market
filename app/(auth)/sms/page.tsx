"use client";

import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { useFormState } from "react-dom";
import { smsLogion } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogIn() {
  const [state, dispatch] = useFormState(smsLogion, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification code"
            required={true}
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="핸드폰 번호를 입력하세요"
            required={true}
            errors={state.error?.formErrors}
          />
        )}

        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
    </div>
  );
}
