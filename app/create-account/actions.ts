"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const passwordRegex = new RegExp(PASSWORD_REGEX);

const checkUsername = (username: string) => {
  return !username.includes("potato");
};

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "문자가 아니에요",
        required_error: "이름입력은 필수에요",
      })
      .min(3, "너무 짧아요")
      .max(10, "너무 길어요")
      .trim()
      .toLowerCase()
      .refine(checkUsername, "potato는 안돼요"),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(passwordRegex, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(passwordRegex, PASSWORD_REGEX_ERROR),
  })
  .refine(checkPassword, {
    message: "비밀번호가 일치하지 않아요",
    path: ["confirm_password"],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  //formData는 input의 name을 참조함
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result);
  }
};
