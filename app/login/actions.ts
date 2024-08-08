"use server";

import { redirect } from "next/navigation";

export const onSubmit = async (prevState: any, formData: FormData) => {
  console.log(prevState);
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
    // console.log(
    //   "server action!",
    //   formData.get("email"),
    //   formData.get("password")
    // );
  });
  // redirect("/");
  return {
    errors: ["에러러러", "비밀번호가 짧아요"],
  };
};
