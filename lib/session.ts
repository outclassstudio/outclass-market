import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

//쿠키에 generic으로 타입 지정
interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "new-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}
