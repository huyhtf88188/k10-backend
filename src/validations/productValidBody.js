import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(6, "phải hơn 6 ký tự"),
  price: z.number().min(0, "không được âm"),
  description: z.string().optional(),
});
