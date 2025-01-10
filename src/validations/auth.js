import * as z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string(),
    username: z.string().min(6),
    role: z.string().default("member"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
