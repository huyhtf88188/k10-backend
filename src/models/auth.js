import mongoose from "mongoose";

const authSchemas = new mongoose.Schema(
  {
    email: {
      require: true,
      unique: true,
      type: String,
    },
    password: {
      type: String,
      require: true,
      //   minLength: [6, "Must be at least 6, got {VALUE}"],
      //   maxLength: [50, "Must be at least 50, got {VALUE}"],
      hidden: true,
    },

    username: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "superAdmin"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Auth = mongoose.model("auth", authSchemas, "auth");

export default Auth;
