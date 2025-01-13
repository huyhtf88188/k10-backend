import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },
    description: {
      type: String,
      default: "Updating",
    },
    // slug: {
    //   type: String,
    //   unique: true,
    // },
    isHidden: {
      type: Boolean,
      default: false,
    },
    product: [],
    deleteAt: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true, versionKey: false }
);

const Categories = mongoose.model("Categories", categorySchema, "categories");

export default Categories;
