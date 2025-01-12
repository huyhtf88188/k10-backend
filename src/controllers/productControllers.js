import Product from "../models/Product.js";
import Categories from "./../models/Categories.js";
export const create = async (req, res) => {
  try {
    const categoryId = req.body.categoryId || "6782455c80606c3931c4251b";

    const findCategoryId = await Categories.findById(categoryId);
    // if (!findCategoryId) {
    //   return res.status(404).send({
    //     message: "Danh mục không tồn tại!",
    //   });
    // }

    const newProduct = {
      ...req.body,
      categoryId,
    };

    const datas = await Product.create(newProduct);

    findCategoryId.productList.push(datas._id);
    await findCategoryId.save();

    return res.status(201).send({
      message: "Sản phẩm được tạo thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const datas = await Product.find({ isHidden: false });
    if (!datas || datas.length === 0) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    return res.status(200).send({
      message: "Get successfully!",
      datas,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};

export const getById = async (req, res, next) => {
  try {
    const datas = await Product.findById(req.params.id);
    if (!datas) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    return res.status(200).send({
      message: "Get successfully!",
      datas,
    });
  } catch (error) {
    console.log("alo");
    next();
  }
};

export const removeById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm!",
      });
    }

    const categoryId = product.categoryId;

    await Product.findByIdAndDelete(productId);

    if (categoryId) {
      const category = await Categories.findById(categoryId);
      if (category) {
        category.productList = category.productList.filter(
          (id) => id.toString() !== productId
        );
        await category.save();
      }
    }

    return res.status(200).send({
      message: "Xóa sản phẩm thành công!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Lỗi server",
      error: error.message || "Error!",
    });
  }
};

export const softDeleteByIdAndUpdate = async (req, res) => {
  try {
    const datas = await Product.findByIdAndUpdate(
      req.params.id,
      {
        isHidden: true,
        deletedAt: new Date(),
      },
      { new: true, timestamps: true }
    );

    if (!datas) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    return res.status(200).send({
      message: "Delete successfully!",
      datas,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại!",
      });
    }
    const category = await Categories.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Danh mục không tồn tại!",
      });
    }
    const datas = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      timestamps: true,
    });
    console.log(typeof product.categoryId.toString(), typeof categoryId);
    if (product.categoryId.toString() !== categoryId) {
      console.log("ok");
      await Categories.updateOne(
        { _id: product.categoryId },
        { $pull: { productList: req.params.id } }
      );
      await Categories.updateOne(
        { _id: categoryId },
        { $push: { productList: req.params.id } }
      );
    }
    return res.status(200).json({
      message: "Update successfully!",
      datas,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};
