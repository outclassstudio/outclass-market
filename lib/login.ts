import { redirect } from "next/navigation";
import getSession from "./session";

export async function Login(id: number, url: string) {
  const session = await getSession();
  session.id = id;
  await session.save();
  return redirect(url);
}
