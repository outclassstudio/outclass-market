"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import crypto from "crypto";

const phoneScheme = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "잘못된 형식이에요"
  );
const tokenScheme = z.coerce.number().min(100000).max(999999);

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });

  if (exists) {
    //! recursion
    return getToken();
  } else {
    return token;
  }
}

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
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          //! 기존에 존재하는 유저와 연결하거나 없으면 새로 생성한다
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
              },
            },
          },
        },
      });

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
