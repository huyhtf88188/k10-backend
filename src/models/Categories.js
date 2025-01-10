import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "Updating",
    },
    slug: {
      type: String,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    productList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
