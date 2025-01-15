import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from "../models/auth.js";

dotenv.config();

const { SECRET_KEY } = process.env;

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({
        message: "không tìm thấy token",
      });
    }

    const accessToken = token.split(" ")[1];

    jwt.verify(accessToken, SECRET_KEY, function (err, user) {
      if (err) {
        return res.status(401).json({
          message: "token hết hạn",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const verifyAuth = (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      const user = await Auth.findOne({ _id: req.user._id });
      if (user.role === "admin") {
        next();
      } else {
        return res.status(403).json({
          message: "Bạn không có quyền",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};
