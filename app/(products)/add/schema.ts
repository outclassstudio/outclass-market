import { z } from "zod";

export const productSchema = z.object({
  title: z.string({
    required_error: "필수 항목이에요",
  }),
  price: z.coerce.number({
    required_error: "필수 항목이에요",
  }),
  description: z.string({
    required_error: "필수 항목이에요",
  }),
  photo: z.string({
    required_error: "필수 항목이에요",
  }),
});

export type ProductType = z.infer<typeof productSchema>;
