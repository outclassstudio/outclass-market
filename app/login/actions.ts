"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const passwordRegex = new RegExp(PASSWORD_REGEX);

const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .toLowerCase()
    .refine(checkEmailExist, "존재하지 않은 이메일이에요"),
  password: z
    .string({
      required_error: "비밀번호를 입력하세요",
    })
    .min(PASSWORD_MIN_LENGTH),
  // .regex(passwordRegex, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (user?.password) {
      const checkHash = await bcrypt.compare(
        result.data.password,
        user.password
      );

      if (checkHash) {
        const session = await getSession();
        session.id = user!.id;
        await session.save();
        redirect("profile");
      } else {
        return {
          fieldErrors: {
            password: ["비밀번호가 일치하지 않아요"],
            email: [],
          },
        };
      }
    }
  }
};
