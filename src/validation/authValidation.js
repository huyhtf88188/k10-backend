import * as z from "zod";

export const regiterSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "mật khẩu tối thiểu 6 ký tự")
    .max(50, "mật khẩu không được quá 50 ký tự"),
  username: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "mật khẩu tối thiểu 6 ký tự")
    .max(50, "mật khẩu không được quá 50 ký tự"),
});
