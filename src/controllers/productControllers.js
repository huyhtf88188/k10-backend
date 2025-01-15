import mongoose from "mongoose";
import Product from "../models/product";
import Categories from "../models/Category";

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find({ isHidden: false });
    if (!data) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "lấy danh sách sản phẩm công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    const data = await Product.findOne({ _id: id, isHidden: false });
    if (!data) {
      return res.status(404).json({
        message: "không tìm thấy dữ liệu",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const categoryIdNew = req.body.categoryId || "6786706258c465054a8aed7e";
    if (categoryIdNew && !mongoose.Types.ObjectId.isValid(categoryIdNew)) {
      req.body.categoryId = categoryIdNew;
    }

    const category = await Categories.findOne({ _id: categoryIdNew });
    if (!category) {
      return res.status(404).json({
        message: "không tìm thấy danh mục",
      });
    }

    const data = await Product.create(req.body);
    if (!data) {
      return res.status(404).json({
        message: "lỗi khi khởi tạo sản phẩm",
      });
    }
    return res.status(201).json({
      message: "tạo sản phẩm thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const updateProductById = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};
export const removeProduct = async (req, res, test) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const softDeleteProduct = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};
export const restoreProduct = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "khôi phục thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};
