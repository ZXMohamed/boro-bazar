import express from "express";
import connectDB from "./config/db.js";
import categoryRoutes from "./Category/category.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { userRouter } from "./User/user.routes.js";
import reviewRouter from "./Reviews/review.routes.js";
import authRoutes from "./Auth/auth.routes.js";
connectDB();
const app = express();

// Middleware

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Boro Bazar API Running");
});


// Error Handler (must be last middleware)
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

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();


// Category routes

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
