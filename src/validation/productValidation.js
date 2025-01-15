import * as z from "zod";

export const productValidation = z.object({
  title: z.string().min(6, "tối thiểu 6 ký tự"),
  price: z.number().min(0),
  description: z.string().optional(),
  categoryId: z.string().optional(),
});
