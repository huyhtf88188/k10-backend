import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      default: "Updating",
    },

    isHidden: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: String,
      require: true,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("products", productSchema, "products");

export default Product;
