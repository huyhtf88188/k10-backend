import express from "express";
import router from "./src/routers/index.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

const app = express();

const { PORT } = process.env;

dotenv.config();

connectDB();
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
