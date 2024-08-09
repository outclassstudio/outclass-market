"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneScheme = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "잘못된 형식이에요"
  );
const tokenScheme = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export const smsLogion = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneScheme.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result = tokenScheme.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
};
