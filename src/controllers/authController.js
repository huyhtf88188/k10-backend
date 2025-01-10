import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, verifyAccessToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const dataEmail = await User.findOne({ email: req.body.email });
    if (dataEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const data = await User.create({ ...req.body, password: secPass });
    if (data) {
      return res.status(201).json({
        message: "Tạo tài khoản thành công",
      });
    }
    delete req.body.password;
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Khi Tạo Tài Khoản!",
    });
  }
};
export const login = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (!data) {
      return res.status(400).json({
        message: "email không tồn tại",
      });
    }
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (!passwordCompare) {
      return res.status(400).json({
        message: "Sai mật khẩu",
      });
    }

    const token = generateAccessToken(data);
    const decode = verifyAccessToken(token);
    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: "Lỗi ",
    });
  }
};
