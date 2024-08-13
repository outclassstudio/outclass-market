import db from "@/lib/db";
import { Login } from "@/lib/login";
import { NextRequest } from "next/server";

async function getAccessToken(code: string) {
  const accessTokenURL = "https://github.com/login/oauth/access_token";
  const accessTokenParams = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  };
  const formattedParams = new URLSearchParams(accessTokenParams).toString();
  const finalURL = `${accessTokenURL}?${formattedParams}`;

  const accessTokenResponse = await fetch(finalURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  return access_token;
}

async function getUserProfile(access_token: string) {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    //! next는 기본적으로 request를 caching함
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await userProfileResponse.json();

  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const [{ email }] = await userEmailResponse.json();

  return { login, email, id, avatar_url };
}

export async function GET(request: NextRequest) {
  //? 1. url에서 코드 가져오기
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  //? 2. access token 받아오기
  const access_token = await getAccessToken(code);

  //? 3. user profile 받아오기
  const { login, email, id, avatar_url } = await getUserProfile(access_token);

  //? 4. db에서 user 찾은 후 로그인 진행
  const user = await db.user.findUnique({
    where: {
      github_id: `${id}`,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await Login(user.id, "/profile");
  }

  //todo 이미 존재하는 이메일입니다. : 기존 계정을 업데이트
  //todo 이미 존재하는 이름입니다. 새로운 이름을 입력해주세요
  const newUser = await db.user.create({
    data: {
      username: login,
      email,
      github_id: `${id}`,
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });

  await Login(newUser.id, "/profile");
}
