import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createError from "http-errors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Kết nối MongoDB
// const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://localhost:27017/fashion-store";

const MONGODB_URI = "mongodb://localhost:27017/fashion-store";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Kết nối thành công"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Thiết lập static files sử dụng path
// Đặt middleware express.static trước routes để phục vụ các tệp tĩnh trước khi xử lý routes
// app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Routes
// http://localhost:5000/api/products
app.use("/api/products", productRoutes);
// http://localhost:5000/api/categories
app.use("/api/categories", categoryRoutes);
// http://localhost:5000/api/users
app.use("/api/users", userRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render("error");
    res.status(err.status || 500).json({ message: err.message, error: err });
  }
);

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
