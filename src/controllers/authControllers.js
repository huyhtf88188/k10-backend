import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from "../models/auth.js";

dotenv.config({});

const { SECRET_KEY } = process.env;
export const register = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExit = await Auth.findOne({ email });
    if (!userExit) {
      return res.status(404).json({
        message: "tài khoản không tồn tại",
      });
    }
    const comparePassword = bcryptjs.compareSync(password, userExit.password);

    if (!comparePassword) {
      return res.status(404).json({
        message: "mật khẩu không đúng",
      });
    }
    const accessToken = jwt.sign({ _id: userExit.id }, SECRET_KEY, {
      expiresIn: "10d",
    });
    userExit.password = undefined;
    return res.status(200).json({
      message: "đăng nhập thành công",
      accessToken,
      user: userExit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};
export const logout = async () => {};
