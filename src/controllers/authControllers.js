import bcryptjs from "bcryptjs";
import Auth from "../models/auth.js";

export const register = async (req, res, next) => {
  const { email, password, role } = req.body;

  const exitsEmail = await Auth.findOne({ email });
  if (exitsEmail) {
    return res.status(404).json({
      message: "email đã được đăng ký",
    });
  }
  const hasdPassword = bcryptjs.hashSync(password, 10);

  const user = await Auth.create({
    ...req.body,
    password: hasdPassword,
    role: role || "member",
  });
  user.password = undefined;
  res.status(201).json({
    message: "tạo tài khoản thành công",
    user,
  });
};

export const login = async () => {};
export const logout = async () => {};
