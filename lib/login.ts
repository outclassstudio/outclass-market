import getSession from "./session";

export async function Login(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
