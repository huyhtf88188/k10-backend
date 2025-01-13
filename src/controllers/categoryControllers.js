import Categories from "./../models/Category.js";

import mongoose from "mongoose";

export const getAllCategories = async (req, res, next) => {
  try {
    const data = await Categories.find({ isHidden: false });
    if (!data) {
      return res.status(400).json({
        message: "không tìm thấy category",
      });
    }
    return res.status(200).json({
      message: "lấy danh category thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Không tìm thấy category",
      });
    }
    const data = await Categories.findOne({ _id: id, isHidden: false });
    if (!data) {
      return res.status(404).json({
        message: "không tìm thấy dữ liệu",
      });
    }

    return res.status(200).json({
      message: "lấy category thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const data = await Categories.create(req.body);
    if (!data) {
      return res.status(404).json({
        message: "lỗi khi khởi tạo category",
      });
    }
    console.log(data);
    return res.status(201).json({
      message: "tạo category thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const dataBody = req.body;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }

    const data = await Categories.updateOne({ _id: id }, { $set: dataBody });
    return res.status(200).json({
      message: "cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};
export const removeCategory = async (req, res, test) => {
  try {
    const id = req.params.id;

    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không đúng định dạng id",
      });
    }
    const data = await Categories.deleteOne({ _id: id });
    if (!data.deletedCount) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    return res.status(200).json({
      message: "xóa thành công category",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};

export const softDeleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    const data = await Categories.findByIdAndUpdate(
      id,
      { isHidden: true, deleteAt: new Date() },
      { new: true }
    );
    return res.status(200).json({
      message: "xóa mềm thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi sever",
      error: error.message || "Lỗi",
    });
  }
};
export const restoreCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    const data = await Categories.findByIdAndUpdate(
      id,
      { isHidden: false, deleteAt: null },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }

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
