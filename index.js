import express from "express";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import router from "./src/routers/index.js";

const app = express();
dotenv.config();

const { PORT } = process.env;

connectDB();
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
