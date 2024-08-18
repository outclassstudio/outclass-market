"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import crypto from "crypto";
import { Login } from "@/lib/login";
import twilio from "twilio";

const phoneScheme = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "잘못된 형식이에요"
  );

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: `${token}`,
    },
    select: {
      id: true,
    },
  });
  return Boolean(exists);
}

const tokenScheme = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, "토큰이 존재하지 않아요");

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
    //? 핸드폰 번호 형식 검증
    const result = await phoneScheme.spa(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      //? 기존의 토큰 삭제
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });

      //? 신규토큰 생성
      const token = await getToken();

      //? 신규토큰 db에 저장
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

      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      await client.messages.create({
        body: `[SMS로그인 인증번호] ${token}`,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: process.env.MY_PHONE_NUMBER!,
      });

      return {
        token: true,
      };
    }
  } else {
    //? 토큰 유효성, 존재여부 검사
    const result = await tokenScheme.spa(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      //? 토큰 정보 불러오기
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });

      //? 로그인
      await Login(token!.userId);

      //? 로그인후 토큰 삭제
      await db.sMSToken.delete({
        where: {
          id: token!.id,
        },
      });
      redirect("/profile");
    }
  }
};
