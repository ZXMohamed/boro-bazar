import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import categoryRoutes from "./Category/category.routes.js";
import authRoutes from "./auth/auth.routes.js";
import { userRouter } from "./User/user.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import reviewRouter from "./Reviews/review.routes.js";
const app = express();

connectDB();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
    code: "RATE_LIMIT_EXCEEDED",
  },
});

app.use("/api", limiter);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Boro Bazar API Running",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);
// Category routes
app.use("/api/categories", categoryRoutes);
// User routes
app.use('/api/users', userRouter);
// Review routes
app.use('/api/reviews', reviewRouter);
// Auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;

// Category routes

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
