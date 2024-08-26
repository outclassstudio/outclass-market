import { z } from "zod";

export const postSchema = z.object({
  title: z.string(),
  post: z.string(),
});
