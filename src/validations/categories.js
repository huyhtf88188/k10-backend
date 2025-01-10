import * as z from "zod";

export const categoriesSchema = z.object({
  title: z.string().min(6, "phải hơn 6 ký tự"),
  price: z.number().min(0, "không được âm"),
  description: z.string().optional(),
  slug: z.string().optional(),
});
